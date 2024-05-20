## Structure du Projet

Le projet est divisé en trois parties principales :

- `Back/` : Contient le code du serveur backend, y compris les routes, les requêtes et les tests.
- `Front/` : Contient le code du front initialement prévu
- `Front2/` : Contient le code du front présenté en classe .

## Installation

1. Clonez le dépôt sur votre machine locale.

```sh
git clone https://github.com/masterDev95/TPProjetRedaction.git
```
2. Naviguez vers le dossier du projet.
```sh
cd TPProjetRedaction
```
3. Installez les dépendances nécessaires. (Nécessite [Node](https://nodejs.org/en/download) installé)
```sh
npm i
```

## Utilisation

Afin de pouvoir utiliser le front et le back simultanément sans problèmes de cors nous avons utilisé live-server.

Ouvez un terminal afin le lancer le server live dans le dossier root:

```sh
live-server
```
Votre navigateur devrait alors s'ouvrir il faudra choisir le dossier Front2 

Grace à la librairie Morgan les logs s'afficheront en direct avec les appels API dans le terminal.

## Gerer les livres

N'ayant pas mis en place dans le front des boutons pour intéragir directement il faudra utiliser postman ou des requêtes curl afin de gérer les livres:

> Recuperer les livres

```curl
curl --location 'http://0.0.0.0:3000/books'
```
> Ajouter un livre

```curl
curl --location 'http://0.0.0.0:3000/books' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'nom=NomLivre' \
--data-urlencode 'auteur=NomAuteur' \
--data-urlencode 'genre=Genre' \
--data-urlencode 'description=blabla' \
--data-urlencode 'quantity=3'
```
> Ajouter une quantité à un livre via son id 

```curl
curl --location --request PUT 'http://0.0.0.0:3000/books/increase' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'id=1' \
--data-urlencode 'quantityIncrement=2'
```

> Diminuer une quantité à un livre via son id 

```curl
curl --location --request PUT 'http://0.0.0.0:3000/books/decrease' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'id=1' \
--data-urlencode 'quantityDecrement=2'
```

## Tests

Avant de commencer dans Front2/tests/front.test.js il faudra modifier l'adresse du driver firefox par la votre afin de lancer Selenium:

```js
const firefoxDriverPath = 'chemin\\geckodriver.exe';
```

Assurez vous que le serveur est bien lancé.

Il est alors possible de lancer les tests unitaires avec la commande:

```sh
npm run test
```
