##! Table

To add a table, use three or more hyphens (---) to create each column’s header, and use pipes (|) to separate each column. For compatibility, you should also add a pipe on either end of the row.

### Example

```md
| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |
```

| Syntax      | Description |
| ----------- | ----------- |
| Header      | Title       |
| Paragraph   | Text        |

---

Cell widths can vary, as shown below. The rendered output will look the same.

```md
| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |
```

| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |

---

Tip: Creating tables with hyphens and pipes can be tedious. To speed up the process, try using the [Markdown Tables Generator](https://www.tablesgenerator.com/markdown_tables) or [AnyWayData Markdown Export](https://anywaydata.com/). Build a table using the graphical interface, and then copy the generated Markdown-formatted text into your file.

You can format the text within tables. For example, you can add links, code (words or phrases in backticks (`) only, not code blocks), and emphasis.

You can’t use headings, blockquotes, lists, horizontal rules, images, or most HTML tags.

Tip: You can use HTML to create line breaks and add lists within table cells.

You can display a pipe (|) character in a table by using its HTML character code (&#124;).

###! Alignment

You can align text in the columns to the left, right, or center by adding a colon (:) to the left, right, or on both side of the hyphens within the header row.

#### Example

```md
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
