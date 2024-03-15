<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/michaelpumo/screen/assets/4269460/0fb2d2db-6ce3-442b-ac76-b6005ee66e4f">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/michaelpumo/screen/assets/4269460/6861760b-d9e4-4682-9f97-d11f1c8cd118">
    <img alt="Screen" src="https://github.com/michaelpumo/screen/assets/4269460/6861760b-d9e4-4682-9f97-d11f1c8cd118" width="389" height="190" style="max-width: 100%;">
  </picture>
</p>

<p align="center">A simple component to log the contents of a variable to the screen.<br>Think of it as <code>console.log</code> for the UI.</p>

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

<br>

> [!IMPORTANT]  
> This project is under active development and may go through significant changes. Early users greatly appreciated for feedback, advice and suggestions 🙏

<br>

#### Install

```bash
npm i @michaelpumo/screen --save-dev
```

#### Frameworks

<details>
  <summary><img alt="Vue Setup" src="https://github.com/michaelpumo/screen/assets/4269460/33cd99e4-c85c-416b-8e50-49de380f96d0" width="16" valign="middle"> Vue Setup</summary>

  #### Vue Demo
  <p>
    <a href="https://stackblitz.com/edit/screen-demo-vue?file=src%2FApp.vue" target="_blank">
      <img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="StackBlitz Demo Vue" width="160">
    </a>
  </p>

  Import the stylesheet into your main CSS file.
  
  ```css
  @import '@michaelpumo/screen/dist/screen.css';
  ```
</details>

<details>
  <summary><img alt="Nuxt Setup" src="https://github.com/michaelpumo/screen/assets/4269460/5d2b481c-d2b3-41f1-8e70-db07ce6588bb" width="16" valign="middle"> Nuxt Setup</summary>

  #### Nuxt Demo
  <p>
    <a href="https://stackblitz.com/edit/screen-demo-nuxt?file=app.vue" target="_blank">
      <img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt="StackBlitz Demo Nuxt" width="160">
    </a>
  </p>

  Import the stylesheet into your main `nuxt.config.{js,ts}` file.

  ```typescript
  export default defineNuxtConfig({
    css: ['@michaelpumo/screen/dist/screen.css']
  });
  ```

  You may also find it useful to have Nuxt auto-import the component, so that you can use it freely around your application without manually importing everywhere you need it. You can do this by creating a simple module that imports it for you automatically.
  
  `modules/screen.ts`

  ```typescript
  import { addComponent, defineNuxtModule } from '@nuxt/kit';
  
  export default defineNuxtModule({
    setup() {
      addComponent({
        name: 'Screen',
        filePath: '@michaelpumo/screen',
        mode: 'client',
      });
    },
  });
  ```

  Make sure you have auto component import enabled in your `nuxt.config.{js,ts}` file too:
  
  ```typescript
  export default defineNuxtConfig({
    css: ['@michaelpumo/screen/dist/screen.css'],
    components: true,
  });
  ```
 
  **Note** If you do not want to auto import this component (though it's recommended) then you may need to wrap `<Screen />` into a `<ClientOnly>` tag to avoid warnings with SSR:

  ```html
  <template>
    <ClientOnly>
      <Screen :log="profile" label="My Profile" />
    </ClientOnly>
  </template>
  ```
</details>

<details>
  <summary><img alt="React Setup" src="https://github.com/michaelpumo/screen/assets/4269460/278d3f61-b47d-4841-86c0-41f0717bae8c" width="16" valign="middle"> React Setup</summary>

  Coming soon.
</details>

#### Example Usage (Vue + Nuxt)

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
| max-depth | number | Infinity | The maximum depth of the tree to display. |

#### Motivation
I simply wanted something that functioned better than a basic `<pre>` tag for logging to the screen. 🤷🏻‍♂️ Feel free to share your thoughts on how this concept can be improved.

#### Requirements
- Vue 3+

#### Future
- Make ports for React and Svelte etc.
