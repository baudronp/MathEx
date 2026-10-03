# Maths en Mission

Petit jeu de maths statique, conçu pour être déposé tel quel sur GitHub Pages. Il ne dépend d'aucune bibliothèque ni serveur : les étoiles sont conservées dans le navigateur de l'enfant (`localStorage`).

## Publier sur GitHub Pages

1. Créez un dépôt GitHub et ajoutez ces quatre fichiers à la racine.
2. Dans **Settings → Pages**, choisissez la branche `main` et le dossier `/ (root)`.
3. Enregistrez : GitHub fournit l'adresse de votre jeu quelques instants plus tard.

## Ajouter une mission

Le catalogue est dans `exercises.js`. Chaque mission possède une fonction `next(mode)` qui retourne une question. Les questions sont générées à la demande ; elles peuvent aussi venir d'une liste prédéfinie si une leçon le demande.

Formats disponibles :

- `input` : réponse numérique saisie au clavier ;
- `qcm` : tableau `options` ;
- `factors` : deux nombres à saisir ;
- `pizza` : sélection de parts ;
- `compare` : choix `<`, `=` ou `>`.

Pour ajouter une mission, donnez-lui un `id`, un titre, des modes et `next(mode)`, puis le menu l'affichera automatiquement.

## Écriture tactile

La saisie numérique utilise le clavier tactile (`inputmode="numeric"`), compatible tablette. Une reconnaissance d'écriture manuscrite fiable nécessiterait un modèle de reconnaissance (donc une dépendance et un poids de téléchargement) ; elle n'est pas incluse dans cette version volontairement légère et compatible GitHub Pages.
