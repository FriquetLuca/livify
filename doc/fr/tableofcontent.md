##! Table des matières

Vous pouvez créer une `table des matières` pour chaque titre en utilisant la numérotation automatique des sections. Cela est très utile pour naviguer dans un long document.

### Exemple

```md
!tableofcontent

#! Bonjour

##! Monde
```

<ul role="list" class="md-tableofcontent">
    <li role="listitem" class="md-listitem">
        <a class="md-link" href="#1-bonjour">1. Bonjour</a>
        <ul role="list" class="md-tableofcontent">
            <li role="listitem" class="md-listitem">
                <a class="md-link" href="#2-monde">1.1. Monde</a>
            </li>
        </ul>
    </li>
</ul>

# 1. Bonjour

## 2. Monde
