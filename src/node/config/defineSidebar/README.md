# defineSidebar

`defineSidebar` 用于定义侧边栏，定义链接时不再关注父节点。当最后使用 `SidebarMulti` 类型时，会根据 `base` 做最后的转换，包含嵌套、`text` 生成等操作。

## 使用

### 类型提示

如果没有第二个参数，`defineSidebar` 只是类型检查的工具。

```ts
const learn = defineSidebar({
  base: 'learn',
  items: [
    { link: '01' },
    { link: '02' },
  ]
})

const api = defineSidebar({
  base: 'api',
  items: defineSidebar([{ link: '01' }])
})
```

### 转换为 `SidebarMulti`

传递第二个参数时，返回结果为 `SidebarMulti` 类型。如果缺失 `text`，会根据 `link` 生成。

```ts
const sidebar = defineSidebar([
  learn,
  api
], {
  root: 'docs'
})

// 等价于

const sidebar: SidebarMulti = {
  '/docs/learn/': {
    base: '/docs/learn/',
    items: [
      { text: '01', link: '01' },
      { text: '02', link: '02' },
    ]
  },
  '/docs/api/': {
    base: '/docs/api/',
    items: [
      { text: '01', link: '01' },
    ]
  }
}
```

### 处理 `SidebarMulti`

如果 `SidebarMulti` 类型需要追加根目录，可以通过传递 `root` 参数追加。

```ts
const apiMulti = defineSidebar(api, {})
// { '/api/': ... }

const sidebar = defineSidebar(apiMulti, {
  root: 'docs',
  nest: false // 禁用嵌套，apiMulti 已处理过
})
// { '/docs/api/': ... }
```
