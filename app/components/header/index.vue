<script setup lang='ts'>
const divideVariants = {
  initial: {
    clipPath: 'inset(50% 0)',
  },
  animate: {
    opacity: 1,
    clipPath: 'inset(0 0)',
    transition: {
      delay: 0.3,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    clipPath: 'inset(50% 0)',
    transition: {
      duration: 0.3,
    },
  },
}
</script>

<template>
  <header tag="header" name="header" class="relative h-full flex-col-center">
    <HeaderLogo key="logo" />

    <div class="flex-1">
      <HeaderNavbar key="navbar" class="" />
    </div>

    <div key="others" class="flex-col-center gap-8 pt-12">
      <HeaderSocials />
      <DarkModeVertical class="text-xl" />
    </div>

    <Motion
      key="motion-divide"
      layout
      :style="{
        position: 'absolute',
        right: '0',
        top: '50%',
        transform: 'translate(50%, -50%)',
        zIndex: -1,
      }"
      :variants="divideVariants"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <UiDivide
        vertical
        :content="false"
        class="h-80"
      />
    </Motion>
  </header>
</template>
