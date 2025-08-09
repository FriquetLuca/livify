##! Bloc de code

Pour créer des blocs de code, indentez chaque ligne du bloc d’au moins quatre espaces ou une tabulation.

### Exemple

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

###! Bloc de code délimité (Fenced code block)

La syntaxe permet de créer des blocs de code en indentant les lignes de quatre espaces ou une tabulation. Si cela vous paraît peu pratique, essayez d’utiliser les blocs de code délimités.

#### Exemple

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

Il existe également un support pour la coloration syntaxique des blocs de code délimités. Cette fonctionnalité permet d’ajouter une coloration selon le langage dans lequel votre code a été écrit. Pour activer la coloration, spécifiez un langage à côté des backticks avant le bloc de code délimité.

#### Exemple

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

Lorsqu’on écrit un bloc de code délimité à l’intérieur d’un autre (par exemple pour afficher du markdown lui-même), il est préférable d’utiliser un nombre de backticks supérieur d’un à celui que l’on veut afficher.

#### Exemple

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

###! Inclure du code

Il est possible d’inclure du code directement depuis un fichier spécifique. Cela affichera toutes les lignes importées dans le bloc de code, ce qui facilite la lecture de ce qui a été inclus.  
La syntaxe est la suivante : `!INCLUDECODE "chemin/vers/fichier.ext" (langage), from:to`.

#### Exemple

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
