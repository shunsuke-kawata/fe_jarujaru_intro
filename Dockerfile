FROM node:21.0.0-slim
WORKDIR /tmp/work
RUN rm -rf node_modules
COPY ./package.json ./package-lock.json /tmp/work/
RUN npm upgrade -g npm
RUN npm install

COPY . .

CMD [ "npm","run","dev"]
EXPOSE 3033