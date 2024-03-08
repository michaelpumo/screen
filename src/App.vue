<script lang="ts" setup>
import Screen from '@/components/Screen.vue'

const data = {
  weakMapVal: new WeakMap().set({}, 'world'),
  weakMap2Val: new WeakMap([
    [{ name: 'John' }, 'John Doe'],
    [{ name: 'Jane' }, 'Jane Doe']
  ]),
  mapVal: new Map().set('person', { name: 'Alice', age: 25 }).set('life', 42),
  setVal: new Set().add({ name: 'Alice', age: 25 }).add(42).add([1, 2, 3]),
  weakSetVal: new Set()
    .add({ name: 'Alice', age: 25 })
    .add(42)
    .add(
      'This book is a treatise on the theory of ethics, very popular during the Renaissance.'
    ),
  arrayVal: [1, 2, { name: 'Michael', age: 40 }, 4, 5],
  objectVal: {
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
  nanVal: NaN,
  regExVal: /^.+$/,
  documentVal: document.body,
  dateVal: new Date(),
  windowVal: window.location,
  undefinedVal: undefined,
  nullVal: null,
  booleanVal: true,
  numberVal: 42,
  bigIntVal: BigInt(9007199254740991),
  stringVal: 'Hello, World!',
  symbolVal: Symbol('example'),
  functionVal: function () {
    return 'Hello, World!'
  }
}

const family = {
  name: 'Michael',
  age: 40,
  children: false,
  siblings: [
    {
      name: 'Vincent',
      age: 43,
      children: true
    },
    {
      name: 'Even with the proposed change to consider the initializer for a const a literal type location, we couldnt trasitively to the same for properties in an object initializer because there is no indication that they are const. Specifically, you might want to assign a new value to styles.container.alignItems, but you wouldnt be able to if we inferred type "center" for it.',
      age: 38,
      children: true
    }
  ]
}
</script>

<template>
  <div class="p-5">
    <Screen :log="data" />
  </div>
</template>
