##! Lien

Pour créer un lien, encadrez le texte du lien entre crochets (ex : [Duck Duck Go]) puis suivez-le immédiatement de l’URL entre parenthèses (ex : `(https://duckduckgo.com)`).

### Exemple

```md
Mon moteur de recherche préféré est [Duck Duck Go](https://duckduckgo.com).
```

Mon moteur de recherche préféré est [Duck Duck Go](https://duckduckgo.com).

---

Pour transformer rapidement une URL ou une adresse email en lien, encadrez-la entre chevrons.

### Exemple

```
<https://www.markdownguide.org>
<fake@example.com>
```

<https://www.markdownguide.org>  
<fake@example.com>

---

Pour mettre en emphase des liens, ajoutez des astérisques avant et après les crochets et les parenthèses. Pour marquer les liens comme du code, ajoutez des backticks dans les crochets.

### Exemple

```md
J’aime soutenir **[EFF](https://eff.org)**.  
Ceci est le lien *[Markdown Guide](https://www.markdownguide.org)*.  
Voir la section sur [`code`](#code).
```

J’aime soutenir **[EFF](https://eff.org)**.  
Ceci est le lien *[Markdown Guide](https://www.markdownguide.org)*.  
Voir la section sur [`code`](#code).

###! IDs

Vous pouvez créer des liens vers des titres avec des IDs personnalisés dans le fichier en créant un lien standard avec un dièse (#) suivi de l’ID personnalisé du titre. On appelle cela des liens ancres.

#### Exemple

```md
[IDs de titres](#heading-ids)
```

---

Pour créer un lien ancre, vous pouvez créer une ancre personnalisée avec une balise HTML standard (`<a name="nom-ancre-unique"></a>`) pour créer des points de navigation n’importe où dans le document. Pour éviter des références ambiguës, utilisez un nom unique pour l’attribut `name`, par exemple en ajoutant un préfixe.

#### Exemple

```md
# Titre de section

Du texte dans cette section.

<a name="mon-ancre-personnalisee"></a>
Du texte.

[Un lien ancre personnalisé](#mon-ancre-personnalisee)
```

# Titre de section

Du texte dans cette section.

<a name="mon-ancre-personnalisee"></a>
Du texte.

[Un lien ancre personnalisé](#mon-ancre-personnalisee)

###! Titres

Vous pouvez optionnellement ajouter un titre pour un lien. Ce titre apparaîtra en infobulle au survol du lien par l’utilisateur. Pour ajouter un titre, encadrez-le entre guillemets après l’URL.

#### Exemple

```md
Mon moteur de recherche préféré est [Duck Duck Go](https://duckduckgo.com "Le meilleur moteur de recherche pour la confidentialité").
```

Mon moteur de recherche préféré est [Duck Duck Go](https://duckduckgo.com "Le meilleur moteur de recherche pour la confidentialité").

###! Liens en style référence

Les liens en style référence sont un type spécial de lien qui facilitent l’affichage et la lecture des URLs en Markdown. Ces liens sont construits en deux parties : la partie inline dans le texte, et la partie stockée ailleurs dans le fichier pour garder le texte lisible.

La première partie d’un lien en style référence est formatée avec deux paires de crochets. La première paire entoure le texte qui doit apparaître comme lien. La deuxième paire contient un label qui pointe vers la définition du lien stockée ailleurs.

Bien que non obligatoire, vous pouvez ajouter un espace entre les deux paires de crochets. Le label de la deuxième paire n’est pas sensible à la casse et peut contenir lettres, chiffres, espaces ou ponctuation.

Ainsi, les exemples suivants sont équivalents pour la première partie du lien :

- `[hobbit-hole][1]`
- `[hobbit-hole] [1]`

La deuxième partie d’un lien en style référence est formatée ainsi :

1. Le label entre crochets, suivi immédiatement de deux-points et d’au moins un espace (ex : \[label\]: )
2. L’URL du lien, que vous pouvez optionnellement encadrer de chevrons.
3. Le titre optionnel du lien, que vous pouvez entourer de guillemets doubles, simples, ou parenthèses.

Les exemples suivants sont tous équivalents pour la deuxième partie du lien :

- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Modes de vie des Hobbits"`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle 'Modes de vie des Hobbits'`
- `[1]: https://en.wikipedia.org/wiki/Hobbit#Lifestyle (Modes de vie des Hobbits)`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Modes de vie des Hobbits"`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> 'Modes de vie des Hobbits'`
- `[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> (Modes de vie des Hobbits)`

Vous pouvez placer cette deuxième partie du lien n’importe où dans votre document Markdown. Certaines personnes les placent juste après le paragraphe où ils apparaissent, d’autres à la fin du document (comme des notes de bas de page).

Par exemple, si vous ajoutez une URL classique dans un paragraphe et que cela donne ceci en Markdown :

```
Dans un trou dans le sol vivait un hobbit. Pas un trou méchant, sale et humide, rempli de bouts
de vers et d’une odeur gluante, ni un trou sec, nu, sableux où rien ne permet de s’asseoir ou de
manger : c’était un [hobbit-hole](https://en.wikipedia.org/wiki/Hobbit#Lifestyle "Modes de vie des Hobbits"), et cela signifie le confort.
```

Même si ce lien pointe vers une information intéressante, l’URL affichée rend le texte brut plus difficile à lire. Pour améliorer cela, vous pourriez utiliser le format de lien en référence ainsi :

```
Dans un trou dans le sol vivait un hobbit. Pas un trou méchant, sale et humide, rempli de bouts
de vers et d’une odeur gluante, ni un trou sec, nu, sableux où rien ne permet de s’asseoir ou de
manger : c’était un [hobbit-hole][1], et cela signifie le confort.

[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Modes de vie des Hobbits"
```

Dans les deux cas, le rendu sera identique :

Dans un trou dans le sol vivait un hobbit. Pas un trou méchant, sale et humide, rempli de bouts
de vers et d’une odeur gluante, ni un trou sec, nu, sableux où rien ne permet de s’asseoir ou de
manger : c’était un [hobbit-hole][1], et cela signifie le confort.

[1]: <https://en.wikipedia.org/wiki/Hobbit#Lifestyle> "Modes de vie des Hobbits"

###! Bonnes pratiques

Pour la compatibilité, essayez d’encoder les espaces dans les URLs avec %20. Alternativement, vous pouvez utiliser la balise HTML `<a>`.

Faites ceci :

```
[lien](https://www.example.com/ma%20super%20page)

<a href="https://www.example.com/ma super page">lien</a>
```

Ne faites pas ceci :

```
[lien](https://www.example.com/ma super page)
```

Les parenthèses dans une URL peuvent aussi poser problème. Pour la compatibilité, encodez la parenthèse ouvrante `(` en %28 et la parenthèse fermante `)` en %29. Sinon, vous pouvez utiliser la balise HTML `<a>`.

Faites ceci :

```
[un roman](https://fr.wikipedia.org/wiki/La_guerre_de_Milagro_%28roman%29)

<a href="https://fr.wikipedia.org/wiki/La_guerre_de_Milagro_(roman)">un roman</a>
```

Ne faites pas ceci :

```
[un roman](https://fr.wikipedia.org/wiki/La_guerre_de_Milagro_(roman))
```
