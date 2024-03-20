<script lang="ts" setup>
import DemoAsync from '@/DemoAsync.vue'
</script>

<template>
  <div class="sl-p-5">
    <Suspense>
      <DemoAsync />

      <template #fallback>
        <p class="sl-text-type sl-font-mono sl-text-sm sl-font-bold">
          Loading...
        </p>
      </template>
    </Suspense>
  </div>
</template>
