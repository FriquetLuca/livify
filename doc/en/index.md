<style>
html, body {
    height: 100%;
    overflow: hidden;
}
.content {
    display: block;
    overflow: auto;
    height: 100vh;
    height:100svh;
}

.layout-heading-top {
    display: block;
}
.layout-heading {
    display: none;
}
.layout {
    margin: 0em;
}

@media (min-width: 1200px) {
    .layout-heading-top {
        display: none;
    }
    .layout-heading {
        display: block;
    }
    .layout {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        padding: 1em;
        max-height: 100vh;
        margin: -1em;
    }
    .toc {
        width: 20%;
        min-width: 250px;
        padding: .25em;
        padding-bottom: 1em;
        margin-top: -1em;
        margin-bottom: -1em;
        overflow: auto;
        border-right: 1px solid #555;
    }
    .layout-content {
        -webkit-box-flex: 1;
            -ms-flex: 1;
                flex: 1;
        padding-left: 1em;
        padding-right: 1em;
        padding-bottom: 2em;
        margin-right: -1em;
        margin-top: -1em;
        margin-bottom: -1em;
        overflow: auto;
    }
}
</style>

<div class="layout-heading-top">

# MkImp Markdown
</div>

<div class="layout">
<div class="toc">

## Table of content

!tableofcontent
</div>
<div class="layout-content">
<div class="layout-heading">

# MkImp Markdown
</div>

!include "structure.md"
!include "syntax.md"
</div>
</div>
