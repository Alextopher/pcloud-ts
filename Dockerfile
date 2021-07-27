### Build backend server ###
FROM node:14-alpine as backend

# Create app directory
WORKDIR /srv/app

# Install app build dependencies
COPY backend/package*.json ./
RUN npm install

# Compile project
COPY backend/src src
COPY backend/tsconfig.json ./
RUN npm run build


### Compile vuejs project ###
FROM node:14-alpine as frontend

# Create app directory
WORKDIR /srv/app

# Install app build dependencies
COPY frontend/package*.json ./
RUN npm install

COPY frontend/src src
COPY frontend/public public

RUN npm run build

### Production ###
FROM node:14-alpine

# Add sqlite package
RUN apk add sqlite

# Create app directory
WORKDIR /srv/app

# Install production dependencies
COPY backend/package*.json ./
RUN npm install --only=prod

COPY --from=backend /srv/app/dist dist
COPY --from=frontend /srv/app/dist static

# Run server
CMD [ "npm", "start" ]