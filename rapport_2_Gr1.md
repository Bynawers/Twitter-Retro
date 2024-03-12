# Rapport 1 Twitter

#### Résumé de la semaine dernière

La semaine dernière, nous avons entamé le développement de l'application front-end et back-end de notre projet "Twitter Retro". Nous avons établi les bases du processus de connexion (Login) et de la page d'accueil (Home), ainsi qu'une partie des routes nécessaires. Du côté du back-end, nous avons mis en place une base de données MongoDB contenant les informations de connexion, et une API a été développée pour assurer la communication entre l'application web et le serveur. De plus, notre API et le site web étaient hébergés sur un serveur VPS distant personnel.

#### Rôles

Alami : Responsable
Théo : Chercheur
Imad / Ahmed : Codeur

#### Notre travail

Nous nous étions initialement fixé comme objectif de la semaine dernière de mettre en place le lien entre le front-end et le back-end pour la page de connexion (Login). Cependant, après réflexion, nous avons décidé de poursuivre le développement du front-end et du back-end de manière indépendante. Cette décision a été motivée par le constat qu'il n'était pas urgent d'établir ce lien et qu'il était préférable de nous assurer que nous avions géré tous les cas d'erreurs des deux côtés, afin d'éviter de perdre du temps dans le processus de débogage.

#### Front-Hand

[Github du site web](https://github.com/Bynawers/Twitter-Retro)
[Site web](http://185.216.26.172:3002/)

Nous avons poursuivi le développement du site web, en concentrant nos efforts sur les pages de connexion et d'accueil. Voici un résumé des fonctionnalités ajoutées par rapport à la semaine précédente :

**Login**

- **Connexion en plusieurs étapes :** Nous avons mis en place un processus de connexion en plusieurs étapes pour offrir une expérience plus fluide aux utilisateurs et moins pénible.
- **Refonte graphique :** Une refonte graphique complète de la page de connexion a été réalisée afin d'améliorer l'aspect visuel et l'ergonomie.

**Home**

- **Optimisation du responsive :** Nous avons retravaillé la mise en page responsive pour garantir une expérience utilisateur cohérente sur tous les appareils.
- **Widgets :** Des widgets de tendances et de liens utiles ont été ajoutés à la page d'accueil pour offrir un contenu pertinent et actualisé.
- **Nouvelles Routes et Pages :** De nouvelles routes et pages ont été créées pour permettre une navigation étendue et une meilleure organisation du contenu.
- **Création de composants réutilisables :** Nous avons développé des composants réutilisables tels que des publications, des commentaires et des boutons d'action pour optimiser le développement et la maintenance du site.

Nous avons également introduit de nouvelles routes, notamment :
**/:user/status/:idPost** _(Accessible en cliquant sur un post)_
**/:user/status/:idPost/photo/:idPhoto** _(Accessible en cliquant sur une photo)_

#### Back-Hand

[Github de l'API](https://github.com/Bynawers/Api-Twitter-Retro)
[Doc API](http://185.216.26.172:3001/api-docs/)

Nous avons également poursuivi le développement de l'API, avec un accent sur les fonctionnalités de sécurité et de gestion des profils utilisateur. Voici un aperçu des progrès réalisés :

**Réinitialisation du Mot de Passe :** Nous travaillons actuellement sur la fonctionnalité de réinitialisation du mot de passe, en utilisant des tokens pour sécuriser le processus. Cependant, nous avons rencontré un problème avec une erreur 500 (serveur interne) que nous cherchons à résoudre rapidement.
**Création des Modèles de Profil :** Nous sommes en cours de création des modèles de profil pour gérer efficacement les données utilisateur et garantir une expérience personnalisée.

**Nouvelles routes API :**

- **GetUser :** nous avons implémenté une fonctionnalité permettant de récupérer les informations d'un utilisateur.

- **GetUserFollowers :** Permet de récupérer la liste des abonnés d'un utilisateur. Cette fonctionnalité est essentielle pour les applications sociales ou les plateformes de contenu, où il est important de connaître les personnes qui suivent un utilisateur donné.

- **UpdateUser :** Permet de mettre à jour les informations d'un utilisateur existant dans notre système. Grâce à cette fonctionnalité, les utilisateurs peuvent mettre à jour leurs profils avec de nouvelles informations telles que leur nom, leur adresse e-mail, leur photo de profil, etc.

**Comparaison entre Token d'Authentification et OTP :**

Nous avons également mené une analyse comparative entre les tokens d'authentification et les OTP (One-Time Passwords) pour déterminer la méthode la plus adaptée à nos besoins en termes de sécurité.

#### Hébergement

Il n'y a pas eu de nouveautés concernant l'hébergement jusqu'à présent. Cependant, nous sommes actuellement en phase de réflexion quant à l'implémentation de HTTPS ainsi que d'un système de résolution de noms de domaine (DNS). Ces deux ajouts sont essentiels pour renforcer la sécurité et la fiabilité de notre infrastructure.

L'introduction de HTTPS permettra de sécuriser les communications entre notre serveur et les utilisateurs, en chiffrant les données échangées et en garantissant l'authenticité des informations transmises. Cela est particulièrement important pour protéger la confidentialité des utilisateurs et prévenir les attaques telles que l'interception de données.

Quant à l'ajout d'un système DNS, il permettra de simplifier l'accès à notre application en associant des noms de domaine conviviaux à nos adresses IP. Cela améliorera l'accessibilité de notre service et facilitera sa découverte par les utilisateurs.

### Difficultées rencontrées

Du côté du développement front-end, nous rencontrons encore des difficultés avec certains éléments, notamment le header, qui doit être à la fois fixé par rapport à son parent (sticky) et réactif lors du passage de l'application en mode téléphone. Bien que nous ayons trouvé une solution la semaine dernière, nous avons dû refaire le responsive de la page d'accueil car il ne répondait pas à nos attentes, et la solution précédente ne fonctionne plus.

Par ailleurs, nous sommes actuellement confrontés à des problèmes avec notre API en raison d'une erreur interne non gérée (ERROR 500) qui doit être résolue pour permettre la fonctionnalité de réinitialisation de mot de passe.

De plus, le serveur présente une version incompatible avec l'API, ce qui entraîne des plantages. Lorsque nous modifions les versions sur le serveur, elles sont automatiquement mises à jour lorsque nous poussons nos modifications via la pipeline. Pour remédier à cela, nous avons modifié la pipeline Github afin de forcer l'utilisation d'une version spécifique de Node et de NPM.

### Pour la prochaine fois

Pour la prochaine, nous auront beaucoup plus de temps pour développer, nous pourrons donc finaliser la page de login en le liant avec l'API. De plus il faudra faire la page User pour voir les informations d'un utilisateur, ses post, ses likes ...

Au niveau de l'API il va falloir continuer de travailler sur la structure de données de Twitter, c'est à dire les post, user, comment, etc..

#### Références

Voici quelques sites qui nous ont été utile :

- [JWT Token](https://jwt.io/)
- [Postman](https://www.postman.com)
- [OTP](https://www.appvizer.fr/magazine/services-informatiques/securite-informatique/authentification-otp)
- [UseContext vs Zustand vs Redux](https://bootcamp.uxdesign.cc/redux-vs-zustand-vs-context-api-their-pros-cons-and-usage-d3bcbb79ab6a)
