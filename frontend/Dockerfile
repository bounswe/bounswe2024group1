FROM node:20 AS build
WORKDIR /app
RUN apt-get update && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

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
