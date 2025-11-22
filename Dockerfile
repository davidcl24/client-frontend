FROM node:22.17.0

WORKDIR /code

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3333
CMD ["npm", "start"]
