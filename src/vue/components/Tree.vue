<script lang="ts" setup>
import {
  formatData,
  getLength,
  hasLength,
  toggleRows,
  truncate,
} from '../../utils/helpers'
import LengthCount from './LengthCount.vue'
import NoticeMaxDepth from './NoticeMaxDepth.vue'
import NoticeMaxLength from './NoticeMaxLength.vue'

interface Props {
  log?: unknown
  maxLength?: number
  maxDepth?: number
  currentDepth?: number
}

const {
  log = undefined,
  maxLength = Number.POSITIVE_INFINITY,
  maxDepth = Number.POSITIVE_INFINITY,
  currentDepth = 0,
} = defineProps<Props>()

const calculatedDepth = currentDepth + 1
const { data, typeDisplay, typeRaw } = await formatData(log)
const isNestable = ['object', 'array'].includes(typeDisplay)

// const getStruct = (data: Record<string, unknown> | unknown[]) => {
//   return typeDisplay === 'array'
//     ? truncate(data, maxLength)
//     : Object.keys(truncate(data, maxLength))
// }
const getStruct = (data: unknown) => {
  if (Array.isArray(data)) {
    return truncate(data, maxLength)
  }
  else if (typeof data === 'object' && data !== null) {
    return Object.keys(truncate(data as Record<string, unknown>, maxLength))
  }
  return []
}
</script>

<template>
  <table
    data-component="Tree"
    class="sl-component-table"
  >
    <template v-if="calculatedDepth <= maxDepth">
      <thead>
        <tr @click="toggleRows">
          <Component
            :is="isNestable ? 'th' : 'td'"
            :class="`sl:text-left sl:bg-primary sl:align-top ${isNestable ? 'sl:p-1 sl:m-0 sl:border-2 sl:border-solid sl:border-secondary' : 'sl:border-none sl:border-0'}`"
          >
            <template v-if="isNestable">
              <div class="sl:select-none sl:cursor-pointer sl:bg-secondary sl:px-1.5 sl:py-0.5 sl:rounded sl:text-muted">
                {{ typeDisplay === 'array' ? 'i' : 'key' }}
              </div>
            </template>

            <template v-else>
              <div :class="`sl:bg-secondary sl:px-1.5 sl:py-0.5 sl:rounded sl:text-token-${typeRaw}`">
                {{ typeRaw }}
              </div>
            </template>
          </Component>

          <Component
            :is="isNestable ? 'th' : 'td'"
            :class="`sl:text-left sl:bg-primary ${isNestable ? 'sl:p-1 sl:m-0 sl:border-2 sl:border-solid sl:border-secondary' : 'sl:border-none sl:border-0'}`"
          >
            <template v-if="isNestable">
              <div :class="`sl:flex sl:items-center sl:justify-start sl:gap-1.5 sl:bg-secondary sl:px-1.5 sl:py-0.5 sl:rounded sl:select-none sl:cursor-pointer sl:text-token-${typeRaw}`">
                {{ typeRaw }}

                <LengthCount
                  v-if="hasLength(typeDisplay)"
                  :log="data"
                  :type="typeRaw"
                />
              </div>
            </template>

            <template v-else>
              <div class="sl:flex sl:items-center sl:justify-start sl:gap-1.5 sl:bg-secondary sl:px-1.5 sl:py-0.5 sl:rounded sl:text-balance sl:max-w-[60ch] sl:max-h-20 sl:overflow-y-auto sl:overscroll-contain">
                <span class="sl:my-auto sl:whitespace-pre">
                  {{
                    typeRaw === 'string' && !(data as string).length
                      ? '(empty)'
                      : data ?? '(empty)'
                  }}
                </span>

                <LengthCount
                  v-if="hasLength(typeDisplay)"
                  :log="data"
                  :type="typeRaw"
                />
              </div>
            </template>
          </Component>
        </tr>
      </thead>

      <template v-if="isNestable">
        <tbody>
          <tr
            v-for="(value, index) of getStruct(data)"
            :key="index"
          >
            <td :class="`sl:bg-primary sl:align-top ${isNestable ? 'sl:p-1 sl:m-0 sl:border-2 sl:border-solid sl:border-secondary' : 'sl:border-none sl:border-0'}`">
              <div class="sl:text-muted sl:px-1.5 sl:py-0.5">
                {{ typeDisplay === 'array' ? index : value }}
              </div>
            </td>

            <td :class="`sl:bg-primary ${isNestable ? 'sl:p-1 sl:m-0 sl:border-2 sl:border-solid sl:border-secondary' : 'sl:border-none sl:border-0'}`">
              <Tree
                :log="typeDisplay === 'array' ? value : (data as Record<string, unknown>)[value]"
                :max-length="maxLength"
                :max-depth="maxDepth"
                :current-depth="calculatedDepth"
              />
            </td>
          </tr>

          <NoticeMaxLength
            v-if="getLength(data) > maxLength"
            :value="data"
            :max-length="maxLength"
          />
        </tbody>
      </template>
    </template>

    <template v-else>
      <tbody>
        <NoticeMaxDepth :max-depth="maxDepth" />
      </tbody>
    </template>
  </table>
</template>
