# Site

Generate my site from a `README.md` file.

## Usage

Here is an example configuration:

```ts
// config.ts
import { defineConfig } from './generate'

export default defineConfig({
  // Specifies the path to the input README.md file. The default value is "README.md".
  input: './public/README.md',

  // Specifies the path to the output index.html file.
  output: './dist/index.html',

  // Directory for public assets.
  public: './public',

  // Directory for distribution files.
  dist: './dist',

  // Configuration for the <head> section of the HTML, such as adding stylesheets.
  head: {
    link: [{ rel: 'stylesheet', href: 'style.css' }]
  }
})
```

To generate the index.html file, use the following command:

```sh
pnpm build
```
