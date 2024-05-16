FROM node:18

# Creation du directory de l'application
WORKDIR /usr/src/app

# Installation des dependences
# On utilise un wildcard (*) pour prendre le package.json et package-lock.json 

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "app.js" ]