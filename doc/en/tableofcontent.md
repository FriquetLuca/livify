##! Table Of Content

You can create a `table of content` for every heading using the automatic section numbering. This will help a lot when a navigation in a long document is needed.

### Example

```md
!tableofcontent

#! Hello

##! World
```

<ul role="list" class="md-tableofcontent">
    <li role="listitem" class="md-listitem">
        <a class="md-link" href="#1-hello">1. Hello</a>
        <ul role="list" class="md-tableofcontent">
            <li role="listitem" class="md-listitem">
                <a class="md-link" href="#2-world">1.1. World</a>
            </li>
        </ul>
    </li>
</ul>

# 1. Hello

## 2. World