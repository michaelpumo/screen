<script lang="ts" setup>
interface Props {
  maxDepth?: number
}

const { maxDepth = Number.POSITIVE_INFINITY } = defineProps<Props>()
</script>

<template>
  <tr data-component="NoticeMaxDepth">
    <td class="sl-bg-primary sl-align-top sl-px-1 sl-py-1.5 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary sl-text-center">
      ✨
    </td>

    <td class="sl-bg-primary sl-align-top sl-px-1.5 sl-py-1.5 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary">
      <p class="sl-text-muted">
        Max depth of {{ maxDepth }} reached
      </p>
    </td>
  </tr>
</template>
