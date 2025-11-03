import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions { }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'my-module',
    configKey: 'myModule',
  },
  // 模块的默认配置
  defaults: {
    // 这里可以定义你的模块的默认配置选项
    enabled: true,
    someOption: 'default-value111',
  },
  setup(_options, _nuxt) {
    // 1. 使用 @nuxt/kit 的工具函数
    const resolver = createResolver(import.meta.url)
    // 2. 检查模块是否被禁用（根据用户配置）
    if (_options.enabled === false) {
      return // 如果模块被禁用，则直接返回
    }
    // 3. 添加一个插件！
    // 这是模块最常见的操作之一。
    // 插件会在 Nuxt App 运行时加载。
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
