<script lang="ts" setup>
import { computed } from 'vue'

interface Props {
  id?: string
  label?: string
  value?: string
}

const { id = 'switch', label = 'Switch', value = '' } = defineProps<Props>()

const modelValue = defineModel()

const getValue = (target: HTMLInputElement | HTMLFormElement) => {
  const model = modelValue.value

  if (typeof model === 'boolean') {
    return target.checked
  }

  if (typeof model === 'string') {
    return value
  }

  const updatedItems = Array.isArray(model) ? [...model] : []

  return target.checked
    ? [...updatedItems, value]
    : updatedItems.filter((item) => item !== value)
}

const onChange = (event: Event) => {
  modelValue.value = getValue(event.target as HTMLInputElement)
}

const checked = computed(
  () =>
    (typeof modelValue.value === 'boolean' && modelValue.value) ||
    (typeof modelValue.value === 'string' && modelValue.value === value) ||
    (Array.isArray(modelValue.value) && modelValue.value.includes(value))
)
</script>

<template>
  <label
    data-component="FormSwitch"
    :for="id"
    class="sl-flex sl-cursor-pointer sl-items-center sl-select-none">
    <input
      :id="id"
      class="sl-peer sl-sr-only"
      type="checkbox"
      :checked="checked"
      @change="onChange" />

    <span
      class="sl-relative sl-block sl-w-10 sl-h-5 sl-rounded-3xl sl-transition-colors sl-duration-200 peer-checked:sl-bg-quaternary sl-bg-type after:sl-content-[''] after:sl-block after:sl-box-border after:sl-bg-secondary after:sl-w-auto after:sl-aspect-square after:sl-top-0.5 after:sl-left-0.5 after:sl-rounded-full after:sl-absolute after:sl-transition-all after:sl-duration-200 after:sl-h-[calc(100%_-_4px)] peer-checked:after:sl-translate-x-[20px] peer-checked:after:sl-bg-primary" />

    <span
      v-if="label"
      class="sl-sr-only">
      {{ label }}
    </span>
  </label>
</template>
