<script lang="ts" setup>
import Screen from '../components/Screen.vue'

const endpoint = 'https://dummyjson.com/products/1'
const response = await fetch(endpoint)
const json = await response.json()
const product = json
</script>

<template>
  <Screen
    :log="product"
    label="Product" />
</template>
