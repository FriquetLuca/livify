##! Inclusion

Vous pouvez inclure du Markdown en utilisant la syntaxe `include`. Cela importe le contenu Markdown, le tokenize et crée une portée pour les métadonnées qu’il contient afin que vous ne remplaciez pas vos variables en dehors du document inclus.

La syntaxe est la suivante : `!include "chemin/vers/include.md", l from:to s shiftHeading`.

### Exemple

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

###! Inclusions imbriquées

Vous pouvez imbriquer des inclusions, mais le contenu inclus ne s’affichera qu’une seule fois (sauf si le fichier inclus est le fichier racine lui-même).

#### Exemple

Un fichier `bar.md` contenant le contenu suivant :

```md
# Bar

!include "foo.md"
!include "bar.md" <!-- Ceci ne sera pas inclus (sauf si bar.md est le document racine) -->
```

!include "bar.md"
