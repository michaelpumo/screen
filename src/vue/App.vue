<script lang="ts" setup>
import Screen from './components/Screen.vue'

const data = {
  document: document,
  window: window,
  globalThis: globalThis,
  self: self,
  top: top,
  parent: parent,
  frames: frames,
  history: history,
  location: location,
  navigator: navigator,
  screen: screen,
  localStorage: localStorage,
  sessionStorage: sessionStorage,
  indexedDB: indexedDB,
  caches: caches,
  fetch: fetch,
  Array: [1, 2, [1, 2, 3], 3],
  ArrayBuffer: new ArrayBuffer(8),
  AsyncFunction: async () => {},
  AsyncGenerator: function* () {},
  AsyncGeneratorFunction: async function* () {},
  AsyncIterator: (async function* () {})(),
  Atomics: Atomics.add(new Int32Array(8), 2, 7),
  audio: new Audio(),
  BigInt: BigInt(42),
  BigInt64Array: new BigInt64Array(8),
  BigUint64Array: new BigUint64Array(8),
  Boolean: true,
  // Blob: new Blob(['Hello Blob'], { type: 'text/plain' }),
  Blob: new Blob([JSON.stringify({ message: 'Hello World' }, null, 2)], {
    type: 'application/json',
  }),
  console: console,
  crypto: window.crypto,
  DataView: new DataView(new ArrayBuffer(8)),
  Date: new Date(),
  decodeURI: decodeURI('https://x.com?&name=michael'),
  decodeURIComponent: decodeURIComponent('https://x.com?name=michael'),
  encodeURI: encodeURI('https://x.com?name=michael'),
  encodeURIComponent: encodeURIComponent('https://x.com?name=michael'),
  Error: new Error('This is the error'),
  eval: eval('1 + 1'),
  EvalError: EvalError('This is an eval error'),
  file: new File([''], 'file.txt'),
  Float32Array: new Float32Array(8),
  Float64Array: new Float64Array(8),
  Function: function () {},
  Generator: function* () {},
  GeneratorFunction: function* () {}.constructor,
  image: new Image(),
  Infinity: Infinity,
  Int16Array: new Int16Array(8),
  Int32Array: new Int32Array(8),
  Int8Array: new Int8Array(8),
  Intl: Intl.DateTimeFormat('en-US').format(new Date()),
  IntlObj: Intl,
  isFinite: isFinite(42),
  isNaN: isNaN(42),
  Iterator: (function* () {})(),
  JSON: JSON,
  Map: new Map([
    ['key', 'value'],
    ['name', 'michael'],
  ]),
  Math: Math,
  NaN: NaN,
  Number: Number(42),
  Null: null,
  Object: { key: 'value' },
  performance: window.performance,
  parseFloat: parseFloat('42'),
  parseInt: parseInt('42'),
  Promise: Promise.resolve(),
  Proxy: new Proxy(
    {
      message1: 'hello',
      message2: 'everyone',
    },
    {
      get(target, prop, receiver) {
        return target[prop]
      },
    },
  ),
  ProxyObj: Proxy,
  RangeError: new RangeError('This is a range error'),
  ReferenceError: new ReferenceError('This is a reference error'),
  Reflect: Reflect,
  RegExp: /regexp/,
  Set: new Set().add({ a: 'a', b: 'b' }).add({ c: 'c', d: 'd' }),
  String: 'Hello, World!',
  Symbol: Symbol('symbol'),
  SyntaxError: new SyntaxError('This is a syntax error'),
  TypedArray: new Int8Array(8),
  TypeError: new TypeError('This is a type error'),
  Uint16Array: new Uint16Array(8),
  Uint32Array: new Uint32Array(8),
  Uint8Array: new Uint8Array(8),
  Uint8ClampedArray: new Uint8ClampedArray(8),
  undefined: undefined,
  URIError: new URIError('This is a URI error'),
  url: new URL('https://www.example.com?hello=world&name=michael'),
  WeakMap: new WeakMap(),
  WeakRef: new WeakRef({}),
  WeakSet: new WeakSet(),
}

for (const key in data) {
  console.log(key, typeof data[key])
}
</script>

<template>
  <main class="sl-p-10 sl-grid sl-grid-cols-1 sl-gap-10">
    <section>
      <h1
        class="sl-text-type sl-font-mono sl-text-lg sl-font-bold sl-mt-0 sl-mb-5">
        Demo
      </h1>

      <Screen
        :log="data"
        label="My Data" />
    </section>
  </main>
</template>
