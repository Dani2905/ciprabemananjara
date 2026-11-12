# Cabinet Rabemananjara — site public et Admin

Application React, Vite, TypeScript et Tailwind CSS 4, préparée progressivement pour une future mise en ligne chez Tranokala. **Le projet n’est pas encore prêt à publier.**

## État du projet — 26 octobre 2026

- L’Admin conserve un éditeur bilingue pour l’accueil, la navigation éditable, le Cabinet, Contact, le pied de page, la page 404, les actualités et les autres pages générales prévues.
- À la demande du Cabinet, le simulateur de procédure, l’aperçu et les sept pages d’expertise, les Mentions légales et la Politique de confidentialité sont désormais codés en dur : ils ne sont plus modifiables dans l’Admin ni lus depuis les documents CMS. « Stratégie » avait été remplacé par « procédure ».
- Le document partagé `site-pages` reste relié aux autres pages générales éditables. Les champs du simulateur, des expertises et les libellés des liens légaux sont forcés à leurs valeurs codées en dur, même si d’anciennes valeurs CMS ou locales existent. En mode API, les champs éditables sont prévus pour être lus/écrits dans MySQL. **Aucune base réelle n’est configurée.**
- Le mode frontend par défaut reste `VITE_CMS_MODE=demo`. Il est local au navigateur et son mot de passe `admin` n’est pas une authentification à utiliser en production. Le mode `api` n’est pas exploitable en ligne tant que la base et le compte Admin ne sont pas configurés.
- Le backend Express/CommonJS et le schéma MySQL brouillon sont dans `server/`. L’utilisateur a choisi MySQL plutôt que PostgreSQL; aucune base n’est créée.
- Le build Vite place le site compilé dans `server/public`; Express peut servir ce frontend et l’API `/api` depuis le même processus et domaine, avec un fallback pour les routes React. Cela évite de dépendre d’un proxy Apache séparé. Ce modèle n’a pas encore été testé sous Passenger chez Tranokala, et l’application cPanel n’est pas créée.
- Contact est prévu pour l’e-mail seulement, sans boîte de réception Admin. Le formulaire appelle `POST /api/public/contact` en mode API; les contrôles et l’acheminement Nodemailer sont préparés, mais **aucun SMTP réel n’est configuré ni testé**. L’adresse publique par défaut est `contact@rabemananjara.mg`.
- Les images d’actualités en mode API doivent encore être renseignées par URL; le téléversement serveur sécurisé n’est pas implémenté.
- Les Mentions légales et la Politique de confidentialité restent des textes codés en dur à relire. L’e-mail dédié aux demandes sur les données personnelles est vide dans le texte par défaut; il faudra le modifier dans le code après validation, puisqu’il n’est plus éditable dans l’Admin.
- Les affirmations propres au Cabinet (notamment l’inscription OMAPI) doivent être vérifiées avant publication. Les affirmations non validées comme « plus de 20 ans » ont été retirées des textes préremplis.

**Aucune base de données, aucun compte Admin réel et aucune application Node.js cPanel n’ont été créés.** Ne téléverse pas le projet comme site de production pour l’instant.

## Vérifications exécutées

- `npm run build` : build TypeScript/Vite réussi en mode démo et avec `VITE_CMS_MODE=api`.
- Tests backend sous Node `22.23.4` : **14/14 réussis**, sans base réelle; le dernier vérifie le service du frontend compilé et les routes React par le même serveur Express.
- Vérification historique des dépendances production serveur : `npm audit --omit=dev` sans vulnérabilité.
- Le preview Vite sur le port 3000 répond HTTP 200. L’API de preview sur le port 3001 a été arrêtée après les essais; ne pas supposer qu’elle tourne.
- Les clics n’ont pas été vérifiés dans un navigateur automatisé. Les builds et essais HTTP ne remplacent pas une recette visuelle et fonctionnelle complète.
- Le build affiche encore un avertissement Vite non bloquant sur la taille d’un bundle d’environ 500 KB.

Ces vérifications ne couvrent pas MySQL, Passenger sur le compte Tranokala, la réception d’un e-mail, HTTPS sur le domaine réel, les sauvegardes ou la mise en production.

## Hébergement prévu

Le forfait confirmé est **Rose Gold**. La page Tranokala consultée annonce Node.js sur Rose Gold et Yellow Gold; Node.js `22.23.4` est le choix marqué « recommended » dans cPanel. Le code est maintenant préparé selon une architecture simple : après le build, Express sert le frontend depuis `server/public` et les routes `/api` depuis le même domaine. Cette approche réduit le besoin de réécriture/proxy séparé, mais ne prouve pas encore que Passenger, la racine de l’application, les variables d’environnement ou les ressources fonctionneront sur le compte. Elle sera testée dans l’aperçu local; le comportement réel du compte reste à vérifier avant création et publication. Références : https://tranokala.pro/web/hebergement-gold/ et https://tranokala.pro/tos/web/.

## Démarrer en local

```bash
npm ci
npm run dev
```

Le site s’ouvre sur `http://localhost:3000`.

Pour lancer l’API locale dans un second terminal :

```bash
cd server
npm ci
PORT=3001 npm start
```

Vite transmet `/api` vers `http://127.0.0.1:3001`. Vérification de vie : `http://localhost:3000/api/health/live`. Sans base, les routes CMS renvoient `database_not_configured`; ce refus est attendu et ne signifie pas qu’un contenu a été enregistré.

Ne choisis pas `VITE_CMS_MODE=api` pour une utilisation réelle avant la création et les essais de MySQL et de l’Admin. Le mode démo est gardé par défaut tant que le backend n’est pas opérationnel.

## Avant toute mise en ligne

La checklist de recette manuelle et le message prêt à envoyer à Tranokala sont dans [`CHECKLIST-AVANT-MISE-EN-LIGNE.md`](./CHECKLIST-AVANT-MISE-EN-LIGNE.md). Les essais de navigateur restent à effectuer dans l’aperçu; ils ne remplacent pas les confirmations de l’hébergeur.

1. Faire valider par le Cabinet les traductions, coordonnées, actualités, allégations OMAPI, mentions légales et politique de confidentialité.
2. Confirmer auprès de Tranokala le fonctionnement Passenger/Node, les variables d’environnement, HTTPS, le routage `/api`, les limites du compte, les sauvegardes et les journaux.
3. Après cet audit et l’accord explicite du Cabinet, créer MySQL, finaliser et appliquer le schéma, puis créer le compte Admin réel avec un mot de passe géré hors du code.
4. Tester lecture publique, sauvegardes de chaque panneau, authentification/session, restauration et redémarrage Passenger avec la base de test.
5. Créer la boîte e-mail cPanel avec le Cabinet, puis configurer les paramètres SMTP privés; tester l’arrivée, le `Reply-To`, les erreurs et le suivi. Les demandes ne sont pas archivées dans l’Admin et le formulaire ne doit pas recevoir de documents confidentiels.
6. Tester la navigation et les pages FR/EN sur ordinateur et mobile, les liens, le formulaire, les images, le HTTPS et l’accessibilité. Publier seulement après validation.

Les coordonnées à conserver sont `+261 34 09 489 61` et Antananarivo, Madagascar. L’adresse publique par défaut `contact@rabemananjara.mg` se modifie dans l’Admin; pour les envois serveur, garde le destinataire privé `CONTACT_TO_EMAIL` cohérent. Les secrets SMTP restent dans l’environnement serveur. N’inscris aucun secret dans le dépôt ou l’archive du projet.
