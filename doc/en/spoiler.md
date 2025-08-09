##! Spoiler

In Reddit and Discord, for example, you can use spoiler tags to hide content from the user to make sure it doesn't see it if the user doesn't want to see.
You can write spoiler using either: `>!...!<` or `||...||`.

### Example

```md
This >!word!< is hidden.
This ||word|| is hidden.
```
This >!word!< is hidden.
This ||word|| is hidden.

---

> Note: the discord spoiler can't be used in tables.

The syntax could be extended with a spoiler block inspired from reddit. Be start the block with `!>` and end it with a `<!`. It will be displayed as an accordion with a title.

### Example

```md
!> This is a spoiler
The content is in spoiler.
> SPOILING THE FUN OUT OF EVERYTHING!
<!
```

!> This is a spoiler
The content is in spoiler.
> SPOILING THE FUN OUT OF EVERYTHING!
<!

---

Be sure to let some space before and after the spoiler block so that it can be shown.

Do this:
```
This is a sentense.

!> This is a spoiler
The content is in spoiler.
> SPOILING THE FUN OUT OF EVERYTHING!
<!

This is another sentense.
```

This is a sentense.

!> This is a spoiler
The content is in spoiler.
> SPOILING THE FUN OUT OF EVERYTHING!
<!

This is another sentense.

Don't do this:
```
This is a sentense.
!> This is a spoiler
The content is in spoiler.
> SPOILING THE FUN OUT OF EVERYTHING!
<! This is another sentense.
```

This is a sentense.
!> This is a spoiler
The content is in spoiler.
> SPOILING THE FUN OUT OF EVERYTHING!
<! This is another sentense.
