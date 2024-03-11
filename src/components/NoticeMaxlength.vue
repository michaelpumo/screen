<script lang="ts" setup>
import { getLength } from '@/utils/helpers'

type Props = {
  value?: [] | {}
  maxLength?: number
}

const { value = undefined, maxLength = Infinity } = defineProps<Props>()
</script>

<template>
  <tr data-component="NoticeMaxlength">
    <td
      class="sl-bg-primary sl-align-top sl-px-1 sl-py-1.5 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary sl-text-center">
      ✨
    </td>
    <td
      class="sl-bg-primary sl-align-top sl-px-1.5 sl-py-1.5 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary">
      <p class="sl-text-muted">+{{ getLength(value) - maxLength }} more</p>
    </td>
  </tr>
</template>
