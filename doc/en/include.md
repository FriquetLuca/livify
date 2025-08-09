##! Include

You can include markdown using the `include` syntax. It will import your markdown content, tokenize it and create a scope for the metadata it contain so you won't override your variables outside the included document.

The syntax is as follow: `!include "path/to/include.md", l from:to s shiftHeading`.

### Example

```md
!include 'foo.md'
---
!include "foo.md"
---
!include (foo.md)
---
!include "foo.md", l 3
---
!include "foo.md", l 3:4
---
!include "foo.md", l :3
---
!include "foo.md", l :3 s 2
---
!include "foo.md", s 3
```

!include 'foo.md'
---
!include "foo.md"
---
!include (foo.md)
---
!include "foo.md", l 3
---
!include "foo.md", l 3:4
---
!include "foo.md", l :3
---
!include "foo.md", l :3 s 2
---
!include "foo.md", s 3

---

###! Nested includes

You can nest includes but the included content will only render itself once (except when the included file is the root file itself).

#### Example

A file `bar.md` containing the following content:

```md
# Bar

!include "foo.md"
!include "bar.md" <!-- This won't be included (except if bar.md is the root document) -->
```

!include "bar.md"
