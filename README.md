# Gestionnaire de Budget

Ce projet est une application web simple permettant de gérer votre budget personnel. Il offre des fonctionnalités pour ajouter des transactions, visualiser un résumé financier, appliquer des filtres, et afficher des données sous forme de tableau et de graphiques.

## Fonctionnalités

- **Ajout de transactions** :
  - Ajouter des revenus et des dépenses avec un montant, une catégorie et une date.
- **Résumé financier** :

  - Affiche la balance totale, le total des revenus et le total des dépenses.

- **Filtres** :

  - Filtrer les transactions par type (revenus/dépenses), par catégorie ou par plage de dates.

- **Tableau des transactions** :

  - Visualisation des transactions ajoutées avec des options pour modifier ou supprimer.

- **Graphique par catégorie** :
  - Visualisation des dépenses ou revenus par catégorie à l'aide de la bibliothèque Chart.js.

## Structure du projet

### Fichiers principaux

- `index.html` : Contient la structure HTML de l'application.
- `assets/css/global.css` : Contient les styles globaux de l'application.
- `assets/css/responsive.css` : Contient les styles pour une expérience responsive.
- `assets/js/main.js` : Contient la logique JavaScript pour la gestion des transactions et des graphiques.

## Dépendances

- [Chart.js](https://www.chartjs.org/) : Utilisé pour afficher les graphiques.

# Gestionnaire de Budget - Fonctionnalités JavaScript

Ce fichier contient la logique JavaScript pour le projet "Gestionnaire de Budget". Il gère l'ajout, la suppression, la visualisation et le filtrage des transactions, ainsi que l'affichage des données dans un graphique.

## Fonctionnalités principales

1. **Gestion des transactions** :

   - Ajout de revenus et de dépenses.
   - Suppression des transactions.
   - Stockage des transactions dans `localStorage` pour conserver les données après un rechargement de la page.

2. **Résumé des finances** :

   - Calcul et affichage de la balance totale, des revenus totaux et des dépenses totales.

3. **Filtres dynamiques** :

   - Filtrage par type de transaction (revenus/dépenses), catégorie et plage de dates.

4. **Visualisation des données** :
   - Affichage des transactions dans un tableau interactif.
   - Création d'un graphique (barres) montrant la répartition des revenus et dépenses par catégorie, grâce à la bibliothèque Chart.js.

## Structure du Code

### Variables principales

- `transactions` : Tableau contenant toutes les transactions (rechargé à partir de `localStorage`).
- `chartInstance` : Instance du graphique Chart.js.
- Éléments DOM :
  - Formulaire d'ajout de transaction (`transactionForm`).
  - Tableau des transactions (`transactionsTable`).
  - Résumé des finances (balance, revenus, dépenses).
  - Filtres (type, catégorie, dates).

### Fonctions clés

#### `updateDisplay()`

- Met à jour l'affichage global (tableau des transactions, totaux, graphique).
- Applique les filtres actifs pour afficher uniquement les transactions correspondantes.

#### `deleteTransaction(index)`

- Supprime une transaction à l'index donné.
- Met à jour les données dans `localStorage` et réaffiche les informations.

#### `calculateCategoryData()`

- Calcule les totaux par catégorie pour les revenus et les dépenses.
- Utilisé pour générer les données du graphique.

#### `updateChart()`

- Initialise ou met à jour le graphique basé sur les données catégorisées.

#### Événements

- Gestion des événements pour :
  - Soumission du formulaire d'ajout de transaction.
  - Modification des filtres, qui met automatiquement à jour l'affichage.

## Dépendances

- **[Chart.js](https://www.chartjs.org/)** : Utilisé pour créer des graphiques interactifs.
- **localStorage** : Pour stocker les données de manière persistante sur le navigateur.
