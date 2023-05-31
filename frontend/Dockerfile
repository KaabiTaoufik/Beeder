FROM node:16-alpine as build
WORKDIR /app
COPY ./package*.json .
RUN npm install --production
COPY . .
RUN npm run build

FROM nginx:alpine as serve
COPY --from=build /app/dist/breedr /usr/share/nginx/html
