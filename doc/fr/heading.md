##! Titre

Pour créer un titre, ajoutez des signes dièse (#) devant un mot ou une phrase. Le nombre de dièses correspond au niveau du titre. Les applications Markdown ne s’accordent pas toujours sur la gestion d’un espace manquant entre les dièses (#) et le nom du titre. Pour assurer la compatibilité, mettez toujours un espace entre les dièses et le nom du titre, et ajoutez une ligne vide avant et après un titre.

### Exemple

```md
# Titre niveau 1
## Titre niveau 2
### Titre niveau 3
#### Titre niveau 4
##### Titre niveau 5
###### Titre niveau 6
```
# Titre niveau 1
## Titre niveau 2
### Titre niveau 3
#### Titre niveau 4
##### Titre niveau 5
###### Titre niveau 6

---

###! Numérotation automatique des sections

Vous pouvez activer la numérotation automatique des sections en ajoutant un `!` juste après le dernier `#` d’un titre. Cela crée une entrée dans la `Table des matières` avec un index spécifique attribué au titre.

#### Exemple

```md
#! Premier titre
##! Deuxième titre
##! Troisième titre
#! Quatrième titre
```

<h1 id="heading" class="md-heading" aria-level="1">1. Premier titre</h1>
<h2 id="heading" class="md-heading" aria-level="2">1.1. Deuxième titre</h2>
<h2 id="heading" class="md-heading" aria-level="2">1.2. Troisième titre</h2>
<h1 id="heading" class="md-heading" aria-level="1">2. Quatrième titre</h1>

---

###! Titre de style Setext

Il existe une autre manière de créer un titre appelée `titre de style setext`. Ce style permet d’avoir les titres de niveau 1 et 2 en soulignant le texte. Ce style autorise plusieurs lignes, mais elles seront fusionnées en une seule lors de l’analyse.  
Notez que le `titre de style setext` ne gère pas la numérotation automatique des sections.

#### Exemple

```md
Titre niveau 1
==============

Titre niveau 2
--------------
```

Titre niveau 1
==============

Titre niveau 2
--------------

---

###! ID de titre

Un ID est généré automatiquement pour chaque titre, correspondant au texte du titre transformé en minuscules et où tous les symboles, ponctuations et espaces sont remplacés par des `-`. Si un titre avec un nom spécifique existe déjà, un suffixe `-n` sera ajouté, où `n` est le nombre d’occurrences du même titre.

Si vous souhaitez créer votre propre ID pour un titre, vous pouvez utiliser la syntaxe `{#...}` à la fin de votre titre.

#### Exemple

```md
# Mon titre {#mon-id-de-titre}
```

# Mon titre {#mon-id-de-titre}

> Note : Cela ne fonctionne pas avec les titres de style `setext`.
