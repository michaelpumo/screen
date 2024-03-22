<script lang="ts" setup>
import Screen from '@/components/Screen.vue'

const profile = {
  name: 'Michael',
  age: 40,
  children: false,
  about: {
    job: 'Web Developer',
    hobbies: ['hiking', 'cooking', 'guitar'],
    tagline: `I'm a freelance user interface developer.`
  }
}
</script>

<template>
  <Screen
    :log="profile"
    label="My Profile" />
</template>
