### Optionnel - Détail des choix des technologies

#### Framework

**React** aussi connu sous le nom de React.js ou ReactJS, est une bibliothèque JavaScript maintenue par Meta (anciennement Facebook) et une communauté de développeurs depuis 2013. Il vise à simplifier la création d'applications web monopages en utilisant des composants dépendants de l'état pour générer du HTML dynamiquement, se distinguant par sa flexibilité et ses performances grâce à l'utilisation d'un DOM virtuel.

**Angular** est un framework open source basé sur TypeScript, co-dirigé par l'équipe Angular chez Google et une communauté. Il permet de créer des applications web monopages avec une architecture MVC pour une meilleure séparation des responsabilités et une maintenabilité accrue.

**Vue.js** également connu sous le nom de Vue, est un framework JavaScript open source pour la construction d'interfaces utilisateur et d'applications web monopages, créé par Evan You et maintenu par lui-même et d'autres membres de l'équipe principale.

|                                | Angular     | React          | Vue.js          |
| ------------------------------ | ----------- | -------------- | --------------- |
| Performance                    | moyen       | haute          | haute           |
| Scalabilité                    | haute       | haute          | faible          |
| Apprentissage                  | difficile   | moyen          | facile          |
| Disponibilité des développeurs | haute       | haute          | faible          |
| Communauté des développeurs    | grande      | très grande    | petite          |
| Acceptation et confiance       | haute       | très haute     | faible          |
| Utiliser par                   | Google, Wix | Facebook, Uber | Alibaba, GitLab |

voici une explication en points des raisons pour lesquelles nous avons choisi **React** :

1. **Amélioration de l'Expérience Utilisateur**
2. **DOM Virtuel et Optimisation des Performances**
3. **Composants Réutilisables et Réutilisabilité du Code**
4. **Processus de Développement Efficace**
5. **Soutien Fort de la Communauté**
6. **Applications Optimisées pour le Référencement (SEO)**
7. **Scalabilité et Flexibilité**
8. **Intégration Facile avec d'Autres Technologies**

#### Gestion de l'état :

**Redux:**

- Le plus connus et très utilisé par les grandes entrerpises
- Mais très lourd et complexe à apprendre

**Recoil**

- librairie de gestion d'état la plus simple

**useContext**

- Hook natif

#### Outils de développement

| Critère           | Vite.js                                    | CRA                                          |
| ----------------- | ------------------------------------------ | -------------------------------------------- |
| Performance       | Serveur rapide, ESM, build optimisé.       | Performant, mais Vite peut être plus rapide. |
| Serveur Dev       | HMR, mises à jour rapides.                 | HMR                                          |
| Support Framework | Vue.js , React , Svelt ...                 | Conçu spécifiquement pour React.             |
| Écosystème        | Plugins, extensions en croissance.         | Vaste écosystème React.                      |
| Flexibilité       | Architecture plugin, personnalisable.      | "Zero-config", avec possibilité d'éjection.  |
| Communauté        | Popularité croissante.                     | Bien établi, largement adopté.               |
| Facilité          | Facile à utiliser, configuration minimale. | Simple à utiliser, approche "zero-config".   |
| Maturité          | Nouveau mais stable.                       | Établi, avec historique de stabilité.        |

Nous avons choisi **Vite** pour son approche minimaliste, sa performance supérieure, sa flexibilité accrue et sa communauté croissante, ce qui correspondait parfaitement à nos besoins de développement.

#### CSS Framework

- **Bootstrap**: Framework front-end réactif développé par Twitter, connu pour sa flexibilité, sa facilité d'utilisation et sa large communauté. Il propose des composants et des modèles pré-conçus pour un démarrage rapide et inclut un système de grille et des plugins JavaScript. Idéal pour un démarrage rapide avec un support fiable.
- **Tailwind** : Framework CSS de première utilité offrant des classes utilitaires de bas niveau pour des designs personnalisés. Permet de créer des designs personnalisés avec un code minimal. Idéal pour ceux qui veulent un contrôle complet sur leurs designs et préfèrent une approche modulaire.
- **Material UI** : Framework front-end basé sur React, conforme aux directives de Google Material Design. Propose des composants personnalisables pour des designs modernes. Parfait pour les projets React qui nécessitent une cohérence avec les directives de Material Design.

Nous avons choisi **Tailwind** en raison de notre volonté de contrôler entièrement nos designs et de notre préférence pour une approche détaillée du développement front-end.

#### Backend Framework

| Framework Backend | Avantages                                               | Inconvénients                                                                      |
| ----------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Ruby on Rails     | Prototypage rapide, tests automatisés aisés             | Démarrage lent, moins adapté aux grandes applications                              |
| ExpressJS         | Construction rapide d'API, flexibilité, simplicité      | Messages d'erreur peu clairs, pas idéal pour des applications complexes ou lourdes |
| Laravel           | Cycle de développement rapide, bien documenté           | Problèmes d'exécution possibles, complexité accrue pour le routage inversé         |
| Spring            | Flexibilité, compatibilité avec Java, intégration aisée | Risque de déséquilibre, complexité d'apprentissage                                 |
| Django            | Sécurité, idéal pour MVP, flexibilité et évolutivité    | Architecture monolithique, performances potentiellement moins élevées              |

Nous avons choisi **Express.js** pour sa flexibilité exceptionnelle, sa simplicité, et sa robustesse dans la création d'API évolutives, soutenues par une communauté active et engagée. Son écosystème de packages étendu facilite le développement rapide et personnalisé, ce qui répond parfaitement à nos besoins

#### Base de données

**Sql**

- Modèle ACID
- Haute performance pour Jointure et requête complexe
- Intégrité importante
- Plus contraignant, necessite une conception de BDD

**NoSql**

- Grande flexibilité
- Simplicité d'utilisation et d'implémentation
- Pas de jointure native

Choix difficile mais on a choisi NoSQL car on avait besoin de cette flexibilité qu'offre cette technologie, en effet, on a seulement 2 mois pour développer twitter et on ne sait à quel point on ira loin dans le projet.
Une base répond parfaitement à ce critère, on pourra ajouter ou supprimer des attributs quand on le souhaite.

#### Base de données No SQL

**Firebase:**

- La base de donnée la plus simple à implémenter
- Seulement offre dans le cloud.
- Version gratuite limité (NB requête par jour)

**MongoDB:**

- La base de donnée NoSQL la plus populaire et documenté.
- Offre dans le cloud et localement.
- Version Cloud gratuite plus intéréssante (limitation bande passante)

**Cassandra:**

- Base de donnée très utile pour un scale horizontal.
- Utilisé pour une base de données très volumineuse.
