<script lang="ts" setup>
import Screen from '@/components/Screen.vue'

const family = {
  name: 'Michael',
  age: 40,
  target: Infinity,
  children: false,
  about: {
    job: 'Web Developer',
    hobbies: ['hiking', 'development', 'cooking', 'guitar', 'crypto'],
    tagline: `Hello. I’m a freelance user interface developer. My name’s Michael Pumo. I craft user interfaces using modern frontend web technologies such as Vue and Nuxt.`
  },
  siblings: [
    {
      name: 'Vincent',
      age: 43,
      children: [
        {
          name: 'Hollie',
          age: 21
        },
        {
          name: 'Lily',
          age: 5
        }
      ]
    },
    {
      name: 'Laura',
      age: 38,
      children: [
        {
          name: 'Reuben',
          age: 6
        },
        {
          name: 'Rudi',
          age: 4
        }
      ]
    }
  ]
}
</script>

<template>
  <div class="sl-p-5">
    <Screen :log="family" />
  </div>
</template>
