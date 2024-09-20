<script lang="ts" setup>
import { computed } from 'vue'
import Tree from './Tree.vue'
import '../../css/app.css'

interface Props {
  log?: unknown
  label?: string
  maxLength?: number
  maxDepth?: number
  mode?: 'dark' | 'light'
}

const {
  log = undefined,
  label = 'Screen Log',
  maxLength = Number.POSITIVE_INFINITY,
  maxDepth = Number.POSITIVE_INFINITY,
  mode = 'dark',
} = defineProps<Props>()

const labelSanitized = computed(() =>
  typeof label === 'string' && label?.trim().length
    ? label.trim()
    : 'Screen Log',
)

const maxLengthSanitized = computed(() =>
  typeof maxLength === 'number'
  && maxLength > 0
  && maxLength !== Number.POSITIVE_INFINITY
    ? maxLength
    : Number.POSITIVE_INFINITY,
)

const maxDepthSanitized = computed(() =>
  typeof maxDepth === 'number'
  && maxDepth > 0
  && maxDepth !== Number.POSITIVE_INFINITY
    ? maxDepth
    : Number.POSITIVE_INFINITY,
)
</script>

<template>
  <div
    data-component="Screen"
    :data-mode="mode === 'dark' ? 'dark' : 'light'"
    class="sl-pf sl-w-full sl-max-w-max sl-p-1 sl-bg-secondary sl-rounded sl-antialiased"
  >
    <header
      class="sl-component-header"
    >
      <p
        v-if="labelSanitized"
        data-test-label
        class="sl-text-type sl-font-mono sl-text-sm sl-font-bold sl-m-0 sl-p-0"
      >
        {{ labelSanitized }}
      </p>

      <ul
        data-test-options
        class="sl-flex sl-m-0 sl-p-0 sl-ml-auto sl-text-muted sl-font-mono sl-text-xs sl-gap-2"
      >
        <li v-if="maxLengthSanitized !== Number.POSITIVE_INFINITY">
          Max Length: {{ maxLengthSanitized }}
        </li>

        <li v-if="maxDepthSanitized !== Number.POSITIVE_INFINITY">
          Max Depth: {{ maxDepthSanitized }}
        </li>
      </ul>
    </header>

    <main
      data-test-main
      class="sl-component-main"
    >
      <Suspense>
        <Tree
          :log="log"
          :max-length="maxLengthSanitized"
          :max-depth="maxDepthSanitized"
        />
      </Suspense>
    </main>

    <footer
      data-test-footer
      class="sl-component-footer"
    >
      <p class="sl-text-type sl-font-mono sl-text-xs sl-m-0 sl-p-0">
        Made by
        <a
          class="sl-text-quaternary"
          href="https://github.com/michaelpumo"
          target="_blank"
        >
          @michaelpumo
        </a>
      </p>
    </footer>
  </div>
</template>
