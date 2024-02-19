FROM node:21.0.0
WORKDIR /tmp/work
COPY ./package.json ./package-lock.json /tmp/work/

RUN npm install

COPY . .

CMD [ "npm","run","dev"]
EXPOSE 3000