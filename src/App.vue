<script lang="ts" setup>
import DemoAsync from '@/demo/Async.vue'
import DemoStandard from '@/demo/Standard.vue'
</script>

<template>
  <div class="sl-p-5">
    <h1 class="sl-text-type sl-font-mono sl-text-lg sl-font-bold">
      Async Demo
    </h1>

    <Suspense>
      <DemoAsync />

      <template #fallback>
        <p class="sl-text-type sl-font-mono sl-text-sm sl-font-bold">
          Loading...
        </p>
      </template>
    </Suspense>

    <h1 class="sl-text-type sl-font-mono sl-text-lg sl-font-bold">
      Standard Demo
    </h1>

    <DemoStandard />
  </div>
</template>
