<template>
  <code
    class="rounded px-1.5 py-0.5 text-[0.95em] text-indigo tracking-tight font-mono bg-ctx-text/5"
    dark="text-indigo-300"
  ><slot /></code>
</template>

<style scoped>
code::before,
code::after {
  display: none;
}
</style>
