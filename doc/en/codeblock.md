##! Code block

To create code blocks, indent every line of the block by at least four spaces or one tab.

### Example

```md
    <html>
      <head>
      </head>
    </html>
```

    <html>
      <head>
      </head>
    </html>

###! Fenced code block

The syntax allows you to create code blocks by indenting lines by four spaces or one tab. If you find that inconvenient, try using fenced code blocks.

#### Example

````md
```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````

```
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

---

There is also support for syntax highlighting for fenced code blocks. This feature allows you to add color highlighting for whatever language your code was written in. To add syntax highlighting, specify a language next to the backticks before the fenced code block.

#### Example

````md
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```

---

When writing down a fenced code block inside another one (to display markdown itselffor example), it would be best to use one more backtick than the one you want to display.

#### Example

`````md
````md
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````
`````

````md
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "age": 25
}
```
````

###! Include code

It is possible to include code directly from a specific file. This will display all the imported lines in the code block, making it easier to read what has been included.
The syntax is as follow: `!INCLUDECODE "path/to/file.ext" (language), from:to`.

#### Example

```md
!INCLUDECODE './includecode.js'
---
!INCLUDECODE "./includecode.js"
---
!INCLUDECODE (./includecode.js)
---
!INCLUDECODE "./includecode.js" (js)
---
!INCLUDECODE "./includecode.js" (js), 1:7
---
!INCLUDECODE "./includecode.js" (js), 8
---
!INCLUDECODE "./includecode.js" (js), :7
---
!INCLUDECODE "./includecode.js", 8:10
---
!INCLUDECODE "./includecode.js", 8
---
!INCLUDECODE "./includecode.js", :10
```

!INCLUDECODE './includecode.js'
---
!INCLUDECODE "./includecode.js"
---
!INCLUDECODE (./includecode.js)
---
!INCLUDECODE "./includecode.js" (js)
---
!INCLUDECODE "./includecode.js" (js), 1:7
---
!INCLUDECODE "./includecode.js" (js), 8
---
!INCLUDECODE "./includecode.js" (js), :7
---
!INCLUDECODE "./includecode.js", 8:10
---
!INCLUDECODE "./includecode.js", 8
---
!INCLUDECODE "./includecode.js", :10
