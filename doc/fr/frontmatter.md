##! Frontmatter

Vous pouvez inclure des métadonnées en haut de votre document pour les réutiliser ensuite. Cela est utile lors de l’importation d’autres documents comme modèles.  
Le bloc Frontmatter commence par 3 `-` (trois tirets) et se termine par le même nombre de tirets.  
Le contenu entre ces délimiteurs doit être écrit en [YAML](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html).

### Exemple

```md
---     
title: Bonjour, monde !
author: John Doe
---
```

###! Métadonnées

Si vous avez besoin d’utiliser les métadonnées du `Frontmatter`, entourez-les de doubles accolades (exemple : `{{NAME}}`).

#### Exemple

```md
---     
title: Bonjour, monde !
author: John Doe
---     

# {{title}}

Ceci est le contenu principal de votre fichier Markdown écrit par **{{author}}**.

```

# Bonjour, monde !

Ceci est le contenu principal de votre fichier Markdown écrit par **John Doe**.

---

Il est possible de remplacer les données insérées qui ne sont pas des métadonnées, comme le titre du document (écrit `{{_title}}`) ou la langue de la page (écrit `{{_lang}}`) dans le modèle par défaut.

#### Exemple

```md
---
_title: Première Page
title: Bonjour, monde !
author: John Doe
---     

# {{title}}

Ceci est le contenu principal de votre fichier Markdown écrit par **{{_meta.author}}**.

```  
