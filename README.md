<h1 align="center">
&lt;Screen /&gt;
</h1>

<p align="center" style="max-width: 60ch; text-align: center; text-wrap: balance;">A simple Vue component to log the contents of a variable to the screen. Think of it as <code>console.log</code> for the UI.</p>

#### Install

```bash
$ npm i @michaelpumo/screen --save-dev
```

#### Example

```html
<script lang="ts" setup>
import Screen from '@michaelpumo/screen'

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
      name: 'Laura',
      age: 38,
      children: true
    }
  ]
}
</script>

<template>
  <Screen :log="family" />
</template>
```

#### Motivation
I simply wanted something that functioned better than a basic `<pre>` tag for logging to the screen. 🤷🏻‍♂️ Feel free to share your ideas on how this idea can be improved.

#### Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| log | any | undefined | The variable to log to the screen. |
| label | string | 'Screen Log' | The label to display at the top of the screen. |
| max-length | number | Infinity | The maximum length of arrays and object keys to display. |
| max-depth | number | Infinity | The maximum depth of objects to display. |
