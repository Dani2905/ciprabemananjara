# API C.IP Rabemananjara — préparation au déploiement

Backend Node.js Express/CommonJS prévu pour l’authentification Admin, le CMS partagé et MySQL. Il est préparé pour une future application Passenger dans cPanel, **mais n’est pas encore installé sur l’hébergement**.

## État

- Forfait confirmé : Tranokala Rose Gold. Node.js `22.23.4` est le choix recommandé dans cPanel.
- La page commerciale annonce Node.js, mais Passenger, les variables d’environnement, le routage HTTPS `/api`, les modules et les limites du compte restent à confirmer avec Tranokala.
- Code CommonJS prévu pour limiter les problèmes de chargement ESM avec Passenger.
- Le build Vite place le frontend compilé dans `server/public`; lorsque ce dossier contient `index.html`, Express sert les fichiers statiques et les routes React en plus de l’API `/api`, sur la même origine.
- Cette architecture réduit le besoin d’un proxy Apache séparé, mais Passenger et la racine d’application ne sont pas encore testés sur le compte Tranokala. Aucun déploiement réel n’a été effectué.
- **Aucune application cPanel, base MySQL, boîte e-mail ou compte Admin réel n’a été créé.**
- `schema.sql` est un brouillon; ne pas l’exécuter avant les vérifications d’hébergement et l’accord du Cabinet.
- Le frontend peut charger et enregistrer les documents CMS en mode API, notamment le document `site-pages` pour les textes bilingues des pages générales. Il faut une base configurée pour que les sauvegardes deviennent persistantes et partagées.

## Routes préparées

- `GET /api/health/live` : confirme que le processus Node répond.
- `GET /api/health/ready` : vérifie l’état MySQL sans exposer de secret.
- `GET /api/public/content` : lecture publique des documents CMS enregistrés.
- `GET /api/admin/auth/session`, `POST /api/admin/auth/login`, `POST /api/admin/auth/logout` : session Admin.
- `GET /api/admin/content`, `PUT /api/admin/content/:key`, `PUT /api/admin/content` : lecture et sauvegarde protégées des documents; le dernier endpoint enregistre plusieurs documents dans une transaction MySQL.
- `POST /api/public/contact` : validation, contrôle same-origin, honeypot, limite de fréquence et transmission SMTP vers l’adresse du Cabinet. Aucune boîte de réception Admin ni conservation de copie n’est prévue.

Les documents CMS éditables incluent : accueil, images, `site-pages` (navigation et pages générales éditables), bandeau et actualités. Le simulateur, les pages d’expertise, les Mentions légales et la Politique de confidentialité sont codés en dur et exclus de la liste des documents CMS acceptés par l’API. Les éventuelles anciennes valeurs de ces documents, si elles existaient, sont ignorées par le frontend. Les contenus éditables restent du texte/JSON; ils ne sont pas rendus avec `dangerouslySetInnerHTML`.

L’authentification préparée utilise un cookie HttpOnly/SameSite Strict, Secure en production, un hash de mot de passe et des jetons de session stockés sous forme de hash. La connexion est limitée en fréquence. Ces mesures doivent encore être vérifiées sur l’hébergement réel; MFA, sauvegardes opérationnelles et monitoring ne sont pas déclarés comme actifs.

## Contact par e-mail

Le choix est un envoi par e-mail seulement, sans tableau de réception dans Admin. Variables privées attendues : `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASSWORD`, `CONTACT_TO_EMAIL` et, si nécessaire, `CONTACT_FROM_EMAIL`. Elles ne doivent jamais être placées dans le frontend, un fichier public ou l’archive. Le serveur utilise l’adresse du visiteur comme `Reply-To`.

Tant que SMTP n’est pas configuré, le serveur renvoie `contact_not_configured` au lieu de prétendre avoir envoyé. Même après acceptation SMTP, cela ne garantit pas la lecture ni l’arrivée en boîte principale. Le flux réel n’a pas encore été testé.

## Essais locaux sans MySQL

Pour inclure le frontend dans le même processus Express, compiler d’abord à la racine du projet. Le test ajoute un contrôle de la page d’accueil, des routes React profondes et d’un fichier statique lorsque le build existe.

```bash
# À la racine du projet
npm ci
VITE_CMS_MODE=api npm run build

# Puis dans le dossier server
cd server
npm ci
npm test
NODE_ENV=production PORT=3001 npm start
```

Sous Node `22.23.4`, les tests backend couvrent l’état API, l’absence de lecture Admin non autorisée, les origines, la validation Contact et le refus clair lorsque MySQL ou SMTP n’est pas configuré. Lorsque le frontend compilé est présent, ils vérifient aussi son service par Express. Ils n’effectuent aucune connexion à une base réelle ni aucun envoi e-mail.

`app.js` est l’entrée proposée pour Passenger et utilise `process.env.PORT`. En développement, Vite garde son proxy local vers l’API; en mode intégré, le même Express sert le frontend et `/api`. Ce démarrage local ne prouve pas que Passenger accepte cette configuration sur Tranokala.

## Après validation et accord seulement

1. Créer la base MySQL dans cPanel et utiliser un schéma final approuvé.
2. Définir les variables privées dans l’environnement du compte, sans les écrire dans les fichiers frontend.
3. Créer le premier Admin depuis un terminal interactif :

```bash
node scripts/create-admin.js admin@example.com
```

Ne pas exécuter cette commande maintenant; elle nécessite MySQL et crée un vrai compte. Garder le mot de passe hors du code et de la conversation.
4. Tester les sauvegardes CMS, la restauration, les sessions, le redémarrage Passenger et la livraison SMTP sur un environnement contrôlé avant toute publication.
