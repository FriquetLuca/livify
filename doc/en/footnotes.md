##! Footnotes

Footnotes allow you to add notes and references without cluttering the body of the document. When you create a footnote, a superscript number with a link appears where you added the footnote reference. Readers can click the link to jump to the content of the footnote at the bottom of the page.

To create a footnote reference, add a caret and an identifier inside brackets (\[\^1]). Identifiers can be numbers or words, but they can’t contain spaces or tabs. Identifiers only correlate the footnote reference with the footnote itself — in the output, footnotes are numbered sequentially.

Add the footnote using another caret and number inside brackets with a colon and text (\[\^1\]\: My footnote.). You don’t have to put footnotes at the end of the document. You can put them anywhere except inside other elements like lists, block quotes, and tables.

### Example

```md
Here's a simple footnote,[^foot] and here's a longer one.[^bignote]

[^foot]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.
```

Here's a simple footnote,<sup><a class="md-link" href="#fn:foot">\[1\]</a></sup> and here's a longer one.<sup><a class="md-link" href="#fn:bignote">\[2\]</a></sup>

<section class="md-footnotes">
    <ol class="md-fnlist" dit="auto">
        <li id="fn:foot" class="md-fnitem">
            <p class="md-paragraph">
                This is the first footnote. <a class="md-revfn" href="#fnref:foot">↩</a>
            </p>
        </li>
        <li id="fn:bignote" class="md-fnitem">
            <p class="md-paragraph">Here's one with multiple paragraphs and code.</p>
            <p class="md-paragraph">Indent paragraphs to include them in the footnote.</p>
            <p class="md-paragraph">
                <code class="md-codespan">{ my code }</code>
            </p>
            <p class="md-paragraph">Add as many paragraphs as you like. <a class="md-revfn" href="#fnref:bignote">↩</a></p>
        </li>
    </ol>
</section>
