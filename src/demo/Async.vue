<script lang="ts" setup>
import Screen from '@/components/Screen.vue'

const endpoint = 'https://jsonplaceholder.org/users/1'
const response = await fetch(endpoint)
const json = await response.json()
const user = json
</script>

<template>
  <Screen
    :log="user"
    label="User" />
</template>
