# Twitter Retro

### Introduction

#### Plan

### 1/ Collaboration en équipe

- Github Repo App / API
- Github Project pour gestion timeline et fonctionnalités
- Issues quand bug
- Réunion chaque semaine objectifs
- Merge réguliers

### 2/ Fonctionnalitées Majeures

- Feed Personnalisées en fonction de likes, retweet et abonnement.
- Recherche d'utilisateurs, des derniers tweets, des tweets les plus populaire.
- Tendances en fonction du nombres de posts en 24h
- Messageries sécurisées.
- Gestions de compte avec info comptes, likes, retweets, signets et posts.

### 3/ Responsive

- Gestion en fonction de breakpoint personalisées.
- Layout crée en début de projet pour que l'app responsive dès le départ
- Modals responsive.
- Exemples.

### 4/ Optimization

- Certains components ont besoin d'optimisation
- Liste infinis pour éviter le resfresh de state massif (mémoire cache)
- Limiter les appels de requêtes vers l'api pour ne pas sucharger si bcp utilisateurs (exemple recherche)

### 5/ Serveur

- Serveur VPS distant (clouds) ubuntu 22.02
- Gestion personnalisées de Nginx.
- Pipeline CI/CD github pour simplifier déploiement de l'app.
- Gestion de processsus.
- Alerte site down.

### 6/ Sécurité

// Implémentation

- Token auth
- Protected routes
- Serveur ne renvoi pas tout
- Gestion des erreurs

// Attaques

- XSS
- DDOS
- Injection SQL
- Nmap
- Burpsuit

### 7/ Amélioration

- Meilleurs Feeds (métier à part entière) avec intelligence artificel...
- Ajout de vidéos, plusierus images dans les posts,
- Plus de fonctionnalités comme Listes, Notifications..
- Gestion du nombre (serveur horizontaux, plus d'optimisation, anti-bot) Base de donnée Cassandra , MongoDB clouds...
- Rendre twitter rentable, icon bleu validation payant, API payante...
- Meilleure visibilité site web.
