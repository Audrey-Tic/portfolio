# Portfolio d’Audrey Tichit

Portfolio personnel en français, sur une seule page, en HTML, CSS et JavaScript natifs. Entièrement statique, sans bibliothèque externe ni suivi de visiteurs.

## Ouvrir en local

Ouvrir `index.html` directement dans un navigateur, ou, avec Node.js 20 ou supérieur :

```sh
npm run dev
```

Puis ouvrir http://localhost:4173. Le serveur de prévisualisation écoute uniquement sur la machine locale. Arrêter avec Ctrl+C. Aucune installation nécessaire.

## Modifier le contenu

- `index.html` : introduction, bénévolat, formations, certifications, centres d’intérêt et liens.
- `experiences.js` : expériences professionnelles, bénévolat, regroupements de missions, marchés et domaines.
- `styles.css` : présentation et adaptations mobile.
- `theme.css` : palette chaude, cartes clients, logos et taille des textes.
- `app.js` : filtres, affichage des missions et navigation.
- `assets/audrey.jpg` : photographie fournie par Audrey.
- `assets/logos/` : logos des clients et associations extraits du CV fourni, servis localement.

Les informations professionnelles proviennent du CV fourni. Le bénévolat, les centres d’intérêt, la photo et le lien LinkedIn ont été précisés par Audrey. Les deux missions ANCV et les deux missions Airbus les plus récentes sont regroupées, avec leurs dates et leurs interventions distinctes. L’expérience Airbus 2022–2023 reste séparée. Les filtres par domaine et par marché sont combinables et s’appliquent uniquement aux expériences professionnelles. Le document Word et son numéro de téléphone ne sont pas inclus dans le site.

## GitHub Pages

Site : https://audrey-tic.github.io/portfolio/

Chaque push sur `main` déclenche le workflow `.github/workflows/deploy-pages.yml`. Il vérifie la syntaxe JavaScript, prépare les fichiers statiques, puis les déploie sur GitHub Pages. Il peut aussi être lancé manuellement depuis l’onglet **Actions** du dépôt.

GitHub Pages utilise **GitHub Actions** comme source de publication dans **Settings → Pages → Build and deployment**. Aucun secret supplémentaire ni installation de dépendances n’est nécessaire.

Les chemins sont relatifs : le site fonctionne sous `/portfolio/`. Seuls les fichiers de la page et le dossier `assets` sont publiés ; les outils de prévisualisation et le README restent dans le dépôt. Le fichier `.nojekyll` permet de servir les fichiers tels quels.

## Précisions sur le parcours et les logos

Les responsabilités transverses chez CGI et la qualification de Sauveteuse secouriste du travail ont été fournies directement par Audrey. Le logo CGI provient du CV. Le logo SST vert provient de https://www.lonasante.com/wp-content/uploads/2026/03/logo-sst-vert-HD-niveau-acteur-Source-INRS.png et est conservé dans ses couleurs et proportions d’origine. Aucune date de certification ni de début chez CGI n’a été ajoutée.

## Indexation

La page contient une balise robots `noindex, nofollow, noimageindex` pour demander aux moteurs de recherche de ne pas l’indexer. Aucun blocage par `robots.txt` n’est ajouté : les moteurs doivent pouvoir lire cette consigne. Le site reste public et accessible par son lien ; une éventuelle désindexation prend effet après un nouveau passage du moteur.
