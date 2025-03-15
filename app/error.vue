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
  title: string
  message: string
  code: number
  path: string
}

defineProps<{
  error: NuxtError
}>()

const presetError = {
  400: {
    title: 'Bad Request',
    message: 'The request was malformed or contains invalid parameters.',
  },
  401: {
    title: 'Unauthorized',
    message: 'Please sign in to access this resource.',
  },
  403: {
    title: 'Forbidden',
    message: 'You don\'t have permission to access this resource.',
  },
  404: {
    title: 'Page Not Found',
    message: 'The page doesn\'t exist or has been moved.',
  },
  500: {
    title: 'Server Error',
    message: 'Something went wrong on the server.',
  },
  502: {
    title: 'Bad Gateway',
    message: 'Unable to reach the server.',
  },
  503: {
    title: 'Service Unavailable',
    message: 'Service is temporarily unavailable. ',
  },
  504: {
    title: 'Gateway Timeout',
    message: 'The server took too long to respond. ',
  },
}

const defaultError = {
  title: 'Unknown Error',
  message: 'An unexpected error occurred. Please try again later.',
}

function getPresetError(statusCode: number) {
  if (statusCode in presetError)
    return presetError[statusCode as keyof typeof presetError]
  return defaultError
}

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
  const preset = getPresetError(code)
  const path = tryGetPath(error)
  const title = error.statusMessage || preset.title
  const message = (error.message || preset.message).replace(`: ${path}`, '')
  return {
    title,
    message,
    code,
    path,
  }
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
  <ErrorDisplay :error="buildError(error)" :back="null" class="min-h-screen p-8" :class="error.stack ? 'items-start' : '' ">
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
                <a :href="`vscode://file/${line.path}`">
                  {{ line.path }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="relative mt-4 overflow-auto text-sm">
          <input id="show-stack" type="checkbox" class="peer absolute opacity-0">

          <label for="show-stack" class="cursor-pointer select-none text-indigo peer-checked:hidden">More</label>
          <label for="show-stack" class="hidden cursor-pointer select-none text-indigo peer-checked:block">Close</label>

          <pre class="hidden py-2 text-shared peer-checked:block">{{ processStackMore(error.stack) }}</pre>
        </div>
      </div>
    </div>
  </ErrorDisplay>
</template>
