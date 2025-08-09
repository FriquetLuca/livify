##! HTML

Many Markdown applications allow you to use HTML tags in Markdown-formatted text. This is helpful if you prefer certain HTML tags to Markdown syntax. For example, some people find it easier to use HTML tags for images. Using HTML is also helpful when you need to change the attributes of an element, like specifying the color of text or changing the width of an image.

To use HTML, place the tags in the text of your Markdown-formatted file.

### Example

```md
This **word** is bold. This <em>__word__</em> is italic.
```
This **word** is bold. This <em>__word__</em> is italic.

---

Use blank lines to separate block-level HTML elements like \<div\>, \<table\>, \<pre\>, and \<p\> from the surrounding content (this will never work with `pre`, `script`, `style`, `svg` and `textarea`). Try not to indent the tags with tabs or spaces — that can interfere with the formatting.

### Example

```md
<div>

Some **markdown** over *here*.
</div>
```
<div>

Some **markdown** over *here*.
</div>

---

You can’t use Markdown syntax inside block-level HTML tags.

### Example

```md
<p>italic and **bold**</p>
<p>
italic and **bold**
</p>
```
<p>italic and **bold**</p>
<p>
italic and **bold**
</p>
