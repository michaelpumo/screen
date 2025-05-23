<script lang="ts" setup>
import { getLength } from '../../utils/helpers'

interface Props {
  log?: unknown
  type?: string
}

const { log = undefined, type = '' } = defineProps<Props>()
</script>

<template>
  <span
    data-component="LengthCount"
    :class="`sl:rounded sl:font-bold sl:text-xs sl:bg-current sl:px-1 sl:bg-token-${type}`"
  >
    <span class="sl:text-primary">
      {{ getLength(log) }}
    </span>
  </span>
</template>
