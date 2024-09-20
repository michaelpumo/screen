import { addComponent, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: '@michaelpumo/screen',
    configKey: 'screen',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    addComponent({
      name: 'Screen',
      filePath: resolver.resolve('../vue/components/Screen.vue'),
    })

    nuxt.options.css.push(resolver.resolve('../app.css'))
  },
})
