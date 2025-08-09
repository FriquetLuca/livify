##! Heading

To create a heading, add number signs (#) in front of a word or phrase. The number of number signs you use should correspond to the heading level. Markdown applications don't agree on how to handle a missing space between the number signs (#) and the heading name. For compatibility, always put a space between the number signs and the heading name and also put blank lines before and after a heading.

### Example

```md
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6
```
# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6

---

###! Automatic section numbering

You can enable automatic section numbering by putting a `!` right after the last `#` of a heading. This will create an entry in the `Table Of Content` with a specific index attributed to the heading.

#### Example

```md
#! First heading
##! Second Heading
##! Third Heading
#! Fourth Heading
```

<h1 id="heading" class="md-heading" aria-level="1">1. First heading</h1>
<h2 id="heading" class="md-heading" aria-level="2">1.1. Second Heading</h2>
<h2 id="heading" class="md-heading" aria-level="2">1.2. Third Heading</h2>
<h1 id="heading" class="md-heading" aria-level="1">2. Fourth Heading</h1>

---

###! Setext-style heading

There is also another way to create a heading that we called `setext-style heading`. You have access to the heading level 1 and 2 using this style and it will underline the heading. This style allow to write down multiple lines, but they will be collapsed into a single one when parsed.
You should note that the `setext-style heading` doesn't handle automatic section numbering.

#### Example

```md
Heading level 1
===============

Heading level 2
---------------
```

Heading level 1
===============

Heading level 2
---------------

---

###! Heading ID

An ID is generated for any heading created, it will correspond to the text of your heading transformed into lowercase letters and all your symbol, punctuation and whitespace characters replaced by `-`. If a heading with a specific name already exist, you'll see a `-n` concatenated to it where `n` is the number of times the specific heading has been found.

While this is a great way to have heading IDs, you may want to create your own for any reason. To achieve this, you can use the `{#...}` syntax at the end of your heading.

#### Example

```md
# My heading {#my-heading-id}
```

# My heading {#my-heading-id}

> Note: This doesn't work with `setext-style heading`.

---
