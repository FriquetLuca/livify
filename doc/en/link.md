##! Link

To create a link, enclose the link text in brackets (e.g., [Duck Duck Go]) and then follow it immediately with the URL in parentheses (e.g., `(https://duckduckgo.com)`).

### Example

```md
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).
```
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

---

To quickly turn a URL or email address into a link, enclose it in angle brackets.

### Example

```
<https://www.markdownguide.org>
<fake@example.com>
```

<https://www.markdownguide.org>
<fake@example.com>

---

To emphasize links, add asterisks before and after the brackets and parentheses. To denote links as code, add backticks in the brackets.

### Example

```md
I love supporting the **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.
See the section on [`code`](#code).
```

I love supporting the **[EFF](https://eff.org)**.
This is the *[Markdown Guide](https://www.markdownguide.org)*.
See the section on [`code`](#code).

###! IDs

You can link to headings with custom IDs in the file by creating a standard link with a number sign (#) followed by the custom heading ID. These are commonly referred to as anchor links.

#### Example

```md
[Heading IDs](#heading-ids)
```

---

When creating an anchor link, you can create a custom anchor for it using standard HTML anchor tags (`<a name="unique-anchor-name"></a>`) to create navigation anchor points for any location in the document. To avoid ambiguous references, use a unique naming scheme for anchor tags, such as adding a prefix to the `name` attribute value.

#### Example:

```md
# Section Heading

Some body text of this section.

<a name="my-custom-anchor"></a>
Some text.

[A custom anchor link](#my-custom-anchor)
```

# Section Heading

Some body text of this section.

<a name="my-custom-anchor"></a>
Some text.

[A custom anchor link](#my-custom-anchor)

###! Titles

You can optionally add a title for a link. This will appear as a tooltip when the user hovers over the link. To add a title, enclose it in quotation marks after the URL.

#### Example

```md
My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").
```

My favorite search engine is [Duck Duck Go](https://duckduckgo.com "The best search engine for privacy").

###! Reference-style Links

Reference-style links are a special kind of link that make URLs easier to display and read in Markdown. Reference-style links are constructed in two parts: the part you keep inline with your text and the part you store somewhere else in the file to keep the text easy to read.

The first part of a reference-style link is formatted with two sets of brackets. The first set of brackets surrounds the text that should appear linked. The second set of brackets displays a label used to point to the link you’re storing elsewhere in your document.

Although not required, you can include a space between the first and second set of brackets. The label in the second set of brackets is not case sensitive and can include letters, numbers, spaces, or punctuation.

This means the following example formats are roughly equivalent for the first part of the link:

- `[hobbit-hole][1]`
- `[hobbit-hole] [1]`

The second part of a reference-style link is formatted with the following attributes:

1. The label, in brackets, followed immediately by a colon and at least one space (e.g., \[label\]: ).
1. The URL for the link, which you can optionally enclose in angle brackets.
1. The optional title for the link, which you can enclose in double quotes, single quotes, or parentheses.

This means the following example formats are all roughly equivalent for the second part of the link:

- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Hobbit lifestyles"`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle 'Hobbit lifestyles'`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle (Hobbit lifestyles)`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> 'Hobbit lifestyles'`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> (Hobbit lifestyles)`

You can place this second part of the link anywhere in your Markdown document. Some people place them immediately after the paragraph in which they appear while other people place them at the end of the document (like endnotes or footnotes).

Say you add a URL as a standard URL link to a paragraph and it looks like this in Markdown:

```
In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends
of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to
eat: it was a [hobbit-hole](https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Hobbit lifestyles"), and that means comfort.
```

Though it may point to interesting additional information, the URL as displayed really doesn’t add much to the existing raw text other than making it harder to read. To fix that, you could format the URL like this instead:

```
In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends
of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to
eat: it was a [hobbit-hole][1], and that means comfort.

[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"
```

In both instances above, the rendered output would be identical:

In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends
of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to
eat: it was a [hobbit-hole][1], and that means comfort.

[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Hobbit lifestyles"

###! Best Practices

For compatibility, try to URL encode any spaces with %20. Alternatively, you could use the a HTML tag.

Do this:

```
[link](https://www.example.com/my%20great%20page)

<a href="https://www.example.com/my great page">link</a>
```

Don't do this:

```
[link](https://www.example.com/my great page)
```

Parentheses in the middle of a URL can also be problematic. For compatibility, try to URL encode the opening parenthesis (`(` with %28 and the closing parenthesis `)` with %29. Alternatively, you could use the a HTML tag.

Do this:

```
[a novel](https://en.wikipedia.org/wiki/The_Milagro_Beanfield_War_%28novel%29)

<a href="https://en.wikipedia.org/wiki/The_Milagro_Beanfield_War_(novel)">a novel</a>
```

Don't do this:

```
[a novel](https://en.wikipedia.org/wiki/The_Milagro_Beanfield_War_(novel))
```
