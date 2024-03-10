<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import Tree from '@/components/Tree.vue'
import Switch from '@/components/Switch.vue'
import '@/assets/css/app.css'

type Props = {
  log?: any
  label?: string
  maxLength?: number
  maxDepth?: number
}

const {
  log = undefined,
  label = 'Screen Log',
  maxLength = Infinity,
  maxDepth = Infinity
} = defineProps<Props>()

const dark = ref(true)

onMounted(() => {
  dark.value = dark.value || Boolean(localStorage?.['sl-mode'] === 'dark')
})

watch(dark, (value) => {
  localStorage['sl-mode'] = value ? 'dark' : 'light'
})
</script>

<template>
  <div
    data-component="Screen"
    :data-mode="dark ? 'dark' : 'light'"
    class="sl-pf sl-w-full sl-max-w-max sl-p-1 sl-bg-light-secondary dark:sl-bg-dark-secondary sl-rounded">
    <header
      class="sl-w-full sl-flex sl-items-center sl-justify-between sl-bg-light-primary dark:sl-bg-dark-primary sl-px-2 sl-py-1.5 sl-rounded-tl sl-rounded-tr sl-gap-2 sl-border-2 sl-border-light-secondary dark:sl-border-dark-secondary sl-border-b-0">
      <p
        v-if="label"
        class="sl-text-light-type dark:sl-text-dark-type sl-font-mono sl-text-sm sl-font-bold sl-m-0 sl-p-0">
        {{ label }}
      </p>

      <ul
        class="sl-flex sl-m-0 sl-p-0 sl-ml-auto sl-text-light-muted dark:sl-text-dark-muted sl-font-mono sl-text-xs sl-gap-1">
        <li
          v-if="maxLength !== Infinity"
          class="after:sl-content-['|'] after:sl-opacity-50 after:sl-ml-1">
          Max Length: {{ maxLength }}
        </li>
        <li
          v-if="maxDepth !== Infinity"
          class="after:sl-content-['|'] after:sl-opacity-50 after:sl-ml-1">
          Max Depth: {{ maxDepth }}
        </li>
        <li>{{ dark ? 'Dark' : 'Light' }}</li>
      </ul>

      <Switch
        v-model="dark"
        label="Mode" />
    </header>

    <main>
      <Tree
        :log="log"
        :max-length="maxLength"
        :max-depth="maxDepth" />
    </main>
  </div>
</template>
