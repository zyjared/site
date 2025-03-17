<script lang="ts" setup>
interface Error {
  code: number
  title?: string
  message?: string
  path?: string
  fatal?: boolean
  unhandled?: boolean
}

interface Back {
  text: string
  link: string
}

const { error, back = { text: 'Return Home', link: '/' } } = defineProps<{
  error: Error
  back?: null | Back
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

const route = useRoute()

const data = computed(() => {
  const preset = getPresetError(error.code)

  return {
    ...error,
    path: error.path || route.path,
    title: error.title || preset.title,
    message: error.message || preset.message,
  }
})

function returnHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="flex-col-center gap-4">
    <div flex="~ gap-6">
      <div flex="~ col justify-between gap-1" class="relative text-right">
        <h2 class="text-8xl font-bold tracking-tight">
          <div class="absolute inset-0 from-blue-500/20 to-indigo-500/20 bg-gradient-to-r blur-2xl" />
          <span>{{ data.code }}</span>
        </h2>
        <div text="sm shared/80" class="tracking-tight font-mono space-y-1">
          <p class="tracking-tight">
            {{ data.path }}
          </p>

          <div class="flex items-center justify-end gap-2">
            <div class="flex gap-1.5 text-xs">
              <span
                v-if="data.fatal"
                class="border border-red-500/20 rounded bg-red-500/10 px-1.5 py-0.5 text-red-400"
              >
                Fatal
              </span>
              <span
                v-if="data.unhandled"
                class="border border-amber-500/20 rounded bg-amber-500/10 px-1.5 py-0.5 text-amber-400"
              >
                Unhandled
              </span>
            </div>

            <span text="red-400 sm" class="tracking-widest uppercase">
              Error
            </span>
          </div>
        </div>
      </div>

      <div class="h-24 w-px from-transparent via-indigo to-transparent bg-gradient-to-b" />

      <p
        class="max-h-42 w-4 overflow-hidden leading-none tracking-wider uppercase write-vertical-right"
        text="shared/60"
      >
        {{ data.title }}
      </p>
    </div>

    <p class="tracking-tight font-mono ctx-text/50">
      {{ data.message }}
    </p>

    <button
      v-if="back !== null"
      :to=" back.link"
      class="cursor-pointer bg-shared/0 px-6 py-3 text-shared transition-300"
      un-b="~ solid shared/30"
      un-hover="b-shared ctx-text"
      @click="returnHome"
    >
      {{ back.text }}
    </button>

    <slot />
  </div>
</template>
