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
      :class="[
        'sl-bg-light-type dark:sl-bg-dark-type peer-checked:sl-bg-light-quaternary  dark:peer-checked:sl-bg-dark-quaternary sl-relative sl-block sl-w-9 sl-h-5 sl-flex-none sl-rounded-3xl sl-transition-all dark:peer-checked:sl-border-dark-quaternary ',
        `
        after:sl-bg-light-secondary 
        after:sl-w-auto
        after:sl-aspect-square
        after:sl-top-0
        after:sl-left-0
        after:sl-rounded-full
        after:sl-absolute
        after:sl-transition-all
        after:sl-h-full
        after:sl-border-2
        after:sl-border-light-type
        dark:after:sl-bg-dark-secondary 
        dark:after:sl-border-dark-type
        peer-checked:after:sl-left-4
        peer-checked:after:sl-border-light-quaternary
        peer-checked:after:sl-bg-light-primary
        dark:peer-checked:after:sl-bg-dark-primary
        `
      ]" />

    <span
      v-if="label"
      class="sl-sr-only">
      {{ label }}
    </span>
  </label>
</template>
