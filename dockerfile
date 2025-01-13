FROM node:21-alpine3.19 

WORKDIR /urs/src/app

COPY package.json ./
COPY package-lock.json ./


RUN npm install

COPY . .

# /Este proyecto una prisma asi que este comando en necesario para este proyecto para que el ORM funcione
#RUN npx prisma generate se ejecuta desde el Script

#- este puerto es el que este contenedor va a exponer al mundo real, puede ser el 3000 lo podemos obviar y todo por que la comunicación sucede por el servidor de nats
EXPOSE 3001