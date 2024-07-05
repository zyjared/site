# README site

This project allows you to generate an `index.html` file from a `README.md` file, making it easy to create a personal homepage. The generated `index.html` is optimized for search engines, compatible with various browsers, and ensures fast rendering.

## Usage

Here is an example configuration:

```ts
// config.ts
import { defineConfig } from "./generate";

export default defineConfig({
  // Specifies the path to the input README.md file. The default value is "README.md".
  input: "./public/README.md",

  // Specifies the path to the output index.html file.
  output: "./dist/index.html",

  // Directory for public assets.
  public: "./public",

  // Directory for distribution files.
  dist: "./dist",

  // Configuration for the <head> section of the HTML, such as adding stylesheets.
  head: {
    link: [{ rel: "stylesheet", href: "https://use.typekit.net/rzl1qcy.css" }]
  }
});
```

To generate the index.html file, use the following command:

```sh
pnpm build
```
