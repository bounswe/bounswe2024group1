# Semantic Browse for Cuisines

This is the repository for Group1 of SWE course in Spring'24.

## About the Repository

This is the repository for the Group1 of the Software Engineering course in Spring'24. The project is a web application that allows users to browse cuisines, dishes, and recipes. The application has a frontend, backend and mobile application. The frontend is a web application that allows users to browse cuisines and recipes. The backend is a REST API that serves the frontend and mobile application. The mobile application is a mobile application that allows users to browse cuisines and recipes.

Please refer to the Wiki for more information.

## Contributors

- Mehmet Efe Akça
- Aslı Gök
- Atakan Yaşar
- Boray Kasap
- Enes Başer
- Nazire Ata
- Yüksel Eren Şen
- Ufuk Altunbulak
- Çağatay Çolak
- Yiğit Memceroktay

### Projects

- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)
- Mobile

## Requirements

You should have Docker installed. Each project has its own requirements however only having Docker will allow you to develop the project and build images.

For deployment, you will need the [DigitalOcean CLI](https://docs.digitalocean.com/reference/doctl/how-to/install/) installed.

## Architecture

We have `./frontend`, `./backend` and `./mobile` directories that each contain the respective codebase for the frontend, backend and mobile applications.

Each codebase has its own readme file that explains how to get set up, run the application, and tests. In addition, it is recommended to use the docker-compose setup for development and local test of production builds. We utilize docker-compose to build and deploy the application as well.

In addition, we have our OpenAPI specification at `swagger/openapi.yml`. A Swagger UI instance is available in our docker compose setup at `localhost:8081`.

## Docker Compose

We have two docker compose setups:

1. (almost) identical to production. uses nginx to host the frontend at port 80, connect at `localhost:80`. Nginx reverse proxies `/api` to the backend at port 8080.

To run the production-like setup, run:

```bash
docker-compose up -d
```

2. Development mode. uses the vite development server at port 5173 and exposes it at the same port. This setup will run a development setup that hot reloads the frontend code. The backend code is also run using `mvn spring-boot:run` which means it will reload on recompile. For further detail, refer to the backend README.

```bash
docker-compose -f docker-compose.dev.yml up -d
```

With the hot reloading setup, Vite dev server will hot reload all your changes, however you'll need to restart if you make any changes to package.json as the `node_modules` are fetched as part of the start command.

## Development

For general development purposes, it is recommended to use the development docker compose setup mentioned above. Please refer to each project's repository for further detail on how to develop.

## Deployment

We use DigitalOcean's App Platform with the DigitalOcean Container Registry. We have a single registry that all images are pulled from. The app platformwill automatically deploy the latest image from the registry when a push happens.

The deployment process is very simple. When following the sets, if two sets of commands are given, execute only the commands for the environment you're deploying to:

### Prerequisites

Make sure your DigitalOcean CLI has been [set up](https://docs.digitalocean.com/reference/doctl/how-to/install/) and you have logged in (`doctl auth init`).

Authorize with the registry (only need to do once):

```bash
doctl registry login
```

### Deploying the Application

When you're going to deploy only the application (no changes to infrastructre), you can follow the steps below:

1. Build images using the docker-compose setup.

```bash
docker-compose build
```

2. Tag images for the registry (assuming your project folder is `bounswe2024group1`).

```bash
# for prod
docker tag bounswe2024group1-web:latest registry.digitalocean.com/bounswe2024group1/web:latest
docker tag bounswe2024group1-backend:latest registry.digitalocean.com/bounswe2024group1/backend:latest

# for staging
docker tag bounswe2024group1-web:latest registry.digitalocean.com/bounswe2024group1/web-staging:latest
docker tag bounswe2024group1-web:latest registry.digitalocean.com/bounswe2024group1/backend-staging:latest
```

3. Push images to the registry.

```bash
# for prod
docker push registry.digitalocean.com/bounswe2024group1/web:latest
docker push registry.digitalocean.com/bounswe2024group1/backend:latest

# for staging
docker push registry.digitalocean.com/bounswe2024group1/web-staging:latest
docker push registry.digitalocean.com/bounswe2024group1/backend-staging:latest
```

This will trigger a deployment on the DigitalOcean backend.

4. Make sure your deployment is successful by checking the logs.

### Deploying the Infrastructure

#### GUI Changes

When you have made changes to the infrastructure, make sure you keep `.do/app-{env}.yml` up to date. If you've used the GUI, pull spec changes using `doctl`:

```bash
# for prod
doctl apps spec get <app-id> > .do/app-prod.yml

# for staging
doctl apps spec get <app-id> > .do/app-staging.yml
```

To get `<app-id>` you can use `doctl apps list` and find the app id for the environment you're deploying to.

#### App Spec Changes

When you've changed the app spec, you can use `doctl apps update` to update the app. Make sure you've updated the spec file before running the command.

```bash
# for prod
doctl apps update --spec .do/app-prod.yml

# for staging
doctl apps update --spec .do/app-staging.yml
```

It is paramount that staging and prod are kept in sync. If you've made changes to the staging environment, make sure to update the prod environment as well.
