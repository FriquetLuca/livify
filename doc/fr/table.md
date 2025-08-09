##! Tableau

Pour ajouter un tableau, utilisez trois tirets ou plus (---) pour créer l’en-tête de chaque colonne, et utilisez des barres verticales (|) pour séparer chaque colonne. Pour compatibilité, vous devriez aussi ajouter une barre verticale au début et à la fin de chaque ligne.

### Exemple

```md
| Syntaxe     | Description |
| ----------- | ----------- |
| En-tête     | Titre       |
| Paragraphe  | Texte       |
```

| Syntaxe     | Description |
| ----------- | ----------- |
| En-tête     | Titre       |
| Paragraphe  | Texte       |

---

La largeur des cellules peut varier, comme montré ci-dessous. Le rendu final sera identique.

```md
| Syntaxe | Description |
| --- | ----------- |
| En-tête | Titre |
| Paragraphe | Texte |
```

| Syntaxe | Description |
| --- | ----------- |
| En-tête | Titre |
| Paragraphe | Texte |

---

Astuce : créer des tableaux avec des tirets et des barres verticales peut être fastidieux. Pour accélérer le processus, essayez d’utiliser le [Générateur de tableaux Markdown](https://www.tablesgenerator.com/markdown_tables) ou [AnyWayData Markdown Export](https://anywaydata.com/). Construisez un tableau via une interface graphique, puis copiez le texte Markdown généré dans votre fichier.

Vous pouvez formater le texte dans les tableaux. Par exemple, vous pouvez ajouter des liens, du code (des mots ou phrases entre backticks `, pas des blocs de code), et de l’emphase.

Vous ne pouvez pas utiliser les titres, les citations, les listes, les règles horizontales, les images, ni la plupart des balises HTML.

Astuce : vous pouvez utiliser du HTML pour créer des retours à la ligne ou ajouter des listes dans les cellules du tableau.

Vous pouvez afficher une barre verticale (|) dans un tableau en utilisant son code HTML (&#124;).

###! Alignement

Vous pouvez aligner le texte dans les colonnes à gauche, à droite, ou au centre en ajoutant un deux-points (:) à gauche, à droite, ou de chaque côté des tirets dans la ligne d’en-tête.

#### Exemple

```md
| Syntaxe     | Description | Texte de test |
| :---        |    :----:   |          ---: |
| En-tête     | Titre       | Voilà ceci   |
| Paragraphe  | Texte       | Et plus      |
```

| Syntaxe     | Description | Texte de test |
| :---        |    :----:   |          ---: |
| En-tête     | Titre       | Voilà ceci   |
| Paragraphe  | Texte       | Et plus      |
