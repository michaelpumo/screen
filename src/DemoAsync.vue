<script lang="ts" setup>
import Screen from '@/components/Screen.vue'

const endpoint = 'https://jsonplaceholder.org/comments'
const response = await fetch(endpoint)
const data = await response.json()
</script>

<template>
  <Screen
    :log="data"
    label="Users" />
</template>
