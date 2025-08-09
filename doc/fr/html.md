##! HTML

Beaucoup d'applications Markdown permettent d'utiliser des balises HTML dans le texte formaté en Markdown. Cela est utile si vous préférez certains tags HTML à la syntaxe Markdown. Par exemple, certaines personnes trouvent plus simple d'utiliser des balises HTML pour les images. Utiliser du HTML est également utile lorsque vous devez modifier les attributs d'un élément, comme spécifier la couleur du texte ou changer la largeur d'une image.

Pour utiliser du HTML, placez les balises dans le texte de votre fichier formaté en Markdown.

### Exemple

```md
This **word** is bold. This <em>__word__</em> is italic.
```
This **word** is bold. This <em>__word__</em> is italic.

---

Utilisez des lignes vides pour séparer les éléments HTML de type bloc comme \<div\>, \<table\>, \<pre\>, et \<p\> du contenu environnant (cela ne fonctionnera jamais avec `pre`, `script`, `style`, `svg` et `textarea`). Essayez de ne pas indenter les balises avec des tabulations ou des espaces — cela peut perturber le formatage.

### Exemple

```md
<div>

Some **markdown** over *here*.
</div>
```
<div>

Some **markdown** over *here*.
</div>

---

Vous ne pouvez pas utiliser la syntaxe Markdown à l'intérieur des balises HTML de type bloc.

### Exemple

```md
<p>italic and **bold**</p>
<p>
italic and **bold**
</p>
```
<p>italic and **bold**</p>
<p>
italic and **bold**
</p>
