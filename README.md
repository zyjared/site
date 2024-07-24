# buildpage

根据 markdown 文件生成特定主题的 html。

## 使用

确保根目录存在 `README.md`，如果需要特定的样式，可以查看[主题](#主题)，使用以下命令得到 `index.html`：

```sh
npx @zyjared/buildpage
```

## 主题

可以在 `.md` 文件中进行主题选择，目前也只有 `zyjared` 一种主题。

```md
---
title: 我的主页
theme:
  name: zyjared
  description: 这是简短的介绍,
  avatar: avatar.png
  link: https://github.com
---

# **这是 zyjared 主题**

zyjared 主题的一级标题可以加粗，会添加字体和颜色样式。

比如：

# 普通标题

# **蓝色标题**

# __红色点缀__**蓝色标题**

正文……
```

## 配置

如果不需要默认行为，也可以创建 `buildpage.config.js` 进行配置。

```js
const { defineConfig } = require('@zyjared/buildpage')

module.exports = defineConfig({
  input: 'README.md',
  output: 'index.html',
  assets: {
    dir: '.',
    outDir: '.',
    clean: false,
    overwrite: true,
    include: [],
    ignore: ['README.md'],
  },

  // https://unhead.unjs.io/usage/composables/use-head#input
  head: {
    link: [
      // { rel: 'stylesheet', href: 'custom.css' },
    ],
    meta: [
      // { name: 'description', content: 'some description' },
      // { name: 'keywords', content: 'keywords1, keywords2' },
    ]
  },
})
```

> [!TIP]
>
> 如果 `public` 目录中存在 `style.css` 文件，这将会自动添加到 `<head>` 中。

## 其他

```sh
pnpm buildpage -h

# Usage: buildpage [options]
#
# Options:
#  -V, --version          output the version number
#  -c, --config <config>  Path to the configuration file
#  -o, --output <output>  Path to the output HTML file
#  -i, --input <input>    Path to the input Markdown file
#  -a, --assets <assets>  Path to the assets directory
#  -d, --dist <dist>      Output directory for the generated files
#  -h, --help             display help for command
```
