FROM node:18-alpine AS build
WORKDIR /app

# cache package installs
COPY yarn.lock package.json /app/
RUN yarn install

COPY . /app
RUN yarn build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
