##! Liste

Vous pouvez organiser des éléments en listes ordonnées ou non ordonnées.

###! Liste ordonnée

Pour créer une liste ordonnée, ajoutez des éléments de liste avec des nombres suivis d’un point et d’un espace. Les numéros n’ont pas besoin d’être dans l’ordre numérique, mais la liste doit commencer par le numéro un. Indentez un ou plusieurs éléments pour créer une liste imbriquée.

#### Exemple

```md
1. Premier élément
2. Deuxième élément
3. Troisième élément
1. Quatrième élément
```

1. Premier élément  
2. Deuxième élément  
3. Troisième élément  
1. Quatrième élément  

---

Si la liste ne commence pas avec le numéro un, l’ordre commencera au numéro spécifié.

#### Exemple

```md
5. Premier élément
2. Deuxième élément
3. Troisième élément
1. Quatrième élément
```

5. Premier élément  
2. Deuxième élément  
3. Troisième élément  
1. Quatrième élément  

---

Indentez un ou plusieurs éléments pour créer une liste imbriquée.

#### Exemple

```md
1. Premier élément
2. Deuxième élément
3. Troisième élément
    1. Élément indenté
    2. Élément indenté
4. Quatrième élément
```

1. Premier élément  
2. Deuxième élément  
3. Troisième élément  
    1. Élément indenté  
    2. Élément indenté  
4. Quatrième élément  

###! Liste non ordonnée

Pour créer une liste non ordonnée, ajoutez des tirets (-), astérisques (*) ou des plus (+) devant les éléments.

#### Exemple

```md
- Premier élément
- Deuxième élément
- Troisième élément
- Quatrième élément

* Premier élément
* Deuxième élément
* Troisième élément
* Quatrième élément

+ Premier élément
+ Deuxième élément
+ Troisième élément
+ Quatrième élément
```

- Premier élément  
- Deuxième élément  
- Troisième élément  
- Quatrième élément  

* Premier élément  
* Deuxième élément  
* Troisième élément  
* Quatrième élément  

+ Premier élément  
+ Deuxième élément  
+ Troisième élément  
+ Quatrième élément  

---

Indentez un ou plusieurs éléments pour créer une liste imbriquée.

#### Exemple

```md
- Premier élément
- Deuxième élément
- Troisième élément
    - Élément indenté
    - Élément indenté
- Quatrième élément
```

---

Si vous devez commencer un élément de liste non ordonnée par un nombre suivi d’un point, vous pouvez échapper le point avec une barre oblique inversée `\`.

#### Exemple

```md
- 1968\. Une année géniale !
- Je pense que 1969 était la deuxième meilleure.
```

- 1968\. Une année géniale !  
- Je pense que 1969 était la deuxième meilleure.

Pour la compatibilité, ne mélangez pas les délimiteurs dans la même liste — choisissez-en un et tenez-vous-y.

Faites ceci :

```md
- Premier élément
- Deuxième élément
- Troisième élément
- Quatrième élément
```

- Premier élément  
- Deuxième élément  
- Troisième élément  
- Quatrième élément  

Ne faites pas ceci :

```md
+ Premier élément
* Deuxième élément
- Troisième élément
+ Quatrième élément
```

+ Premier élément  
* Deuxième élément  
- Troisième élément  
+ Quatrième élément  

###! Liste imbriquée

Vous pouvez imbriquer une liste non ordonnée dans une liste ordonnée (et inversement) de la même manière que vous imbriquez des listes.

#### Exemple

```md
- Premier élément
-   1. Deuxième élément
    2. Élément indenté
    3. Élément indenté
- Troisième élément
    1. Élément indenté
    2. Élément indenté
- Quatrième élément

1. Premier élément
2. Deuxième élément
3. Troisième élément
    - Élément indenté
    - Élément indenté
4. Quatrième élément
```

- Premier élément  
-   1. Deuxième élément  
    2. Élément indenté  
    3. Élément indenté  
- Troisième élément  
    1. Élément indenté  
    2. Élément indenté  
- Quatrième élément  

1. Premier élément  
2. Deuxième élément  
3. Troisième élément  
    - Élément indenté  
    - Élément indenté  
4. Quatrième élément  

###! Ajouter des éléments dans les listes

Pour ajouter un autre élément dans une liste tout en préservant la continuité, indentez l’élément de quatre espaces ou une tabulation.

#### Exemples

```md
* Ceci est le premier élément.
* Voici le deuxième élément.

    Je dois ajouter un autre paragraphe sous le deuxième élément.

* Et voici le troisième élément.
```

* Ceci est le premier élément.  
* Voici le deuxième élément.

    Je dois ajouter un autre paragraphe sous le deuxième élément.

* Et voici le troisième élément.

---

```md
* Ceci est le premier élément.
* Voici le deuxième élément.

    > Un bloc de citation serait parfait sous le deuxième élément.

* Et voici le troisième élément.
```

* Ceci est le premier élément.  
* Voici le deuxième élément.

    > Un bloc de citation serait parfait sous le deuxième élément.

* Et voici le troisième élément.

---

```md
1. Ouvrez le fichier.
2. Trouvez le bloc de code suivant à la ligne 21 :

        <html>
          <head>
            <title>Test</title>
          </head>

3. Mettez à jour le titre pour correspondre au nom de votre site web.
```

1. Ouvrez le fichier.  
2. Trouvez le bloc de code suivant à la ligne 21 :

        <html>
          <head>
            <title>Test</title>
          </head>

3. Mettez à jour le titre pour correspondre au nom de votre site web.

---

```md
1. Ouvrez le fichier contenant la mascotte Linux.
2. Admirez sa beauté.

    ![Tux, la mascotte Linux](https://mdg.imgix.net/assets/images/tux.png)

3. Fermez le fichier.
```

1. Ouvrez le fichier contenant la mascotte Linux.  
2. Admirez sa beauté.

    ![Tux, la mascotte Linux](https://mdg.imgix.net/assets/images/tux.png)

3. Fermez le fichier.

###! Liste de tâches

Les listes de tâches (également appelées checklists ou todo lists) vous permettent de créer une liste d’éléments avec des cases à cocher. Dans les applications Markdown qui supportent les listes de tâches, les cases seront affichées à côté du contenu. Pour créer une liste de tâches, ajoutez des tirets (-) et des crochets avec un espace ([ ]) devant les éléments. Pour cocher une case, mettez un x entre les crochets ([x]).

### Exemple

```
- [x] Rédiger le communiqué de presse
- [ ] Mettre à jour le site web
- [ ] Contacter les médias
```

- [x] Rédiger le communiqué de presse  
- [ ] Mettre à jour le site web  
- [ ] Contacter les médias  
