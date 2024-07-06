# Site

Generate my site from a `README.md` file.

## Configuration

Create a `config.ts` file with the following content:

```ts
import { defineConfig } from '.'

export default defineConfig({
  input: {
    filename: 'public/README.md',
    public: 'public',
  },
  output: {
    dist: 'public', // if the same as input.public, skip copying assets
    filename: 'index.html',
    filepath: 'public/index.html', // the highest priority (overrides dist filename)
  },
  head: {
    link: [
      { rel: 'stylesheet', href: 'style.css' },
    ]
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
