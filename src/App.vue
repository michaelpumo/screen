<script lang="ts" setup>
import DemoAsync from './demo/Async.vue'
import DemoDark from './demo/Dark.vue'
import DemoLight from './demo/Light.vue'
</script>

<template>
  <main class="sl-p-10 sl-grid sl-grid-cols-1 sl-gap-10">
    <section>
      <h1
        class="sl-text-type sl-font-mono sl-text-lg sl-font-bold sl-mt-0 sl-mb-5">
        Dark Demo
      </h1>
      <DemoDark />
    </section>

    <section>
      <h1
        class="sl-text-type sl-font-mono sl-text-lg sl-font-bold sl-mt-0 sl-mb-5">
        Light Demo
      </h1>
      <DemoLight />
    </section>

    <section>
      <h1
        class="sl-text-type sl-font-mono sl-text-lg sl-font-bold sl-mt-0 sl-mb-5">
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
    </section>
  </main>
</template>
