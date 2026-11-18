# DESIGN — Tangue (gameday-tangue)

> Journal de design. Versions datées, jamais écrasées. Tenu par Claude (directeur artistique), à partir de `PROMPT-DESIGN.md`.

## LOCK — 2026-11-18 · Style verrouillé

Gaia a validé les quatre planches et lancé `/lock`. **Fin des explorations.**
- Référence unique pour l'implémentation : `G-DESIGN/STYLE.md`, plus `G-DESIGN/planches/v2/` (01-plein-jour, 02-post, 03-fin, 04-series, avec leurs captures) et la scène `planches/v2/scene.src.txt`.
- Les planches V1 (Horizon, Brume, Encre) restent en archive et ne servent plus de référence.
- Toute évolution passe par un `/delta` daté ici, sans nouvelle direction.
- Reste ouvert côté produit, avant le code : les hypothèses et questions de `G-DESIGN/PAGES.md` (une traversée par jour, défaite qui casse la série, données communautaires à ajouter dans Redis, toucher ou maintenir, champ `limit: 28`, vue inline allégée).

## V3 — 2026-11-18 · Étape C : style formalisé + déclinaison

Gaia a validé la V2.1 (« Oui, étape C »).

- Le code de référence de la scène est `planches/v2/scene.src.txt` (extension `.txt` : la CI `check-limits` refuserait ce fichier de référence en `.js` ; il sera découpé en modules de moins de 50 lignes par fonction dans `src/client`).
- `G-DESIGN/STYLE.md` : principe, palette (un seul bleu, pas de rouge), typo et échelle, grille et cadres, composants, règles de la scène three.js, mouvement, règles d'états, accessibilité et performance.
- Planches dans `G-DESIGN/planches/v2/` (dossier du style validé), chacune avec sa capture `.jpg` :
  - `02-post.html` : vue inline dans le feed (734 × 420 et 390 × 420), avec un post voisin pour le contexte. Mer au repos en plan large ; carte « Today's crossing · 45 seconds » ; pastilles série et foule du jour ; un seul bouton plein « Cast off ». États : déjà traversé, chaviré, pastilles, chargement.
  - `01-plein-jour.html` : Jeu (validé en V2.1, inchangé).
  - `03-fin.html` : le bateau se redresse, vu de trois-quarts avant. Une carte remplace la plaque : 45 secondes en héros, série 7 (+1), 61 % de 1 284, prochaine mer, ligne copiable, « Comment your crossing » (plein) et « Copy result » (fantôme). États : chaviré (31 s, série à 0), toast, ligne copiable, accroche.
  - `04-series.html` : mer en retrait sous un voile clair ; ma série en héros avec le calendrier de novembre (plein = traversée, anneau = chaviré), meilleure série ; « Today's sea » en histogramme des secondes tenues avec « You » ; plus longues séries avec ma ligne en bleu. Mobile : onglets Today / Streaks. États : onglet Today, ma ligne, série vide.
- Données cohérentes d'une page à l'autre : série 6 avant, 7 après (la barre se met à jour sur la fin et les séries), 1 284 traversées, 61 % de réussite, rang 212.
- Générateur : `gen3.py` réutilise le shell, les polices, le CSS et la scène de la V2.1. Chaque page ne règle que son cadrage de caméra (Post : large et calme ; Fin : trois-quarts avant ; Séries : vue haute).

Hypothèses à confirmer : voir `PAGES.md` (une traversée par jour, défaite qui casse la série, données communautaires à stocker dans Redis, comportement des boutons de commentaire et de copie, vue inline allégée).

## V2.1 — 2026-11-18 · Plus de réalisme : le bateau et l'eau

**Retour de Gaia** : « améliore encore un peu la qualité, le réalisme du bateau et de l'eau ». Même planche (`planches/v2/01-plein-jour.html`), même HUD ; seule la scène change (`scene.src.txt`).

**Le bateau** (toujours 100 % procédural) :
- Vraie coque **construite par couples** (72 sections) : bouchain arrondi, léger dévers au-dessus de l'eau, tonture qui remonte vers l'étrave, étrave fine, tableau arrière plat. Fini les formes extrudées à bords droits.
- **Peinture par zones** dans le shader : œuvres vives marine sous la flottaison, bande bleue de flottaison, bordé blanc laqué, liseré bleu sous le pavois, intérieur du pavois blanc.
- Lisse en bois verni le long de la tonture, liston de défense marine, pont en lattes avec joints sombres et veinage.
- Timonerie à angles arrondis, trois vitres avant inclinées, hublots latéraux, porte arrière marine avec hublot rond, bouée couronne blanche à bandes bleues.
- Mât inox avec barre de flèche, radôme, feu de tête de mât, deux antennes fouet, flamme bleue qui ondule.
- Silhouette de chalutier : portique arrière en A avec poulie, tambour à filet et ses joues bleues, caisses à poisson bleues empilées, bittes inox, glène de cordage, quatre défenses suspendues.

**L'eau** :
- **Houle géométrique** : la surface se déforme réellement, avec 4 trains de vagues (34 m, 19 m, 10,5 m, 5,6 m). C'est la même fonction côté GPU et côté JavaScript, donc le bateau et les bouées montent, descendent et tanguent exactement sur la vague qui les porte.
- Maillage dense près du bateau et lâche au loin (un seul plan de 9 km). La pente de la houle entre dans l'éclairage et dans les reflets. Les crêtes s'éclaircissent.
- **Écume** dessinée par un shader : collier d'écume le long de la coque, vague d'étrave, remous d'hélice et les deux bras du sillage (angle de Kelvin). Tout défile pour donner la vitesse.
- Carte de normales 512 px à 13 octaves (rides fines), reflet du ciel en 1024 px, petit halo de soleil dans le ciel.

**Cadrage** : caméra en trois-quarts arrière, à 7 m de haut, qui suit la houle. On voit à la fois le flanc (flottaison, défenses), le pont, l'horizon et le sillage. La bouée bleue suivante est passée à droite pour que son étiquette ne recouvre plus la carte héros. L'étiquette reste dans le cadre sur mobile.

**Bug corrigé en route** : l'uniforme `time` du shader d'eau était déclaré deux fois. Le shader ne compilait pas et la mer disparaissait. Trouvé via la console, corrigé.

**Non vérifié** : rendu observé en WebGL logiciel (navigateur sans GPU) ; couleurs et fluidité à confirmer sur un vrai appareil, surtout le mobile (≈ 130 000 sommets d'eau, rendus deux fois à cause du reflet).

## V2 — 2026-11-18 · Re-brief : la langue de Tidewater (bankkeeper)

**Retour de Gaia sur la V1** : « aucun n'est assez moderne, reprends le design du jeu Tidewater / bankkeeper ». Les trois directions V1 (Horizon, Brume, Encre) sont rejetées et restent en archive dans `planches/v1/`.

**Source** : `Tradoooo/bankkeeper` (jeu Tidewater, même pipeline), état V9.2 → V10.3 de son `G-DESIGN/DESIGN.md` et `web/src/v9.css`. Ce qui est repris (principes et jetons, aucun asset ni modèle 3D copié) :
- **Une vraie mer en temps réel** (three.js) : eau réfléchissante avec une carte de normales générée par le code, soleil bas, brume au large, tone mapping ACES. Aucune image.
- **Instruments en cartes blanches flottantes** (`rgba(255,255,255,.96)`, rayon 20–22 px, ombre `0 18px 40px -24px`), **barre du haut en pilule à cadrans** (libellé en petites capitales au-dessus, valeur dessous).
- **Un seul héros** en gros chiffre condensé bleu (76 px), **un seul bleu d'action** `#1565c8`, encre `#0f2742`, gris `#5b7088`, fond `#eaf3fb`. Pas de rouge : le danger se dit avec le bleu et un halo.
- **Étiquettes du monde** : petite carte blanche, nom, ligne en capitales, barre de 3 px, note en mono (les bancs de Tidewater deviennent les bouées de la traversée).
- **Boutons en pilules** : un seul plein (bleu), les autres en filet.

### Fait
- `G-DESIGN/planches/v2/01-plein-jour.html` : page **Jeu** en course, desktop 1440 × 900 et mobile 390 × 844, plus la bande d'états. La scène three.js tourne en direct dans les deux cadres (le bateau roule de ±1,6° autour de 9° bâbord, la houle avance, les bouées dansent ; image fixe si `prefers-reduced-motion`).
  - Bateau procédural : coque blanc laqué, liseré bleu, pont en lattes claires, timonerie à toit bleu, mât et flamme bleue, bittes et glène sur la plage arrière.
  - **Caméra à niveau, derrière le bateau** : c'est le bateau qui gîte contre l'horizon, donc on lit l'inclinaison sans chiffre.
  - Barre : Tangue · Today · Streak 6 days · Crossing 00:27 / 00:45 (avec barre de progression) · « Same sea for everyone ».
  - Héros « Deck tilt » : 9° to port, jauge port / level / starboard avec les deux limites à 14°, « 5° before you capsize ».
  - Bouées : 9 marques sur l'eau, une toutes les 5 s de traversée ; la prochaine est bleue, avec son étiquette « Mark 6 of 9 · in 3 s ».
  - Commandes : une plaque en pilule en bas, Port (filet) et Starboard (bleu plein = correction en cours).
  - États : repos, correction, appui, désactivé, Cast off, héros près de la limite (12°, halo), chargement « Reading the swell ».
- `01-plein-jour.jpg` : capture de la planche (rendu logiciel), pour la voir sans WebGL.
- `scene.src.txt` : source lisible de la scène (sky dôme en dégradé, eau, bateau, bouées, phare), à porter dans `src/client` à l'implémentation.
- three.js r170 (licence MIT) est intégré minifié dans la planche (≈ 540 Ko), avec les polices. Aucune requête réseau, ouverture par double-clic.

### Écarts assumés par rapport à Tidewater
- **Ciel** : le `Sky` physique de Tidewater donnait une mer grise à ras de l'eau (elle reflète surtout le ciel près de l'horizon). Remplacé par un dôme en dégradé (bleu `#6fa6dd` → horizon `#e3eef8`) et un reflet de l'eau abaissé (rf0 0,06 au lieu de 0,3), pour garder un ciel pâle et une mer bleu franc.
- **Caméra basse** (6,5 m) plutôt que la vue plongeante de Tidewater : l'inclinaison se lit mieux de derrière et à hauteur d'homme.
- **Typo** : Bahnschrift (police système Windows) n'existe ni sous Linux ni de façon garantie dans l'iframe Reddit. Remplacée par Barlow / Barlow Condensed (même famille DIN, OFL) et IBM Plex Mono pour les notes.

### À trancher
- La V2 apporte une dépendance three.js au client Devvit (~150 Ko gzip). Coût mobile à mesurer à l'implémentation ; repli 2D possible si la mer ne tient pas 60 i/s.
- Les bouées (une toutes les 5 s) sont une visualisation de la traversée, pas une nouvelle règle. À confirmer.
- Questions produit de `PAGES.md` toujours ouvertes.

## V1.1 — 2026-11-18 · Rejet des trois directions

Gaia : aucune des trois n'est assez moderne. Re-brief vers la langue de Tidewater (V2).

## V1 — 2026-11-18 · Exploration de la page principale (« Jeu »)

**Statut : en attente de validation de Gaia (étape B du process, on s'arrête ici).**

### Fait
- `G-DESIGN/REFS.md` : les deux références ont été ouvertes, mais aucune n'était lisible en direct. `dfy.co` est devenu une page de vente du domaine, j'ai donc lu la fiche Awwwards de *Defy the Current | D.FY*. `igloo.inc` ne dépasse pas son loader WebGL, j'ai donc observé le loader et lu la fiche Awwwards. Principes retenus : paysage plein cadre, parallax par couches, hiérarchie par la valeur, marges qui portent les métadonnées, profondeur par le brouillard, lumière basse voilée, ligne pointillée comme instrument.
- `G-DESIGN/PAGES.md` : 4 pages proposées (Post, Jeu, Carte de fin, Séries & classement), à valider. Questions produit ouvertes listées.
- 3 planches de la page **Jeu** (en course), dans `G-DESIGN/planches/v1/`. Chacune montre le cadre desktop 1440 × 900 (post dans un feed neutre, sans marque) et le cadre mobile 390 × 844, plus une bande d'états des composants :
  - `01-horizon.html` : **Horizon**, la direction du brief. Mer de jour en trois plans parallax, pont en bois au premier plan vu de la poupe, jauge en arc, gros chrono. Accent unique : le bois `#a9784f`.
  - `02-brume.html` : **Brume**, tirée d'Igloo. Monochrome gris bleuté en cinq valeurs, soleil voilé, horizon en pointillés, 45 points pour les 45 secondes, niveau à bulle, touches en verre dépoli. Accent unique : orange bouée `#e0683a`, réservé à la limite et au danger.
  - `03-encre.html` : **Encre**, la direction qui s'écarte du brief. Noir sur papier, mer en hachures, pont en barre noire, angle coté entre deux lignes rouges à 14°, règle graduée 0–45 s, métadonnées verticales dans les marges. Accent unique : rouge signal `#e5412d`. Typo : IBM Plex Mono au lieu d'une sans étroite.
- Données de démo réelles : la mer du 2026-11-18 calculée avec le générateur du dépôt (`generateSea`, houle 0.70, rafales 0.64), la limite de chavirage du code (|tilt| > 1, soit 14° affichés), la traversée de 45 s. Valeurs de démo choisies : 27 s écoulées, pont à 9° côté bâbord, Starboard enfoncé, série de 6.
- Polices embarquées en base64 (Barlow Condensed, IBM Plex Mono, licence SIL OFL, via npm `@fontsource`). Aucune requête réseau : chaque fichier s'ouvre en double-cliquant.
- Mouvement dans les planches : la houle dérive en parallax et le pont roule doucement (±2°). Les deux s'arrêtent si `prefers-reduced-motion` est actif.

### Décisions prises
- Pas d'emoji dans l'UI. Le code actuel utilise 🔥 pour la série et 🌊 sur le splash : les planches les remplacent par un pictogramme vague tracé en SVG (Horizon) ou par du texte (Brume, Encre).
- Le feed autour du post est générique (gris, sans logo) : on montre le cadre sans faire de theming Reddit.
- Une seule action pleine par écran : en course, c'est la correction en cours (bouton enfoncé). Avant le départ, c'est « Cast off ».

### En attente
- Choix d'une direction (ou d'un mélange explicite) par Gaia.
- Validation de `PAGES.md` et réponses aux questions produit (une traversée par jour ou plusieurs, contenu des scores de la communauté, geste toucher ou maintenir).
