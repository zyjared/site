---
layout: home
---

<script setup lang="ts">
import Home from '@/components/Layout/Home.vue'

const data = {
    name: '应风',
    text: '笔记站',
    tagline: '欢迎访问 🎉',
}
</script>

<Home v-bind="data" />
