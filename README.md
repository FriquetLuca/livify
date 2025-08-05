# Livify

Livify is a simple command-line tool to serve or build Markdown-based content into full HTML pages, with support for custom templates, hot reload, emojis, KaTeX, and Mermaid.

---

## Installation

```bash
npm install -g livify
```

## Usage

Livify provides two main commands: `serve` and `build`.

### `livify serve`

Start a local development server to render Markdown content as HTML in real-time.

```
livify serve <path>
```

This will serve the specified directory, rendering Markdown files on the fly.

#### Options

##### `-h, --host <hostname>`

Set the hostname where the directory will be served.
Defaults to the first available host.

##### `-p, --port <port>`

Set the port number.
Defaults to 3000.

##### `-r, --hot`

Enable hot reload when file changes are detected.

##### `-e, --emojis <emojiPath>`

Path to a JSON file containing custom emojis to inject into the content.

##### `-t, --template <templatePath>`

Specify a custom HTML template for rendering Markdown pages.
If no template is provided, Livify uses the default:

```html
<!doctype html>
<html lang="{{_lang}}">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/_internal/livify.css" />
    <link rel="stylesheet" href="/_internal/css/katex.min.css" />
    <link rel="stylesheet" href="/_internal/css/vs2015.min.css" />
    <script type="module" src="/_internal/livify.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <title>{{_title}}</title>
  </head>
  <body>
    <div class="content">
      %PAGE_CONTENT%
    </div>
  </body>
</html>
```

Note: This template uses [TailwindCSS](https://tailwindcss.com/) from a CDN. For production use, it is recommended to supply your own local template.

##### `--sanitize`

Sanitize the HTML output generated from Markdown to prevent unsafe content.

#### Example

```bash
livify serve ./examples -r -t ./templates/default_template.html
```

This command serves the `./examples` directory with hot reload enabled and a custom HTML template for rendering.

### `livify build`

Convert a Markdown file or an entire directory into static HTML output.

```bash
livify build <input>
```

- `<input>` can be a single Markdown file or a directory.
- Outputs HTML to the location specified by `--output`.

#### Options

##### `-o, --output <output>`

Specify where the generated HTML file(s) should be written.

##### `-r, --root <dir>`

Set the root directory for relative resources (images, links, etc).
Defaults to the current working directory.

##### `-e, --emojis <emojiPath>`

Use a custom emoji JSON definition file.

##### `-t, --template <templatePath>`

Provide a custom HTML template for the output pages.

##### `--full`

If the input is a directory, copy all non-transpiled content (e.g. images, CSS, etc.) into the output folder as-is.

##### `--override`

Allow overwriting existing files in the output path.

##### `--sanitize`

Sanitize the generated HTML to remove potentially unsafe content.

##### `--disableIndexing`

Disable the creation of default `index.html` files in folders that don’t contain an `index.md`.

#### Examples

```bash
# Build a single Markdown file
livify build ./test/index.md -o ./test/index.html

# Build all Markdown files in a directory
livify build ./examples -o ./dist

# Specify the root directory separately
livify build ./examples -o ./dist -r ./examples
```

## Features

- ✅ Live preview server for Markdown
- ✅ Custom HTML templates
- ✅ Emoji support
- ✅ KaTeX (LaTeX math) rendering
- ✅ Mermaid diagram support
- ✅ Hot reload support
- ✅ Markdown-to-static HTML transpilation

## Integrations

Livify supports the following out of the box:

- [Markdown (via MkImp)](https://github.com/FriquetLuca/mkimp)
- [KaTeX](https://katex.org/)
- [Mermaid](https://mermaid.js.org/)

## 📦 License

[MIT](./LICENSE)
