# STYLE — Tangue

> **Verrouillé le 2026-11-18 (/lock).** Toute évolution passe par un `/delta` daté dans `DESIGN.md`.
> Style validé par Gaia le 2026-11-18 : **V2.1 « Plein jour »**, la langue de Tidewater (bankkeeper V9–V10) appliquée à Tangue.
> Référence visuelle : `planches/v2/01-plein-jour.html` (page Jeu). Les autres planches V2 en sont la déclinaison stricte.
> UI en anglais, documentation en français.

## 1. Principe

Une vraie mer en temps réel occupe tout le cadre. Les instruments sont des **cartes blanches qui flottent dessus**. **Une seule chose compte à la fois** : un héros par écran, un seul bouton plein, un seul bleu.

## 2. Palette

| Jeton | Hex | Usage |
|---|---|---|
| `--bg` | `#eaf3fb` | fond derrière la scène, chargement |
| `--panel` / `--card` | `#ffffff` / `rgba(255,255,255,.96)` | toutes les cartes, la barre, la plaque de commandes |
| `--sea` | `#b9d4ea` | pistes de jauges vides (à 14–18 % de bleu en pratique) |
| `--ink` | `#0f2742` | texte, limites des jauges, chiffres secondaires |
| `--muted` | `#5b7088` | libellés, notes, unités |
| `--cy` | `#1565c8` | **le seul accent** : héros, action, progression, bouée suivante, ma ligne |
| `--cy-press` | `#0f4fa3` | bouton enfoncé |
| `--hair` | `rgba(15,39,66,.10)` | filets, bordures de boutons fantômes |
| `--lift` | `0 18px 40px -24px rgba(15,39,66,.45)` | ombre unique des cartes |

Règles : pas de rouge, pas de vert, pas de dégradé dans l'UI, pas de verre dépoli. Le **danger** se dit avec le bleu et un halo (anneau à 30 % de bleu), jamais par une nouvelle couleur. Scène : mer `#0f5fb8`, ciel `#6aa3dc → #a9cdee → #e6f0f9`, coque blanche, flottaison bleue `#1565c8`, œuvres vives marine `#0f2742`, pont bois clair.

## 3. Typographie

Trois familles libres (SIL OFL), embarquées en woff2 (aucune requête réseau) :
- **Barlow** 400/500/600/700 : tout le texte, les cadrans, les boutons.
- **Barlow Condensed** 700 : **uniquement le héros** (le gros chiffre).
- **IBM Plex Mono** 400/500 : notes chiffrées (« in 3 s »), lignes copiables, horodatages.

Échelle unique : **76** (héros desktop) / 44–50 (héros mobile) / 16 (boutons, titre de barre) / 15 (valeur de cadran) / 14 (texte) / 12 (libellés de cadran en petites capitales, notes) / 10 (kicker en capitales espacées .18em) / 9 (sous-ligne d'étiquette du monde).
Chiffres toujours tabulaires. Libellés en `font-variant-caps: all-small-caps` (pas `uppercase`), kickers en capitales espacées.

## 4. Grille et cadres

- Jeu déplié : **734 × 640** dans le post desktop, **390 × 640** sur mobile. Vue inline (Post) : **734 × 420** / **390 × 420**.
- Marges intérieures : 12 px desktop, 10 px mobile. Écart entre cartes : 8–10 px.
- Haut : la **barre** en pilule. Gauche, sous la barre : la **carte héros**. Bas : la **plaque de commandes**. Le centre reste à la mer et au bateau.
- Tout tient dans le viewport, sans défilement, sur les deux cadres.

## 5. Composants

| Composant | Forme | Détails |
|---|---|---|
| **Barre** | pilule pleine largeur, `--card`, filet `--hair`, `--lift` | Titre « Tangue » 16/700 puis cadrans séparés par un filet vertical. Le cadran actif est en bleu, avec une barre de 3 px sous la valeur. |
| **Cadran** | libellé en petites capitales 12 px `--muted` au-dessus, valeur 15/600 dessous | unité en 11/500 `--muted` |
| **Carte héros** | rayon 22 (18 mobile), padding 14×20 | kicker 10 px, chiffre condensé 76 px bleu, le « ° » à 55 % en exposant, unité 13 px, puis jauge et note |
| **Jauge** | piste 4 px (bleu 14 %), remplissage bleu du zéro à la valeur, deux traits d'encre aux limites ±14°, curseur 14 px bleu cerclé de blanc | légende port / level / starboard en petites capitales |
| **Étiquette du monde** | carte 128 px, rayon 14, centrée au-dessus de l'objet | nom 12/700, sous-ligne 9 px capitales, barre 3 px, note mono bleue |
| **Plaque de commandes** | pilule pleine largeur, padding 8, `--card` | deux boutons de 60 px (58 mobile) |
| **Bouton plein** | pilule `--cy`, texte blanc 16/600 | un seul par écran ; enfoncé `--cy-press` + scale .985 |
| **Bouton fantôme** | pilule transparente, filet `--hair`, texte `--ink` | désactivé : opacité .4 |
| **Carte** | rayon 20–22, `--card`, `--lift`, padding 16×18 | titre 13/700 capitales espacées .1em, puis une phrase `--muted` qui dit à quoi elle sert |
| **Ligne de classement** | filet `--hair` en haut, rang mono, nom, valeur à droite | **ma ligne** : fond bleu 8 %, nom et valeur en bleu |
| **Toast** | carte rayon 14, filet gauche 3 px bleu | 4 s |

Pictos : chevrons et traits SVG 2,2 px à bouts ronds. **Aucun emoji** (le 🔥 et le 🌊 du code actuel disparaissent).

## 6. La scène (three.js)

Code : `planches/v2/scene.src.txt`, à porter dans `src/client`.
- **Ciel** : dôme en dégradé + halo de soleil (élévation 17°, côté avant-droit). Pas le `Sky` physique : il rendait la mer grise vue d'aussi bas.
- **Mer** : `Water` de three.js, reflet en 1024 px, rf0 abaissé à 0,05, couleur propre éclaircie sur les crêtes. **Houle géométrique** (4 trains : 34 / 19 / 10,5 / 5,6 m), la même fonction en GLSL et en JS. Maillage dense au centre, 9 km de large.
- **Écume** : collier le long de la coque, vague d'étrave, remous d'hélice et sillage de Kelvin, dessinés par shader sur une texture de bruit générée.
- **Bateau** : chalutier de 13 m, coque construite par couples, peinture par zones, pont en lattes, timonerie, mât, portique, tambour, caisses, défenses.
- **Caméra** : trois-quarts arrière, environ 7 m de haut, **sans roulis** (c'est le bateau qui gîte contre l'horizon). Elle suit la houle à 35 %.
- **Lumière** : soleil chaud `#fff0d8` avec ombres douces sur le bateau, hémisphère ciel/mer, environnement PMREM du ciel. Tone mapping ACES, exposition 0,92.
- La mer est le décor de **toutes** les pages, avec un cadrage propre à chaque page (voir les planches).

## 7. Mouvement

- La houle, l'écume et la flamme tournent en continu. Le roulis de jeu vient du moteur (`nextTilt`), avec ±1,4° de vie en plus.
- Un événement = une transition courte (180–240 ms, `cubic-bezier(.2,.7,.2,1)`) : bouton enfoncé, carte qui monte, toast.
- `prefers-reduced-motion` : scène figée sur une image, aucune transition.
- Onglet masqué : boucle de rendu en pause.

## 8. États (règles)

| Situation | Ce qui change |
|---|---|
| Chargement | fond `--bg`, carte « Reading the swell » avec barre de 3 px |
| Prêt | « Cast off » est le seul bouton plein ; Port / Starboard en fantômes désactivés |
| En course | le bouton qui corrige devient plein ; la barre montre « Crossing » en bleu |
| Près de la limite (≥ 10°) | halo bleu sur le curseur, la note « n° before you capsize » passe en bleu |
| Gagné / perdu | la carte de fin remplace la plaque ; la scène continue derrière |
| Déjà joué aujourd'hui | le bouton plein devient fantôme : « Crossing made · next sea in hh:mm » |
| Erreur | carte blanche, phrase simple, bouton fantôme « Try again » |

## 9. Accessibilité et performance

- Le canvas est `aria-hidden`. Toute l'information est aussi dans le DOM (chiffres, boutons, classement).
- Contraste : encre sur blanc 15:1, bleu sur blanc 5,6:1, blanc sur bleu 5,6:1.
- Cibles tactiles d'au moins 58 px de haut. Port et Starboard occupent chacun la moitié de la largeur.
- three.js ajoute environ 150 Ko gzip. Pixel ratio plafonné à 2. Sur mobile, prévoir de réduire le reflet à 512 px et le maillage de la mer si on tombe sous 50 i/s.
