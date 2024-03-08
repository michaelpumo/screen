<script lang="ts" setup>
import { getType, getLength, hasLength, isComplexType } from '@/utils/helpers'

type Props = {
  log: any
}

const { log } = defineProps<Props>()
const dataType = getType(log)
const dataComplexType = isComplexType(log)
</script>

<template>
  <div class="w-max text-sm text-type font-mono bg-primary">
    <table class="border-collapse border-spacing-0">
      <tr>
        <td
          v-if="dataType !== 'set'"
          :class="`align-top ${dataComplexType ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
          <template v-if="dataComplexType">
            <div class="bg-secondary px-1.5 py-0.5 rounded text-keyOrIdx">
              {{ dataType === 'array' ? 'i' : 'key' }}
            </div>
          </template>
          <template v-else>
            <div class="h-full sticky top-1.5">
              <div
                :class="`bg-secondary px-1.5 py-0.5 rounded text-brand-${dataType}`">
                {{ dataType }}
              </div>
            </div>
          </template>
        </td>

        <td
          :class="`${dataComplexType ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
          <template v-if="dataComplexType">
            <div
              :class="`flex items-center justify-start gap-1.5 bg-secondary px-1.5 py-0.5 rounded text-brand-${dataType}`">
              {{ dataType === 'symbol' ? log.description : dataType }}

              <span
                v-if="hasLength(dataType)"
                :class="`rounded px-1 font-bold text-xs text-primary bg-brand-${dataType}`">
                {{ getLength(log) }}
              </span>
            </div>
          </template>
          <template v-else>
            <div
              class="flex items-center justify-start gap-1.5 bg-secondary text-type px-1.5 py-0.5 rounded text-balance max-w-[60ch] max-h-20 overflow-y-auto overscroll-contain">
              {{ log ?? '(empty)' }}

              <span
                v-if="hasLength(dataType)"
                :class="`rounded px-1 font-bold text-xs text-primary bg-brand-${dataType}`">
                {{ getLength(log) }}
              </span>
            </div>
          </template>
        </td>
      </tr>

      <template v-if="dataComplexType">
        <template v-if="dataType === 'object'">
          <tr
            v-for="key in Object.keys(log)"
            :key="key">
            <td
              :class="`align-top ${dataComplexType ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
              <div
                :class="`h-full sticky ${['object', 'array'].includes(getType(log[key])) ? 'py-1.5 top-0' : 'top-1.5'}`">
                <div class="px-1.5 py-0.5 text-keyOrIdx">{{ key }}</div>
              </div>
            </td>
            <td
              :class="`${dataComplexType ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
              <Screen :log="log[key]" />
            </td>
          </tr>
        </template>

        <template v-else-if="dataType === 'set'">
          <tr
            v-for="value of log"
            :key="value">
            <td
              :class="`align-top ${dataComplexType ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
              <div
                :class="`h-full sticky ${['object', 'array'].includes(getType(value)) ? 'py-1.5 top-0' : 'top-1.5'}`">
                <div class="px-1.5 py-0.5 text-keyOrIdx">
                  <Screen :log="value" />
                  <!-- {{ value }} -->
                </div>
              </div>
            </td>
            <!-- <td>
              <Screen :log="value" />
            </td> -->
          </tr>
        </template>

        <template v-else>
          <tr
            v-for="(value, index) of log"
            :key="index">
            <td
              :class="`align-top ${dataComplexType ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
              <div
                :class="`h-full sticky ${['object', 'array'].includes(getType(value)) ? 'py-1.5 top-0' : 'top-1.5'}`">
                <div class="px-1.5 py-0.5 text-keyOrIdx">{{ index }}</div>
              </div>
            </td>
            <td
              :class="`align-top ${dataComplexType ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
              <Screen :log="value" />
            </td>
          </tr>
        </template>
      </template>
    </table>
  </div>
</template>
