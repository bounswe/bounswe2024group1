# Boun SWE 2024 Group1

This is the repository for Group1 of SWE course in Spring'24.

## Architecture

We have `./frontend`, `./backend` and `./mobile` directories that each contain the respective codebase for the frontend, backend and mobile applications.

Each codebase has its own readme file that explains how to get set up, run the application, and tests. In addition, it is recommended to use the docker-compose setup for development and local test of production builds. We utilize docker-compose to build and deploy the application as well.

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

## About the Repository

This repository will be updated throughout the semester.

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
