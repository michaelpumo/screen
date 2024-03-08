<script lang="ts" setup>
import { getType, getLength } from '@/utils/helpers'

type Props = {
  dump: any
}

const { dump } = defineProps<Props>()
const dataType = getType(dump)
const isComplex = ['object', 'array', 'map', 'set'].includes(dataType)
</script>

<template>
  <div class="w-max text-xs font-mono bg-primary">
    <table class="border-collapse border-spacing-0">
      <tr>
        <td
          v-if="dataType !== 'set'"
          :class="`align-top ${isComplex ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
          <template v-if="isComplex">
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
          :class="`${isComplex ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
          <template v-if="isComplex">
            <div
              :class="`bg-secondary px-1.5 py-0.5 rounded text-brand-${dataType}`">
              {{ dataType === 'symbol' ? dump.description : dataType }}
            </div>
          </template>
          <template v-else>
            <div
              class="bg-secondary text-type px-1.5 py-0.5 rounded text-balance max-w-[60ch] max-h-20 overflow-y-auto">
              {{ dump ?? '(empty)' }}
            </div>
          </template>

          <!-- :class="[`is-${dataType}`, { 'is-value': !isComplex }]" -->

          <!-- <div
            v-if="
              ['array', 'object', 'map', 'set', 'string'].includes(dataType)
            ">
            [{{ getLength(dump) }}]
          </div> -->
        </td>
      </tr>

      <template v-if="isComplex">
        <template v-if="dataType === 'object'">
          <tr
            v-for="key in Object.keys(dump)"
            :key="key">
            <td
              :class="`align-top ${isComplex ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
              <div
                :class="`h-full sticky ${['object', 'array'].includes(getType(dump[key])) ? 'py-1.5 top-0' : 'top-1.5'}`">
                <div class="px-1.5 py-0.5 text-keyOrIdx">ll{{ key }}</div>
              </div>
            </td>
            <td
              :class="`${isComplex ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
              <VueLog :dump="dump[key]" />
            </td>
          </tr>
        </template>
        <!-- <template v-else-if="dataType === 'set'">
          <tr
            v-for="value in dump"
            :key="value">
            <td>
              <VueLog :dump="value" />
            </td>
          </tr>
        </template>
      -->
        <template v-else-if="dataType === 'array'">
          <tr
            v-for="(value, index) of dump"
            :key="index">
            <td
              :class="`align-top ${isComplex ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
              <div
                :class="`h-full sticky ${['object', 'array'].includes(getType(value)) ? 'py-1.5 top-0' : 'top-1.5'}`">
                <div class="px-1.5 py-0.5 text-keyOrIdx">
                  {{ index }}
                </div>
              </div>
            </td>
            <td
              :class="`align-top ${isComplex ? 'p-1 m-0 border-2 border-solid border-secondary' : 'border-none border-0'}`">
              <VueLog :dump="value" />
            </td>
          </tr>
        </template>
      </template>
    </table>
  </div>
</template>
