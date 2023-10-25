# TEFO-BANK-FE

tefo-bank-fe is a Front-End monorepo bootstrapped by [Turborepo](https://turbo.build/repo) and managed by [Yarn](https://yarnpkg.com/). The project contains applications and shared packages.

## Applications and packages

- Applications  
    - superadmin  
    - core-bank  
- Packages  
    - auth  
    - services  
    - ui  
    - utils  
    - Internal packages with common configuration for applications and external packages  

> Information about particular application or package can be found within its README.md and package.json files

## Getting Started
Make sure you do have all `.env` files created and filled according to `.env*_template` templates. More information about application `.env` files could be found in its README.md file.

## Available commands

`yarn lint` - Runs the linter for all packages and applications.  
`yarn format` - Formats all .ts, .tsx, .md and .mdx files using Prettier.  
`yarn dev` - Starts the development server for all applications.  
`yarn build` - Builds all packages and applications in the project.  
`yarn test` - Runs the tests for all packages and applications.  
`yarn test:watch` - Runs the tests in watch mode for all packages and applications.  
`yarn storybook:dev` - Starts the Storybook development server for UI package.  
`yarn storybook:build` - Builds the UI package Storybook.  
`yarn commit` - Runs [Commitizen](https://commitizen-tools.github.io/commitizen/) prompt.  

Command can also be run using yarn [workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/):

```bash
yarn workspace ui lint
```

or by [workspaces filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering):

```bash
yarn run lint --filter=ui
```

## Running Locally

First, install the dependencies if needed by:

```bash
yarn
```

Then run the development servers by:

```bash
yarn dev
```

After that visit localhost with appropriate port to see the result, e.g. [http://localhost:3000](http://localhost:3000)

## Running as a Docker Container

Build using new BuildKit engine:

```bash
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build
```

Start in detached mode:

```bash
docker-compose -f docker-compose.yml up -d
```
