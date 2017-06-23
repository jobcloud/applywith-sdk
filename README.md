# JobCloud ApplyWith SDK (WIP)

## Contribution Quickstart

1. Install dependencies with `yarn`.
2. The command `yarn serve` will spin up a simple http server that acts as a mocked oAuth endpoint that is needed for development. This server removes the need to develop against the live JobCloud oAuth service endpoint and needs to run in the background.
3. `yarn start` will start the development server that prints out the url that can be used to access a test page (usually `localhost:8080`).

#### List of useful Commands

- `yarn build` to build production code (UMD and ES modules).
- `yarn test` to run unit tests.
- `yarn lint` to run eslint and flowtype check.
- `yarn release` to cut a release.
- `yarn serve` to spin up a mocked oAuth service endpoint.
- `yarn start` to start the development server.
