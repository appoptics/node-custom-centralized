FROM node

WORKDIR /usr/src/work
COPY . .

RUN npm install
