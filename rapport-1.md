# Rapport 1 Twitter

#### Introduction

Nous avons choisi de travailler sur la réalisation d'un clone de Twitter, notre objectif est de faire revivre l'ancien Twitter (avec son oiseau bleu iconique), il y aura trois étapes dans notre projet :

- **1ère étape :** Produire un site web, une API, et une base de de manière assez fidèle à Twitter.

- **2ème étape :** S'occuper plus en détail de la partie sécurité de l'application front et back, en simulant des attaques et en cherchant des failles de sécurités.

- **3ème étape :** Proposer des nouveautés avancées à Twitter qui pourrait améliorer l'application, avec l'utilisation par exemple d'intelligence artificielle.

#### Notre travail

Pour le moment nous nous occupons de la 1ère étape (WEB, API, BDD), nous avons réalisé de manière indépendante le front et le back, les deux ne sont pas reliés pour le moment.
Voici donc le travail et les reflexions de la semaine passé :

#### Rôles

Théo : Responsable
Ahmed : Chercheur
Imad / Alami : Codeur

#### Front-Hand

[Github du site web](https://github.com/Bynawers/Twitter-Retro)
[Site web](http://185.216.26.172:3002/)

Pour le front nous utilisons React associé à Tailwind CSS et ViteJS (un framework accélérant le build et compile), nous avons commencé à créer la page d'accueil avec connexion et login, ainsi que la page Home. Seul l'aspect graphique a été fait, pour passer de la connexion au home, nous avons fait un système de route avec React Router :

- **/** (Page d'accueil)
- **/home** (Menu principal)
- **/explorer** (non fait)
- **/...** (il en existe presque une dizaine mais l'aspect visuel n'a pas été fait)

Le responsive des pages a été fait, permettant l'utilisation sur pc / tablette et téléphone.

#### Back-Hand

[Github de l'API](https://github.com/Bynawers/Api-Twitter-Retro)
[Doc API](http://185.216.26.172:3001/api-docs/)

Nous avons choisi d'utiliser MongoDB pour la base de données associé à NodeJs et Express JS (formant le célèbre MERN stack).
Nous avons principalement concentré nos efforts pour la création de la connexion d'un utilisateur dans la base de données, nous avons crée une API communiquant avec un cluster Mongo Atlas dans le cloud.

Nous avons ajouté une doc Swagger afin de mieux comprendre le fonctionnement de l'API pour chaque membre du groupe et de pouvoir tester les fonctionnalités pour nous et pour vous.

L'API est fonctionnelle, il manque par contre beaucoup de fonctionnalités pour le moment.

#### Hébergement

Nous avons hébergé nos applications sur le serveur VPS de Théo, cela permet d'avoir plus de performance et un contrôle total sur les applications et les services à ajouter.

Le site web a été hébergé à l'aide d'un serveur NGINX et l'api est executé à l'aide d'un gestionnaire de processus (PM2).

Pour accélérer le déploiement du code vers le serveur (et pour nous éviter des tâches redondantes) nous avons mis en place un système de (CI)/CD, lorsque l'on push dans le main d'un des deux projets github, automatiquement à l'aide d'une "pipeline CD" avec github actions, le code va être envoyé et executé pour être en service.

### Difficultées rencontrées

Côté front, nous avons rencontré des difficultés dans la responsivité de la page home qui est assez complexe, en effet, certains éléments disparaissent en fonction de la taille de l'écran et de nouveaux éléments apparaissent (comme un bottom bar de navigation ou bien un header plus grand qui disparait quand on scroll).

Côté back on a rencontré des difficultées dans certains middleware utilisé, comme par exemple Helmet qui bloque les requêtes cross-origin resource sharing (CORS) bloquant ainsi l'utilisation de Swagger.

Pour l'hébergement, nous avons rencontré des difficultées avec Docker car l'image Web n'est pas reconnu par NGINX.

### Pour la prochaine fois

Le nouvel objectif qu'on se fixe sera de conection le site web avec l'API pour le login afin de pouvoir se connecter à un compte utilisateur.
De plus il faudra avancé sur les nouvelles requête à créer pour récupérer un feed Twitter.
Pour l'hébergement, il faut régler quelques bug possible dans les pipelines ainsi que trouver la solution des images Docker.

#### Références

Voici quelques sites qui nous ont été utile :

- [React Icons](https://react-icons.github.io/react-icons/)
- [React Router W3School](https://www.w3schools.com/react/react_router.asp)
- [Tailwind CSS Cleansheet](https://nerdcave.com/tailwind-cheat-sheet)
- [React Folder structure](https://www.taniarascia.com/react-architecture-directory-structure/)
- [Mongoose Doc](https://mongoosejs.com/docs/index.html)
- [React Doc](https://react.dev/)
- [Express Doc](https://expressjs.com/)
- [Angular vs React vs Vue](https://www.browserstack.com/guide/angular-vs-react-vs-vue)
- [NoSQL vs SQL](https://www.data-bird.co/blog/sql-vs-nosql)
