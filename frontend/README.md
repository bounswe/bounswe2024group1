# Semantic Browse for Cuisines Frontend

This project uses the Vite template for React with TypeScript.

Before you get started, you'll need to have Node.js (v18.20.1) installed and you'll need to enable corepack:

```bash
corepack enable
```

After that, you can install packages using

```bash
yarn install
```

## Development Server

You can run the development server locally using:

```bash
yarn dev
```

## Docker

You can find the Dockerfiles as `Dockerfile` and `Dockerfile.dev` respectively. Please refer to [the main README](../README.md) for more information on the Docker setup.

## Linting and Formatting

We use Prettier and ESLint for these purposes. You can run them using:

```bash
yarn lint
yarn format
```

## Tests

We use Vitest for testing. It's a library similar to Jest that uses Vite in its backend. This allows consistency across true build environments and the test environment.

Start the test runner using:

```bash
yarn test
```

Run tests once:

```bash
yarn test run
```

## Hooks

We have husky and lint-staged set up such that all staged files are linted and formatted and tests are run before committing.

You can skip these checks using `--no-verify` (NOT RECOMMENDED).

## Code

We use React Router, TailwindCSS, and shadcn-ui.

### Components

We use shadcn's `shadcn-ui` component library. It will add components to our source which we can customize for our own use. Refer to [the docs](https://ui.shadcn.com/docs) for more information.
