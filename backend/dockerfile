FROM node:14-alpine

# Add sqlite package
RUN apk add sqlite

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Compile project
COPY . .
RUN npm run build

CMD [ "node", "dist/index.js" ]