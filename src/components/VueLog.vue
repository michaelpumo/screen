<script lang="ts" setup>
import { ref, onMounted } from '@vue/runtime-core'

const log = ref<string>('')

onMounted(() => {})
</script>

<template>
  <div v-html="log" />
</template>
