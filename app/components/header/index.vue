<script setup lang='ts'>
const route = useRoute()
const isHome = computed(() => route.path === '/')

const variants = {
  visible: {
    opacity: 1,
    flex: 1,
    overflow: 'auto',
    transition: {
      opacity: {
        delay: 0.2,
      },
      default: {
        duration: 0.35,
      },
    },
  },
  hidden: {
    flex: 0,
    opacity: 0,
    overflow: 'hidden',
    transition: {
      opacity: {
        duration: 0.2,
      },
      default: {
        duration: 0.4,
      },
    },
  },
}
</script>

<template>
  <ClientOnly>
    <header tag="header" name="header" class="relative h-full flex-col-center p-2">
      <MotionLayoutGroup>
        <HeaderLogo key="logo" />

        <MotionAnimatePresence>
          <Motion
            v-show="!isHome"
            key="motion-navbar"
            layout
            :variants="variants"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <HeaderNavbar key="navbar" class="" />
          </Motion>
        </MotionAnimatePresence>

        <div key="others" class="flex-col-center gap-8 pt-12">
          <HeaderSocials />
          <DarkModeVertical class="text-xl" />
        </div>
      </MotionLayoutGroup>

      <MotionAnimatePresence>
        <Motion
          v-show="!isHome"
          key="motion-divide"
          layout
          :style="{
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translate(50%, -50%)',
            zIndex: -1,
          }"
          :initial="{
            clipPath: 'inset(50% 0)',
          }"
          :animate="{
            opacity: 1,
            clipPath: 'inset(0 0)',
            transition: {
              delay: 0.3,
              duration: 0.5,
            },
          }"
          :exit="{
            opacity: 0,
            clipPath: 'inset(50% 0)',
            transition: {
              duration: 0.3,
            },
          }"
        >
          <Divide
            vertical
            class=""
          />
        </Motion>
      </MotionAnimatePresence>
    </header>
  </ClientOnly>
</template>
