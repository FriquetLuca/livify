##! Frontmatter

You can include metadatas at the top of your document to use them later. This is useful when importing other document as templates.
The Frontmatter block begin with 3 `-` (more more) and end with the same count of dashes.
he content in between should be written in [YAML](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html).

### Example

```md
---     
title: Hello, world!
author: John Doe
---
```

###! Metadata

If you need to use the metadatas from `Frontmatter`, enclose it in 2 curly brackets (ex: `{{NAME}}`).

#### Example

```md
---     
title: Hello, world!
author: John Doe
---     

# {{title}}

This is the main content of your Markdown file autored by **{{author}}**.

```

# Hello, world!

This is the main content of your Markdown file autored by **John Doe**.

---

It is possible to override the inserted datas that isn't metadata, like the title of the document (written as `{{_title}}`) or the language of the page (written as `{{_lang}}`) in the default template.

#### Example

```md
---
_title: First Page
title: Hello, world!
author: John Doe
---     

# {{title}}

This is the main content of your Markdown file autored by **{{_meta.author}}**.

```
