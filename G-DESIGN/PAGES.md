# PAGES — Tangue

> Statuts : à dessiner / en revue / validée. **Style verrouillé le 2026-11-18 (/lock).** Style validé le 2026-11-18 : **V2.1 « Plein jour »** (langue Tidewater), formalisé dans `STYLE.md`.
> Chaque planche montre deux cadres côte à côte : desktop 1440 × 900 et mobile 390 × 844 (§6 du brief). La scène three.js tourne en direct ; une capture `.jpg` accompagne chaque planche.

| # | Page | Rôle | Contenu clé | Statut |
|---|------|------|-------------|--------|
| 1 | **Post** | Vue dans le feed (inline, `splash.html`) : donner envie de larguer les amarres | Mer au repos en plan large ; carte « Today's crossing · 45 seconds », date, « same sea for everyone », houle/rafales du jour ; pastilles série + foule du jour ; un seul bouton « Cast off ». États : déjà traversé, chaviré, chargement | **validée** · `planches/v2/02-post.html` |
| 2 | **Jeu** | Écran principal, une seule règle : garder le pont dans ±14° pendant 45 s | Barre à cadrans, héros « Deck tilt » + jauge, bouées de la traversée, Port / Starboard | **validée** · `planches/v2/01-plein-jour.html` |
| 3 | **Carte de fin** | Résultat + boucle quotidienne + accroche commentaire | « Crossing made · 45 seconds upright », série +1, % de réussite du jour, prochaine mer, ligne copiable sans spoiler, « Comment your crossing », « Copy result ». États : chaviré, toast de copie | **validée** · `planches/v2/03-fin.html` |
| 4 | **Séries & classement** | Montrer la série et la communauté | Ma série (héros) + calendrier du mois, meilleure série ; « Today's sea » (où les traversées se sont arrêtées) ; plus longues séries avec ma ligne. Mobile : onglets Today / Streaks | **validée** · `planches/v2/04-series.html` |

## Données de démo (cohérentes d'une page à l'autre)

Mer du 2026-11-18 (houle 0.70, rafales 0.64, générateur du dépôt). Série 6 avant la traversée, 7 après. 1 284 traversées aujourd'hui, 61 % réussies. Novembre : 13 traversées réussies sur 15 tentées (chavirés le 5 et le 11, absent les 1, 2 et 8). Meilleure série : 11. Rang 212 au classement des séries.

## Hypothèses dessinées (à confirmer avant le code)

1. **Une traversée par jour.** `IDEE.md` le dit, mais le code permet de rejouer. Les planches montrent « Crossing made / Capsized · next sea in hh:mm » après la partie, sans bouton pour rejouer.
2. **Perdre casse la série.** C'est le comportement actuel du serveur : une défaite n'écrit pas `lastday`, donc le lendemain la série repart de 0. La carte « Capsized » l'affiche.
3. **Scores de la communauté** = nombre de traversées du jour, % de réussite, histogramme des secondes tenues, classement des **plus longues séries**. Le serveur ne stocke rien de tout ça aujourd'hui : il faut un compteur par jour, une liste des `survivedMs` du jour et un classement trié des séries dans Redis.
4. **« Comment your crossing »** ouvre le champ de commentaire du post, sans rien poster automatiquement. **« Copy result »** copie la ligne `Tangue · 18 Nov · 45/45 s · streak 7` (presse-papiers + toast, pas de téléchargement).
5. **Bouées** : 9 marques, une toutes les 5 s. C'est une visualisation de la progression, pas une règle.
6. **Vue inline légère** : en production, la vue Post peut afficher une image fixe de la scène au lieu du rendu 3D, et ne charger three.js qu'au clic sur « Cast off » (recommandation d'`AGENTS.md` : garder `splash.html` rapide).

## Questions produit encore ouvertes

- Le geste : toucher (correction fixe, comme aujourd'hui) ou maintenir appuyé ? Le dessin est le même, seule la légende change.
- Le champ `limit: 28` du générateur n'est pas utilisé. Faut-il le supprimer ?
- Faut-il un classement « du jour » en plus des séries ? Aujourd'hui, la réussite est binaire (45 s ou non), donc il n'y a rien à départager entre ceux qui réussissent.
