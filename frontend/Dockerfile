FROM node:20-alpine AS build
WORKDIR /app

# cache package installs
COPY .yarnrc.yml yarn.lock package.json /app/
RUN corepack enable
RUN yarn install --immutable

COPY . /app
RUN yarn build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
