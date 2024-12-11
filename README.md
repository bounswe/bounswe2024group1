# Programming Languages Forum
This is the repository for Group1 of SWE course in Fall'25.

## About the Repository

This is the repository for the Group1 of the Software Engineering course in Fall'25. The project is a web application that allows users to browse tags(programming paradigms, frameworks, languages, etc.), questions, and answers. The application has a frontend, backend and mobile application. The frontend is a web application that allows users to browse tags and questions about them. The backend is a REST API that serves the frontend and mobile application. The mobile application is a mobile application that allows users to browse tags and questions about them.

Please refer to [the Contribution Guide](./CONTRIBUTING.md) for more information on how to contribute to this project.

For common issues when developing, please check [Common Problems](#common-problems). Please refer to the Wiki for more information.

For deploying from scratch (for third-parties), please refer to the [Deployment From Scratch](#deployment-from-scratch) section.

## Contributors

- Mehmet Efe Akça
- Aslı Gök
- Atakan Yaşar
- Enes Başer
- Nazire Ata
- Çağatay Çolak
- Tarık Can Özden


### Projects

- [Frontend](./frontend/README.md)
- [Backend](./backend/README.md)
- Mobile

## Requirements

You should have Docker installed. Each project has its own requirements however only having Docker will allow you to develop the project and build images.

For deployment, you will need the [DigitalOcean CLI](https://docs.digitalocean.com/reference/doctl/how-to/install/) installed.

We also use Compose Watch for development. For that, your Docker version needs to be at least `2.20.0`.

## Architecture

We have `./frontend`, `./backend` and `./mobile` directories that each contain the respective codebase for the frontend, backend and mobile applications.

Each codebase has its own readme file that explains how to get set up, run the application, and tests. In addition, it is recommended to use the docker-compose setup for development and local test of production builds. We utilize docker-compose to build and deploy the application as well.

In addition, we have our OpenAPI specification at `swagger/openapi.yml`. A Swagger UI instance is available in our docker compose setup at `localhost:8081`. In the `mock.yml` file, we have a mock backend server that uses the API spec to generate fake responses.

### Docker Compose

All of the following docker commands are to be run from the root directory (not `frontend` or `backend`).

We have two docker compose setups:

1. (almost) identical to production. uses nginx to host the frontend at port 80, connect at `localhost:80`. Nginx reverse proxies `/api` to the backend at port 8080.

To run the production-like setup, run:

```bash
docker compose up -d
```

2. Development mode. uses the vite development server at port 5173 and exposes it at the same port. This setup will run a development setup that hot reloads the frontend code. The backend code is also run using `mvn spring-boot:run` which means it will reload on recompile. For further detail, refer to the backend README.

```bash
docker compose -f dev.yml up --watch
```

In addition, you can choose to use the mock API server which will create a mock API server using our API spec. This is useful for frontend development to continue when the backend is lagging behind or not available for some reason.

```bash
docker compose -f dev.yml -f mock.yml up --watch
```

> [!TIP]
> Note that the `-d` and `--watch` flags can't be combined. If you'd like to run the compose setup detached, you will have to separately run Compose watch using `docker compose -f dev.yml watch`. This is needed for hot-reloading on the frontend.

With the hot reloading setup, Vite dev server will hot reload all your changes, and the image will be rebuilt when `package.json` changes.

To take down the compose setups, you can do a Ctrl+C in the terminal for the development setup or do `docker compose down`. If you're running the development setup in detached mode, you can do `docker compose -f dev.yml down`.

### Development

For general development purposes, it is recommended to use the development docker compose setup mentioned above. Please refer to each project's repository for further detail on how to develop.

## Deployment

We use DigitalOcean's App Platform with the DigitalOcean Container Registry. We have a single registry that all images are pulled from. The app platform will automatically deploy the latest image from the registry when a push happens.

The deployment process is very simple. When following the sets, if two sets of commands are given, execute only the commands for the environment you're deploying to:

### Prerequisites

Make sure your DigitalOcean CLI has been [set up](https://docs.digitalocean.com/reference/doctl/how-to/install/) and you have logged in (`doctl auth init`).

Authorize with the registry (only need to do once):

```bash
doctl registry login
```

### Deploying the Application

> [!IMPORTANT]
> Note that you need to use `docker compose` and NOT `docker-compose`. Dashed version is the older version that uses Python and may have conflicts with your local Python environment. We also don't provide `version` which may cause an error with the old Compose V1. For more details, please check [the Docker documentation](https://docs.docker.com/compose/intro/history/).

When you're going to deploy only the application (no changes to infrastructre), you can follow the steps below:

1. Build images using the docker compose setup.

```bash
docker compose build
```

2. Tag images for the registry.

```bash
# for prod
docker tag bounswe2024group1-451-web:latest registry.digitalocean.com/programming-languages-2/web:latest
docker tag bounswe2024group1-451-backend:latest registry.digitalocean.com/programming-languages-2/backend:latest

# for staging
docker tag bounswe2024group1-451-web:latest registry.digitalocean.com/programming-languages-2/web:staging
docker tag bounswe2024group1-451-backend:latest registry.digitalocean.com/programming-languages-2/backend:staging
```

3. Push images to the registry.

```bash
# for prod
docker push registry.digitalocean.com/programming-languages-2/web:latest
docker push registry.digitalocean.com/programming-languages-2/backend:latest

# for staging
docker push registry.digitalocean.com/programming-languages-2/web:staging
docker push registry.digitalocean.com/programming-languages-2/backend:staging
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

### Deployment From Scratch

This part of the documentation is for a third party to deploy the application from scratch. This is not necessary for the team members working on the project.

Almost all of our infrastructure is managed by DigitalOcean and declared in the app.yaml files. However, we have two things that must be manually set up:

1. DigitalOcean Container Registry
2. DB Containers

#### DigitalOcean Container Registry

To setup a new registry for this application, follow the steps below:

1. Create a new registry in the DigitalOcean dashboard.
2. Make sure it has enough space. (At least 1-2GB needed for staging and prod)
3. (IMPORTANT) Change the repository references to be the new registry in the app.yaml files.
4. (IMPORTANT) When deploying, change the registry references in the commands with the new registry. Our registry is called `programming-languages` so rename that in the commands.

#### DB Containers

We use a mysql:latest container deployed on a Droplet for our database. To set this up, run the container with environment variables and a named volume for persistence. Make sure you use network host mode to listen on the public internet.

Replace the variables with your secrets, make sure they're consistent with the declared environment variables in the app.yaml file.

```bash
docker run -d --name programming-languages-db --network host -e MYSQL_ROOT_PASSWORD=<root-password> -e MYSQL_DATABASE=programminglanguages -e MYSQL_USER=semantic_browse -e MYSQL_PASSWORD=<user-password> -v programming-languages-db:/var/lib/mysql mysql:latest
```

Expose this container to the internet using DigitalOcean's firewall rules.

You can set up two dbs for staging and prod, that's the setup we have.

#### Deploying the Application

After you complete the previous two steps, you can use `doctl` to create a new app. Make sure you've updated the app spec files with the new registry references.

> [!IMPORTANT]
> You must not have any encrypted secrets in the app spec files on first creation. Please remove them when deploying our app.yaml files for the first time (i.e. `doctl apps create`)

```bash
# for prod
doctl apps create --spec .do/app-prod.yml

# for staging
doctl apps create --spec .do/app-staging.yml
```

This will create the app and deploy it to the DigitalOcean App Platform. You can now follow the steps above in the normal deployment process to push images and deploy your first instance.

#### Common Problems

##### Compose fails at "yarn install --immutable"

- If the error has "lockfile would have been modified by this install, which is explicitly forbidden".

The `yarn.lock` file is forbidden from changing within the Docker build. This ensures that the same packages are used locally as the ones used inside the Docker image. Solution: do a `yarn install` in the `frontend/` folder.

##### "port is already allocated"

You have something running that is listening on one of the ports of our services. Common reasons include:

- You have the production or the development compose setup running and are trying to run the other one: Check what is running using `docker ps`, if you see other containers that are binding a required port, take them down using the appropriate docker compose command.
- You have another application that is binding a required port. For now, we're binding `8081`, `8080` and `80` for the production setup; and `8081` and `5173` for the development setup.

##### "no such file or directory"

Make sure you run all docker compose commands in the root folder. Make sure you run all `yarn` commands in the `frontend` folder.
