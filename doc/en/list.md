##! List

You can organize items into ordered and unordered lists.

###! Ordered List

To create an ordered list, add line items with numbers followed by periods and a whitespace. The numbers don’t have to be in numerical order, but the list should start with the number one. Indent one or more items to create a nested list.

#### Example

```md
1. First item
2. Second item
3. Third item
1. Fourth item
```

1. First item
2. Second item
3. Third item
1. Fourth item

---

If the list doesn't start using the number one, the ordering will begin at the specified number.

#### Example

```md
5. First item
2. Second item
3. Third item
1. Fourth item
```

5. First item
2. Second item
3. Third item
1. Fourth item

---

Indent one or more items to create a nested list.

#### Example

```md
1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item 
```

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item

###! Unordered List

To create an unordered list, add dashes (-), asterisks (*), or plus signs (+) in front of line items.

#### Example

```md
- First item
- Second item
- Third item
- Fourth item

* First item
* Second item
* Third item
* Fourth item

+ First item
+ Second item
+ Third item
+ Fourth item
```

- First item
- Second item
- Third item
- Fourth item

* First item
* Second item
* Third item
* Fourth item

+ First item
+ Second item
+ Third item
+ Fourth item

---

Indent one or more items to create a nested list.

#### Example

```md
- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item 
```

---

If you need to start an unordered list item with a number followed by a period, you can use a backslash `\` to escape the period.

#### Example

```md
- 1968\. A great year!
- I think 1969 was second best. 
```

- 1968\. A great year!
- I think 1969 was second best.

For compatibility, don’t mix and match delimiters in the same list — pick one and stick with it.


Do this:

```md
- First item
- Second item
- Third item
- Fourth item
```
- First item
- Second item
- Third item
- Fourth item

Don't do this:

```md
+ First item
* Second item
- Third item
+ Fourth item
```
+ First item
* Second item
- Third item
+ Fourth item

###! Nested List

You can nest unordered list into ordered list (and the other way around) the same way you nest lists.

#### Example

```md
- First item
-   1. Second item
    2. Indented item
    3. Indented item
- Third item
    1. Indented item
    2. Indented item
- Fourth item

1. First item
2. Second item
3. Third item
    - Indented item
    - Indented item
4. Fourth item
```

- First item
-   1. Second item
    2. Indented item
    3. Indented item
- Third item
    1. Indented item
    2. Indented item
- Fourth item

1. First item
2. Second item
3. Third item
    - Indented item
    - Indented item
4. Fourth item

###! Adding Elements in Lists

o add another element in a list while preserving the continuity of the list, indent the element four spaces or one tab.

#### Examples

```md
* This is the first list item.
* Here's the second list item.

    I need to add another paragraph below the second list item.

* And here's the third list item.
```

* This is the first list item.
* Here's the second list item.

    I need to add another paragraph below the second list item.

* And here's the third list item.

---

```md
* This is the first list item.
* Here's the second list item.

    > A blockquote would look great below the second list item.

* And here's the third list item.
```

* This is the first list item.
* Here's the second list item.

    > A blockquote would look great below the second list item.

* And here's the third list item.

---

```md
1. Open the file.
2. Find the following code block on line 21:

        <html>
          <head>
            <title>Test</title>
          </head>

3. Update the title to match the name of your website.
```

1. Open the file.
2. Find the following code block on line 21:

        <html>
            <head>
                <title>Test</title>
            </head>

3. Update the title to match the name of your website.

---

```md
1. Open the file containing the Linux mascot.
2. Marvel at its beauty.

    ![Tux, the Linux mascot](https://mdg.imgix.net/assets/images/tux.png)

3. Close the file.
```

1. Open the file containing the Linux mascot.
2. Marvel at its beauty.

    ![Tux, the Linux mascot](https://mdg.imgix.net/assets/images/tux.png)

3. Close the file.

###! Task List

Task lists (also referred to as checklists and todo lists) allow you to create a list of items with checkboxes. In Markdown applications that support task lists, checkboxes will be displayed next to the content. To create a task list, add dashes (-) and brackets with a space ([ ]) in front of task list items. To select a checkbox, add an x in between the brackets ([x]).

### Example

```
- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
```

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media
