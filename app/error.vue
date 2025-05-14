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

  // 可能会带有 url
  url?: string
}

interface Error {
  title?: string
  message?: string
  code: number
  path?: string
  fatal?: boolean
  unhandled?: boolean
}

defineProps<{
  error: NuxtError
}>()

// -----------------------------
// path
// -----------------------------

let url: string | undefined | null
function tryGetPath(error: NuxtError): string | null {
  if (url !== undefined) {
    return url
  }
  try {
    if (error.url) {
      url = error.url
    }
    else if (window && window.location) {
      url = window.location.pathname
    }
    else if (error.data) {
      url = typeof error.data === 'object'
        ? (error.data as { path: string }).path
        : JSON.parse(error.data as string).path
    }
  }
  finally {
    if (!url) {
      url = null
    }
  }

  return url
}

// -----------------------------
// error
// -----------------------------

function buildError(error: NuxtError): Error {
  const code = error.statusCode
  const path = tryGetPath(error) || 'Missing current path'

  const reg = new RegExp(`:?\\s*${path}`, 'g')
  const title = (error.statusMessage)?.replace(reg, '')

  // message
  // 创建错误时不传递时: 'Error'     -> undefined
  // 默认的错误信息: statusMessage   -> undefined
  let message = error.message
  if (!message || message === 'Error' || message === error.statusMessage) {
    message = undefined
  }
  else {
    message = message.replace(reg, '')
  }

  return {
    title,
    message,
    code,
    path,
    fatal: error.fatal,
    unhandled: error.unhandled,
  }
}

// -----------------------------
// stack & link
// -----------------------------

function buildLink(url: string) {
  return import.meta.dev ? `vscode://file/${url}` : '#'
}

const STACK_REG = /at\s(.+?)\s\((.+?)\)$/g

function matchStackData(lines: string[]) {
  return lines
    .map((line) => {
      const match = line.match(STACK_REG)
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
      const match = line.match(STACK_REG)
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
            <tr class="border-shared/20 *:text-shared border-b text-left *:p-3">
              <th>Function</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(line, index) in processStack(error.stack)"
              :key="index"
              class="border-shared/10 hover:bg-shared/5 border-b *:p-3 *:font-mono"
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
  <BackgroundGradientDiv />
  <BackgroundEffect />
</template>
