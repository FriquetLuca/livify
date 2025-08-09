##! Mathématiques

Il est possible d’écrire des formules mathématiques en utilisant une variante de [LaTeX](https://www.latex-project.org/). Pour cela, nous utilisons [KaTeX](https://katex.org/).  
Vous pouvez écrire une formule en syntaxe inline ou en syntaxe bloc. La syntaxe inline commence par un `$` et se termine par un `$`.

### Exemple

```md
La formule $a^2+b^2=c^2$ est la formule la plus connue du théorème de Pythagore.
```

La formule $a^2+b^2=c^2$ est la formule la plus connue du théorème de Pythagore.

---

Pour les équations, il est préférable d’utiliser la syntaxe bloc qui encadre le contenu `KaTeX` avec `$$`.

### Exemple

```md
L’équation d’un cercle est :
$$x^2+y^2=0$$
```

L’équation d’un cercle est :

$$x^2+y^2=0$$

---

Il est possible d’écrire la syntaxe bloc même à l’intérieur d’un bloc inline. Cela ne parsèmera pas le code `KaTeX` comme un bloc, mais il sera rendu en mode affichage (`DisplayMode`).

### Exemple

```md
La formule $$a^2+b^2=c^2$$ est la formule la plus connue du théorème de Pythagore.
```

La formule $$a^2+b^2=c^2$$ est la formule la plus connue du théorème de Pythagore.
