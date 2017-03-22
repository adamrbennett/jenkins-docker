FROM node:alpine

# install app and start
ENV APP_PORT 80

EXPOSE 80 443

RUN mkdir -p /usr/src/app

COPY ./main /usr/src/app/main
COPY ./index.js /usr/src/app
COPY ./index.html /usr/src/app
COPY ./package.json /usr/src/app

WORKDIR "/usr/src/app"

RUN npm -q install --production

CMD ["npm", "start"]
