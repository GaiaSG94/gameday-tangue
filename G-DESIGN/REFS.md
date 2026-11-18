# REFS — Tangue

> Références ouvertes le 2026-11-18 dans le navigateur. On prend des **principes**, jamais un layout, un texte, un asset ou une marque.

## Référence principale depuis la V2 — Tidewater (bankkeeper)

Demandée par Gaia le 2026-11-18. Dépôt `Tradoooo/bankkeeper`, lu dans `G-DESIGN/DESIGN.md` (V9.2 → V10.3), `web/src/v9.css`, `web/src/scene3d/world.ts` et `web/public/harbour-still.jpg`.

Observé :
- Mer three.js en temps réel (Water + carte de normales générée, ciel physique, soleil bas à 26°, brume `#cfe4f6`, ACES), décor 100 % procédural, aucun asset.
- Thème jour : fond `#eaf3fb`, cartes blanches à 96 %, encre `#0f2742`, gris `#5b7088`, **un seul bleu** `#1565c8` pour tout ce qui agit ou compte.
- Barre du haut flottante en pilule, cadrans « libellé en petites capitales / valeur ». Un héros en chiffre condensé 76 px. Étiquettes du monde en petites cartes (nom, capitales, barre de 3 px, note mono).
- Règle « une seule chose à la fois » (V6) : au repos, seulement l'essentiel ; le reste apparaît quand il compte.

Repris pour Tangue : tout ce qui précède, en principes et jetons. Non repris : le port, la ville, les montagnes, les chalutiers, les textes. Les écarts sont listés dans `DESIGN.md` (V2).

Les références D.FY et Igloo ci-dessous ne servent plus que d'archive de la V1.

## Avertissement sur l'accès aux références

- **`dfy.co` ne montre plus Defy the Current.** Le domaine est aujourd'hui une page de vente (« DFY.co is for sale »), sans rapport avec la référence. Le site d'origine, *DEFY THE CURRENT™ | D.FY* (agence D.FY, Site of the Day Awwwards du 21/05/2018), n'est consultable que par sa fiche Awwwards : <https://www.awwwards.com/sites/defy-the-currenttm-d-fy>. Ce qui suit vient de cette fiche (capture du site, palette relevée, tags), pas d'une visite du site vivant.
- **`igloo.inc` ne dépasse pas son écran de chargement** dans le navigateur intégré (WebGL lourd). J'ai observé le loader sur ~25 s, puis complété par la fiche Awwwards (<https://www.awwwards.com/sites/igloo-inc>, SOTD 23/07/2024, studio abeto). Je n'ai pas vu les scènes 3D elles-mêmes.

Si tu as une capture ou un autre lien vivant pour l'une ou l'autre, je reprends l'analyse.

## Defy the Current (D.FY) — via Awwwards

Observé :
- Palette à **3 couleurs seulement** : noir `#000`, gris `#9c9c9c`, blanc `#fff`. Photo d'architecture en noir et blanc, plein cadre.
- Logotype « D.FY THE CURRENT » où la seconde moitié passe en gris : la hiérarchie se fait par la valeur, pas par la couleur.
- Texte posé **verticalement dans les marges** (rubriques, « careers »), menu au trait (« outlined menu »), bouton menu en grille de lettres.
- Tags : Parallax, Clean, Flat Design, GSAP. Le mouvement porte la narration ; le décor reste plat.

À retenir pour Tangue :
1. **Le paysage plein cadre comme sujet**, pas comme fond : la mer occupe l'écran, l'UI se pose dessus.
2. **Parallax par couches** : plusieurs plans de houle qui glissent à des vitesses différentes donnent la profondeur sans 3D.
3. **Hiérarchie par la valeur** (noir / gris) avant la couleur ; une seule couleur d'accent suffit.
4. **Les marges travaillent** : métadonnées du jour (date, houle, rafales) posées verticalement sur les bords, le centre reste au jeu.

## Igloo Inc. — loader observé + Awwwards

Observé :
- Palette à **2 couleurs** relevée : gris bleuté brumeux `#b6bac5` et ardoise profonde `#383e4e`. Le fond du loader est un gris froid uni, mat.
- Loader : **une seule ligne horizontale de tirets et de points blancs** au centre de l'écran, qui se remplit. C'est littéralement un horizon qui progresse.
- Tags : 3D, Animation, Transitions, Infinite Scroll. Profondeur par la lumière et le brouillard, pas par le contraste.

À retenir pour Tangue :
1. **La profondeur par la perspective atmosphérique** : plus le plan est loin, plus il est clair et brumeux. Cinq valeurs d'un même gris bleuté font une mer entière.
2. **Lumière naturelle et basse** : un soleil voilé, pâle, jamais un dégradé saturé.
3. **La ligne pointillée comme instrument** : l'horizon peut aussi être une jauge qui se remplit (45 points = 45 secondes de traversée).
4. **Calme** : une seule chose bouge à la fois au premier plan.

## Ce qu'on n'emprunte pas

- Les photos, les modèles 3D, les textes, les logotypes et le bouton-grille de D.FY et d'Igloo.
- Les polices des deux sites. Les planches embarquent deux familles libres (SIL OFL) : **Barlow Condensed** et **IBM Plex Mono**, intégrées en base64 dans chaque fichier, sans requête réseau.
- L'univers crypto / pingouins d'Igloo.
