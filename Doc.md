# Utilisation et lancement des tests 🎮🧪

## Utilisation 🎮

Actuellement le projet se lance toujours via le fichier **docker-compose.yml** en **up**.

Je recommande de lancer par la suite, la commande de migration de la bdd manuellement et de s'assurer qu'il n'y a aucune migrations de retard et que la bdd est bien à jour.

La commande à lancer est celle ci :

    docker exec -it techtest-nest-1 npm run typeorm:migration:run

## Tests🧪

Pour les tests e2e de la partie front j'ai ajouté une commande npm à lancer:

    npm run test:e2e

Commande à lancer **depuis le repertoir testtech/frontend**.

Une variable d'environnement est définie dans **testtech/frontend/.env.dist**.
Il s'agit de _FRONTEND_TEST_PORT_ qu'il faudra placer dans un .env au meme niveau.

Cette variable permet de définir le port d'écoute pour Angular bien qu'en réalité dans ce contexte d'utilisation c'était très optionnel.

Concernant les tests e2e de l'api pour la partie back voici la commande :

`npm run test:e2e` (pour faire dans l'originalité 😆).

Commande à lancer **depuis le repertoir testtech/api**.
⚠️ Par défaut la bdd de test est mappé sur le 5433 en dure dans le compose.yml.
