<script lang="ts" setup>
import {
  getType,
  getLength,
  hasLength,
  isComplexType,
  truncate
} from '@/utils/helpers'
import NoticeMaxlength from '@/components/NoticeMaxlength.vue'

type Props = {
  log?: any
  maxLength?: number
  maxDepth?: number
}

const {
  log = undefined,
  maxLength = Infinity,
  maxDepth = Infinity
} = defineProps<Props>()
const dataType = getType(log)
const dataComplexType = isComplexType(log)

const toggle = (e: Event) => {
  const table = (e.target as HTMLElement).closest('table')

  if (!table) return

  const rows = Array.from(
    table.querySelectorAll(':scope > tr:not(:first-child)')
  ) as HTMLTableRowElement[]

  if (!rows || rows.length === 0) {
    return
  }

  rows.forEach((tr) => {
    tr.classList.toggle('sl-hidden')
  })
}
</script>

<template>
  <table
    data-component="Tree"
    class="sl-w-max sl-text-sm sl-text-type sl-font-mono sl-border-collapse sl-border-spacing-0 sl-outline-[rgba(0,0,0,0)] sl-rounded sl-outline sl-outline-1 hover:sl-outline-tertiary sl-outline-offset-1 sl-transition-all sl-duration-200">
    <tr @click="toggle">
      <td
        v-if="dataType !== 'set'"
        :class="`sl-bg-primary sl-align-top ${dataComplexType ? 'sl-p-1 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary' : 'sl-border-none sl-border-0'}`">
        <template v-if="dataComplexType">
          <div
            class="sl-select-none sl-cursor-pointer sl-bg-secondary sl-px-1.5 sl-py-0.5 sl-rounded sl-text-muted">
            {{ dataType === 'array' ? 'i' : 'key' }}
          </div>
        </template>
        <template v-else>
          <div class="sl-h-full sl-sticky sl-top-1.5">
            <div
              :class="`sl-bg-secondary sl-px-1.5 sl-py-0.5 sl-rounded sl-text-token-${dataType}`">
              {{ dataType }}
            </div>
          </div>
        </template>
      </td>

      <td
        :class="`sl-bg-primary ${dataComplexType ? 'sl-p-1 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary' : 'sl-border-none sl-border-0'}`">
        <template v-if="dataComplexType">
          <div
            :class="`sl-flex sl-items-center sl-justify-start sl-gap-1.5 sl-bg-secondary sl-px-1.5 sl-py-0.5 sl-rounded sl-select-none sl-cursor-pointer sl-text-token-${dataType}`">
            {{ dataType === 'symbol' ? log.description : dataType }}

            <span
              v-if="hasLength(dataType)"
              :class="`sl-rounded sl-px-1 sl-font-bold sl-text-xs sl-text-primary sl-bg-token-${dataType}`">
              {{ getLength(log) }}
            </span>
          </div>
        </template>
        <template v-else>
          <div
            class="sl-flex sl-items-center sl-justify-start sl-gap-1.5 sl-bg-secondary sl-text-type sl-px-1.5 sl-py-0.5 sl-rounded sl-text-balance sl-max-w-[60ch] sl-max-h-20 sl-overflow-y-auto sl-overscroll-contain">
            {{ log ?? '(empty)' }}

            <span
              v-if="hasLength(dataType)"
              :class="`sl-rounded sl-px-1 sl-font-bold sl-text-xs sl-text-primary sl-bg-token-${dataType}`">
              {{ getLength(log) }}
            </span>
          </div>
        </template>
      </td>
    </tr>

    <template v-if="dataComplexType">
      <template v-if="dataType === 'object'">
        <tr
          v-for="key in Object.keys(truncate(log, maxLength))"
          :key="key">
          <td
            :class="`sl-bg-primary sl-align-top ${dataComplexType ? 'sl-p-1 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary' : 'sl-border-none sl-border-0'}`">
            <div
              :class="`sl-h-full sl-sticky ${['object', 'array'].includes(getType(log[key])) ? 'sl-py-1.5 sl-top-0' : 'sl-top-1.5'}`">
              <div class="sl-px-1.5 sl-py-0.5 sl-text-muted">
                {{ key }}
              </div>
            </div>
          </td>
          <td
            :class="`sl-bg-primary ${dataComplexType ? 'sl-p-1 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary' : 'sl-border-none sl-border-0'}`">
            <Tree
              :log="log[key]"
              :max-length="maxLength"
              :max-depth="maxDepth" />
          </td>
        </tr>

        <NoticeMaxlength
          v-if="getLength(log) > maxLength"
          :value="log"
          :maxLength="maxLength" />
      </template>

      <template v-else-if="dataType === 'set'">
        <tr
          v-for="value of log"
          :key="value">
          <td
            :class="`sl-bg-primary ${dataComplexType ? 'sl-p-1 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary' : 'sl-border-none sl-border-0'}`">
            <Tree
              :log="value"
              :max-length="maxLength"
              :max-depth="maxDepth" />
          </td>
        </tr>
      </template>

      <template v-else>
        <tr
          v-for="(value, index) of truncate(log, maxLength)"
          :key="index">
          <td
            :class="`sl-bg-primary sl-align-top ${dataComplexType ? 'sl-p-1 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary' : 'sl-border-none sl-border-0'}`">
            <div
              :class="`sl-h-full sl-sticky ${['object', 'array'].includes(getType(value)) ? 'sl-py-1.5 sl-top-0' : 'sl-top-1.5'}`">
              <div class="sl-px-1.5 sl-py-0.5 sl-text-muted">
                {{ index }}
              </div>
            </div>
          </td>
          <td
            :class="`sl-bg-primary sl-align-top ${dataComplexType ? 'sl-p-1 sl-m-0 sl-border-2 sl-border-solid sl-border-secondary' : 'sl-border-none sl-border-0'}`">
            <Tree
              :log="value"
              :max-length="maxLength"
              :max-depth="maxDepth" />
          </td>
        </tr>

        <NoticeMaxlength
          v-if="getLength(log) > maxLength"
          :value="log"
          :maxLength="maxLength" />
      </template>
    </template>
  </table>
</template>
