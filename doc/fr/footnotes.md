##! Notes de bas de page

Les notes de bas de page permettent d’ajouter des notes et références sans encombrer le corps du document. Quand vous créez une note de bas de page, un numéro en exposant avec un lien apparaît à l’endroit où vous avez ajouté la référence. Les lecteurs peuvent cliquer sur ce lien pour accéder au contenu de la note en bas de la page.

Pour créer une référence de note de bas de page, ajoutez un caret et un identifiant entre crochets (\[\^1\]). Les identifiants peuvent être des nombres ou des mots, mais ne doivent pas contenir d’espaces ou de tabulations. Ces identifiants servent uniquement à relier la référence à la note elle-même — dans le rendu, les notes sont numérotées séquentiellement.

Ajoutez la note de bas de page avec un autre caret et numéro entre crochets suivi de deux-points et du texte (\[\^1\]\: Ma note.). Vous n’êtes pas obligé de mettre les notes à la fin du document. Vous pouvez les placer n’importe où, sauf à l’intérieur d’autres éléments comme les listes, citations, ou tableaux.

### Exemple

```md
Voici une note simple,[^note] et voici une plus longue.[^longnote]

[^note]: Ceci est la première note de bas de page.

[^longnote]: En voici une avec plusieurs paragraphes et du code.

    Indentez les paragraphes pour les inclure dans la note.

    `{ mon code }`

    Ajoutez autant de paragraphes que vous voulez.
```

Voici une note simple,<sup><a class="md-link" href="#fn:note">\[1\]</a></sup> et voici une plus longue.<sup><a class="md-link" href="#fn:longnote">\[2\]</a></sup>

<section class="md-footnotes">
    <ol class="md-fnlist" dit="auto">
        <li id="fn:note" class="md-fnitem">
            <p class="md-paragraph">
                Ceci est la première note de bas de page. <a class="md-revfn" href="#fnref:note">↩</a>
            </p>
        </li>
        <li id="fn:longnote" class="md-fnitem">
            <p class="md-paragraph">En voici une avec plusieurs paragraphes et du code.</p>
            <p class="md-paragraph">Indentez les paragraphes pour les inclure dans la note.</p>
            <p class="md-paragraph">
                <code class="md-codespan">{ mon code }</code>
            </p>
            <p class="md-paragraph">Ajoutez autant de paragraphes que vous voulez. <a class="md-revfn" href="#fnref:longnote">↩</a></p>
        </li>
    </ol>
</section>  
