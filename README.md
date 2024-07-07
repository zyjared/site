# Site

Generate my site from a `README.md` file.

## Configuration

Create a `config.ts` file with the following content:

```ts
import { defineConfig } from './src/config'

export default defineConfig({
  input: {
    filepath: 'public/README.md',
    public: 'public',
    ignore: ['README.md'],
  },
  output: {
    dist: 'public',
    filename: 'index.html',
    clean: false,
    overwrite: true,
  },
  head: {
    htmlAttrs: { lang: 'zh-CN' },
    link: [
      { rel: 'stylesheet', href: 'style.css' },
      { rel: 'stylesheet', href: 'zyjared.css' },
    ],
    meta: [],
  },
})
```

## Usage

To generate the index.html file, use the following command:

```sh
$ pnpm build
```

## Command Options

Run the following command to see help options:

```sh
$ pnpm build -h

# Usage: build [options]
#
# Options:
#   -V, --version          output the version number
#   -c, --config <config>  Path to the configuration file
#   -o, --output <output>  Path to the output HTML file
#   -i, --input <input>    Path to the input Markdown file
#   -p, --public <public>  Directory containing public resources
#   -d, --dist <dist>      Output directory for the generated files
#   -h, --help             display help for command
```
