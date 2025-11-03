import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((_nuxtApp) => {
  return {
    provide: {
      // 向所有 Vue 组件注入一个名为 `$hello` 的方法
      hello: (msg: string) => `111! ${msg}`,
    },
  }
})
