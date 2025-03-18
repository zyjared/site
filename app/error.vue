<script lang="ts" setup>
interface NuxtError {
  statusCode: number
  fatal: boolean
  unhandled: boolean
  statusMessage?: string
  data?: unknown
  cause?: unknown
  message?: string
  stack?: string
}

interface Error {
  title?: string
  message?: string
  code: number
  path?: string
}

defineProps<{
  error: NuxtError
}>()

function tryGetPath(error: NuxtError): string {
  let path = ''
  try {
    const raw = error.data
    if (typeof raw === 'string') {
      path = JSON.parse(raw).path || ''
    }
  }
  finally {
    if (!path)
      path = window.location.pathname
  }

  return path
}

function buildError(error: NuxtError): Error {
  const code = error.statusCode
  const path = tryGetPath(error)

  const reg = new RegExp(`:?\\s*${path}`, 'g')
  const title = (error.statusMessage)?.replace(reg, '')
  const message = error.message === error.statusMessage ? undefined : (error.message)?.replace(reg, '')

  return {
    title,
    message,
    code,
    path,
  }
}

let isHttp: boolean | null = null
function buildLink(url: string) {
  if (isHttp === null) {
    isHttp = !window.location.href.includes('localhost')
  }

  return isHttp ? '#' : `vscode://file/${url}`
}

function matchStackData(lines: string[]) {
  return lines
    .map((line) => {
      const match = line.match(/at\s(.+?)\s\((.+?)\)$/g)
      if (match) {
        const [, hook, path] = match[0].split(' ')
        return {
          hook,
          path: path?.replace(/\(|\)/g, ''),
        }
      }
      return null
    })
    .filter(Boolean) as {
    hook: string
    path: string
  }[]
}

function processStack(stack: string) {
  const lines = stack.split('\n')
  const filters = lines.filter(line => !line.includes('node_modules'))
  return matchStackData(filters)
}

function processStackMore(stack: string) {
  if (!stack)
    return ''

  return stack
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      return trimmed && trimmed.includes('node_modules')
    })
    .map((line) => {
      const match = line.match(/at\s(.+?)\s\((.+?)\)/)
      if (match)
        return `at ${match[1]} (${match[2]})`
      return line.trim()
    })
    .join('\n')
}
</script>

<template>
  <div v-if="buildLink('#') === '#'" class="h-screen flex-center">
    <ErrorDisplay :error="buildError(error)" />
  </div>
  <ErrorDisplay v-else :error="buildError(error)" class="min-h-screen p-8" :class="error.stack ? 'items-start' : '' ">
    <div
      v-if="error.stack"
      class="w-full flex-1 p-4"
      b="~ shared/50"
    >
      <div
        class="[scrollbar-color:#888_transparent] box-border max-w-full overflow-auto pb-6"
      >
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b border-shared/20 text-left *:p-3 *:text-shared">
              <th>Function</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(line, index) in processStack(error.stack)"
              :key="index"
              class="border-b border-shared/10 hover:bg-shared/5 *:p-3 *:font-mono"
            >
              <td class="text-blue-400">
                {{ line.hook }}
              </td>
              <td class="text-indigo-400">
                <a :href="buildLink(line.path)">
                  {{ line.path }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="relative mt-4 text-sm">
          <input id="show-stack" type="checkbox" class="peer absolute opacity-0">

          <label for="show-stack" class="cursor-pointer select-none text-indigo peer-checked:hidden">More</label>
          <label for="show-stack" class="hidden cursor-pointer select-none text-indigo peer-checked:block">Close</label>

          <div class="hidden overflow-auto py-2 peer-checked:block">
            <pre class="text-shared">{{ processStackMore(error.stack) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </ErrorDisplay>
  <BackgroundGradient />
  <BackgroundEffect />
</template>
