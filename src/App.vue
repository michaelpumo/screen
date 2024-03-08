<script lang="ts" setup>
import VueLog from '@/components/VueLog.vue'

const data = {
  arrayValue: [1, 2, { name: 'Michael', age: 40 }, 4, 5],
  objectValue: {
    name: 'John',
    age: 30,
    address: {
      city: 'New York',
      country: 'USA'
    },
    siblings: [
      { name: 'Vincent', age: 42, children: ['Hollie', 'Lily'] },
      { name: 'Laura', age: 38, children: ['Reuben', 'Rudi'] },
      {
        name: 'Michael',
        age: 40,
        children: [],
        description:
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum'
      }
    ]
  },
  nanValue: NaN,
  regExValue: /^.+$/,
  documentValue: document.body,
  dateValue: new Date(),
  windowValue: window.location,
  undefinedValue: undefined,
  nullValue: null,
  booleanValue: true,
  numberValue: 42,
  bigIntValue: BigInt(9007199254740991),
  stringValue: 'Hello, World!',
  symbolValue: Symbol('example'),
  functionValue: function () {
    return 'Hello, World!'
  }
}
</script>

<template>
  <div class="p-5">
    <VueLog :dump="data" />
  </div>
</template>
