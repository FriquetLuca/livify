##! Spoiler

Sur Reddit et Discord, par exemple, vous pouvez utiliser des balises spoiler pour cacher du contenu à l’utilisateur afin qu’il ne le voie pas s’il ne veut pas le voir.  
Vous pouvez écrire un spoiler en utilisant soit : `>!...!<` soit `||...||`.

### Exemple

```md
Ce >!mot!< est caché.  
Ce ||mot|| est caché.
```
Ce >!mot!< est caché.  
Ce ||mot|| est caché.

---

> Note : le spoiler Discord ne peut pas être utilisé dans les tableaux.

La syntaxe peut être étendue avec un bloc spoiler inspiré de Reddit. Commencez le bloc par `!>` et terminez-le par `<!`. Il s’affichera comme un accordéon avec un titre.

### Exemple

```md
!> Ceci est un spoiler  
Le contenu est caché.  
> SPOILER SUR TOUT !  
<!
```

!> Ceci est un spoiler  
Le contenu est caché.  
> SPOILER SUR TOUT !  
<!

---

Assurez-vous de laisser un espace avant et après le bloc spoiler pour qu’il puisse s’afficher correctement.

Faites ceci :
```
Ceci est une phrase.

!> Ceci est un spoiler  
Le contenu est caché.  
> SPOILER SUR TOUT !  
<!

Ceci est une autre phrase.
```

Ceci est une phrase.

!> Ceci est un spoiler  
Le contenu est caché.  
> SPOILER SUR TOUT !  
<!

Ceci est une autre phrase.

Ne faites pas ceci :
```
Ceci est une phrase.
!> Ceci est un spoiler  
Le contenu est caché.  
> SPOILER SUR TOUT !  
<! Ceci est une autre phrase.
```

Ceci est une phrase.  
!> Ceci est un spoiler  
Le contenu est caché.  
> SPOILER SUR TOUT !  
<! Ceci est une autre phrase.
