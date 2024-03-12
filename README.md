<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/michaelpumo/screen/assets/4269460/0fb2d2db-6ce3-442b-ac76-b6005ee66e4f">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/michaelpumo/screen/assets/4269460/6861760b-d9e4-4682-9f97-d11f1c8cd118">
    <img alt="Screen" src="https://github.com/michaelpumo/screen/assets/4269460/6861760b-d9e4-4682-9f97-d11f1c8cd118" width="389" height="190" style="max-width: 100%;">
  </picture>
</p>

<p align="center">A simple Vue component to log the contents of a variable to the screen.<br>Think of it as <code>console.log</code> for the UI.</p>

<br>

<p align="center">
  <picture>
    <img alt="Screen" src="https://github.com/michaelpumo/screen/assets/4269460/eb443cd8-49d4-436c-a5ee-753dbf866816" width="605">
  </picture>
</p>

<br>

#### Features
- 💻 Log simple or complex values to the screen, in-place.
- 📋 See the types, lengths and structure of your data.
- 🌤️ Easily switch between light and dark modes (based on Dracula and Atom One Light themes).
- 👻 Expand and collapse objects and arrays.
- 🏷️ Custom label to make logging easier.
- ✨ Ability to set max-length and max-depth on the arrays and objects you want to display.
- 💥 Highlight outline to nested data, on hover.
- 🤗 Rendered into a semantic HTML `<table>`.

#### Install

```bash
$ npm i @michaelpumo/screen --save-dev
```

#### Stylesheet

##### Vue
Import the stylesheet into your main CSS file.
```css
@import '@michaelpumo/screen/dist/screen.css';
```

##### Nuxt
Import the stylesheet into your main `nuxt.config.{js,ts}` file.
```typescript
export default defineNuxtConfig({
  css: ['@michaelpumo/screen/dist/screen.css']
});
```

#### Example Usage

```html
<script lang="ts" setup>
import Screen from '@michaelpumo/screen'

const profile = {
  name: 'Michael',
  age: 40,
  children: false,
  about: {
    job: 'Web Developer',
    hobbies: ['hiking', 'cooking', 'guitar'],
    tagline: `I'm a freelance user interface developer.`
  }
}
</script>

<template>
  <Screen :log="profile" label="My Profile" />
</template>
```

#### Props
| Name | Type | Default | Description |
| --- | --- | --- | --- |
| log | any | undefined | The variable to log to the screen. |
| label | string | 'Screen Log' | The label to display at the top of the screen. |
| max-length | number | Infinity | The maximum length of arrays and object keys to display. |
| max-depth | number | Infinity | The maximum depth of objects to display. |

#### Motivation
I simply wanted something that functioned better than a basic `<pre>` tag for logging to the screen. 🤷🏻‍♂️ Feel free to share your thoughts on how this concept can be improved.

#### Requirements
- Vue 3+

#### Future
- Make ports for React and Svelte etc.
