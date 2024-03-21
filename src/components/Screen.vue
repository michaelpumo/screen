<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import Tree from '@/components/Tree.vue'
import Switch from '@/components/Switch.vue'
import '@/assets/css/app.css'

type Props = {
  log?: unknown
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
  dark.value = Boolean(localStorage?.['sl-mode'] !== 'light') ?? dark.value
})

watch(dark, (value) => {
  if (!window?.localStorage) return
  window.localStorage['sl-mode'] = value ? 'dark' : 'light'
})

const labelSanitized =
  typeof label === 'string' && label?.trim().length
    ? label.trim()
    : 'Screen Log'

const maxLengthSanitized =
  typeof maxLength === 'number' && maxLength > 0 && maxLength !== Infinity
    ? maxLength
    : Infinity

const maxDepthSanitized =
  typeof maxDepth === 'number' && maxDepth > 0 && maxDepth !== Infinity
    ? maxDepth
    : Infinity
</script>

<template>
  <div
    data-component="Screen"
    :data-mode="dark ? 'dark' : 'light'"
    class="sl-pf sl-w-full sl-max-w-max sl-p-1 sl-bg-secondary sl-rounded sl-antialiased">
    <header
      class="sl-w-full sl-flex sl-items-center sl-justify-between sl-bg-primary sl-px-2 sl-py-1.5 sl-rounded-tl sl-rounded-tr sl-gap-3 sl-border-2 sl-border-secondary sl-border-b-0">
      <p
        v-if="labelSanitized"
        data-test-label
        class="sl-text-type sl-font-mono sl-text-sm sl-font-bold sl-m-0 sl-p-0">
        {{ labelSanitized }}
      </p>

      <ul
        data-test-options
        class="sl-flex sl-m-0 sl-p-0 sl-ml-auto sl-text-muted sl-font-mono sl-text-xs sl-gap-1">
        <li
          v-if="maxLengthSanitized !== Infinity"
          class="after:sl-content-['|'] after:sl-opacity-50 after:sl-ml-1">
          Max Length: {{ maxLengthSanitized }}
        </li>
        <li
          v-if="maxDepthSanitized !== Infinity"
          class="after:sl-content-['|'] after:sl-opacity-50 after:sl-ml-1">
          Max Depth: {{ maxDepthSanitized }}
        </li>
        <li>{{ dark ? 'Dark' : 'Light' }}</li>
      </ul>

      <Switch
        v-model="dark"
        label="Mode" />
    </header>

    <main
      data-test-main
      class="sl-overflow-x-auto sl-overscroll-x-contain">
      <Tree
        :log="log"
        :max-length="maxLengthSanitized"
        :max-depth="maxDepthSanitized" />
    </main>

    <footer
      data-test-footer
      class="sl-w-full sl-flex sl-items-center sl-justify-between sl-bg-primary sl-px-2 sl-py-2 sl-rounded-bl sl-rounded-br sl-gap-3 sl-border-2 sl-border-secondary sl-border-t-0">
      <p class="sl-text-type sl-font-mono sl-text-xs sl-m-0 sl-p-0">
        Made by
        <a
          class="sl-text-quaternary"
          href="https://x.com/michaelpumo"
          target="_blank">
          @michaelpumo
        </a>
      </p>
    </footer>
  </div>
</template>
