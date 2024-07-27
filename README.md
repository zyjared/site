# buildpage

根据 markdown 文件生成**简单的单页 html**，这更像是我主页的样式历史记录。

## 使用

确保根目录存在 `README.md`，使用以下命令得到 `index.html`：

```sh
npx @zyjared/buildpage
```

如果需要特定的样式，`src/themes` 内的 `README.md` 为示例文件。

## 配置

如果不需要默认行为，也可以创建 `buildpage.config.js` 进行配置。

```js
const { defineConfig } = require('@zyjared/buildpage')

module.exports = defineConfig({
  input: 'README.md',
  output: 'index.html',
  assets: {
    dir: '.', // assets
    outDir: '.', // public
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
> 如果 `public` 目录中存在以下文件，将会自动添加到 `<head>` 中:
> - `favicon.[ico|png|svg|webp|gif|jpg|jpeg]`: 权重依次由高到低
> - `style.css`

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
