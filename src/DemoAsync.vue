<script lang="ts" setup>
import Screen from '@/components/Screen.vue'

const endpoint = 'https://jsonplaceholder.org/users'
const response = await fetch(endpoint)
const json = await response.json()
const data = json
</script>

<template>
  <Screen
    :log="data"
    label="Users" />
</template>
