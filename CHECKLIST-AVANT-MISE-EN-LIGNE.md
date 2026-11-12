# Checklist de validation avant la mise en ligne

**Projet :** site du Cabinet Rabemananjara  
**État au 26 octobre 2026 :** préparation et démonstration seulement. Aucune base MySQL, application Node.js cPanel, boîte SMTP ni compte Admin réel n’a été créée. Ne pas publier à ce stade.

La confirmation de Tranokala n’est pas nécessaire pour poursuivre les essais et la préparation du code en local. Elle reste importante avant de créer l’application sur le compte ou d’engager des frais, car Passenger, les limites et les options exactes du forfait ne sont pas testés ici.

## 1. Essais dans l’aperçu du site — mode démo seulement

Utiliser l’aperçu actuel, sans basculer le site en mode API. Dans l’Admin de démonstration, le mot de passe local est `admin` : il sert uniquement à la maquette et ne doit jamais être utilisé sur le site réel.

### Pages et langues

- [ ] Ouvrir l’accueil et vérifier l’affichage en français puis en anglais.
- [ ] Ouvrir « Le Cabinet », l’aperçu des expertises et chacune des pages d’expertise.
- [ ] Ouvrir les actualités, puis un article lorsqu’il y en a un.
- [ ] Ouvrir Contact, les Mentions légales, la Politique de confidentialité et une adresse inexistante (page 404).
- [ ] Tester le menu sur ordinateur et sur une largeur mobile : ouverture, fermeture, liens et absence de débordement horizontal.
- [ ] Vérifier que le bouton hamburger reste icon-only et que son nom accessible est présent.

### Admin et compteurs

- [ ] Ouvrir l’Admin de démonstration et parcourir tous les menus.
- [ ] Comparer chaque badge au contenu correspondant : images renseignées, rubriques éditables, éléments du bandeau et actualités.
- [ ] Vérifier qu’aucun menu ou éditeur Admin ne permet de modifier le simulateur, les expertises, les Mentions légales ou la Politique de confidentialité.
- [ ] Ajouter puis retirer un élément de test dans un panneau (par exemple le bandeau) et vérifier que son compteur suit le changement.
- [ ] Vérifier les sauvegardes sur quelques champs bilingues; après sauvegarde, recharger l’aperçu et confirmer que les modifications restent dans ce même navigateur.
- [ ] Dans « Autres pages & simulateur », vérifier le champ d’adresse publique. Pour un essai, utiliser une adresse de test puis restaurer `contact@rabemananjara.mg`.
- [ ] Après modification de l’adresse, vérifier les liens e-mail sur Contact, la navigation et le pied de page. Un clic `mailto:` peut ouvrir le logiciel de messagerie : fermer le brouillon sans envoyer.
- [ ] Restaurer les contenus modifiés pour l’essai, ou effacer les données locales du navigateur si l’aperçu est devenu incohérent.

**Important :** en mode démo, l’Admin enregistre les changements dans le stockage local du navigateur utilisé. Cela ne les partage pas avec d’autres visiteurs. Le formulaire Contact en mode démo prépare un courriel dans le logiciel de messagerie; il ne transmet rien au site. Ne pas saisir de données de clients, de documents confidentiels ni de vrais mots de passe.

Le simulateur, l’aperçu et les pages d’expertise, les Mentions légales et la Politique de confidentialité sont codés en dur. L’Admin ne les édite plus; d’anciennes valeurs locales ou CMS sont ignorées.

## 2. Architecture locale préparée

Le build Vite place désormais le frontend compilé dans `server/public`. Quand ce dossier contient `index.html`, Express sert les fichiers du site et le fallback des routes React; les routes API `/api` restent gérées par le même processus. L’objectif est d’utiliser une seule application Node et une seule origine pour le site et l’API, plutôt qu’un proxy Apache séparé.

Cette architecture a été testée localement avec le build du frontend et le serveur Express. Les tests ne prouvent pas que Passenger fonctionne de la même manière sur le compte Tranokala. Sans MySQL et sans configuration SMTP réelles, ils ne valident pas non plus les sauvegardes partagées, la connexion Admin en production ou l’arrivée d’un vrai e-mail.

## 3. Confirmations utiles auprès de Tranokala avant toute création

Le forfait choisi est **Rose Gold** et Node.js `22.23.4` est indiqué comme recommandé dans le formulaire cPanel. La documentation publique consultée annonce Node.js pour ce forfait, mais le fonctionnement exact du compte reste inconnu.

### Message prêt à envoyer au support

> Bonjour,
>
> J’ai un hébergement Rose Gold et je prépare le site du Cabinet Rabemananjara. Avant de créer une application ou une base de données, pourriez-vous confirmer les modalités compatibles avec mon compte ?
>
> Le projet utilise Node.js 22.23.4 et Express/CommonJS. Le build du site React/Vite est placé dans le dossier `public` de l’application Node; Express doit servir le site, ses routes React et l’API `/api` depuis le même domaine.
>
> 1. Node.js 22.23.4 et Passenger/Node.js Selector sont-ils disponibles sur mon compte Rose Gold ?
> 2. Peut-on associer l’application Node à la racine du domaine, avec son dossier d’application contenant `app.js`, `src/`, `public/` et `package.json` ? L’application doit gérer à la fois les pages du site et les routes `/api/...`.
> 3. Passenger fournit-il la variable `PORT` et redémarre-t-il le processus après arrêt ou mise à jour ? Y a-t-il une consigne spéciale pour démarrer une application Express/CommonJS ?
> 4. Les variables d’environnement privées peuvent-elles être saisies dans cPanel et rester invisibles du site public ? Comment HTTPS et les en-têtes de proxy sont-ils transmis à l’application ?
> 5. Pour MySQL, quels hôte, port, version et options de connexion sont prévus depuis l’application Node.js ? Les connexions doivent-elles utiliser TLS ? Le compte peut-il créer les tables nécessaires ?
> 6. Les connexions SMTP sortantes sont-elles autorisées ? Quels paramètres de serveur, port et chiffrement sont requis pour une boîte créée dans cPanel ? Existe-t-il des limites d’envoi ?
> 7. Quelles sont les limites du forfait concernant mémoire, processus Node.js, stockage, taille des requêtes, redémarrages et sauvegardes/restauration ?
>
> Pour le moment, je demande uniquement ces confirmations techniques : merci de ne pas créer d’application, de base de données ni de boîte e-mail.
>
> Cordialement,

Ne jamais joindre de mot de passe ni de valeur SMTP à ce message.

## 4. Étapes réservées à une validation ultérieure

Après les essais manuels, les vérifications nécessaires et l’accord explicite du Cabinet :

1. confirmer les paramètres de l’application Passenger sur le compte Tranokala et adapter la configuration seulement si nécessaire;
2. créer MySQL avec un schéma relu, puis créer le compte Admin réel avec un secret conservé hors du code;
3. tester connexion/déconnexion, sessions, lecture et sauvegarde de chaque panneau CMS, rechargement et redémarrage du processus;
4. créer la boîte e-mail cPanel avec le Cabinet, configurer les variables SMTP privées et effectuer un envoi de test contrôlé;
5. valider HTTPS, les routes, les sauvegardes, les journaux, les textes juridiques, les pages mobiles et l’accessibilité;
6. ne publier qu’après réussite de ces essais et autorisation du Cabinet.
