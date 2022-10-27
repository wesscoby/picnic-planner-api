# Picnic Planner API
An application which helps in choosing a date and location, based on optimal weather conditions, for hosting picnics.

Project was bootstrapped with [Nest](https://github.com/nestjs/nest) - a progressive Node.js framework for building efficient and scalable server-side applications.

## Installation

```bash
$ yarn
```

## Setup
- Create `.env` and `.env.test` environment variable files in the root of the project
- Copy over the environment variables from the `*.example` environment files into their respective `.env*` files
- Head over to [OpenCage](https://opencagedata.com/), sign up for a free account and obtain an API key
  - Add the API key as value for `GEOCODER_API_KEY` variable in both `.env` and `.env.test` files.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```
While the application is running, open your browser and navigate to http://localhost:5000/docs. You should see the Swagger UI.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage (unit)
$ npm run test:cov

# test coverage (e2e)
$ npm run test:e2e:cov
```
