# JobCloud ApplyWith SDK [![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/@jobcloud/applywith-sdk.svg?style=flat-square
[npm]: https://www.npmjs.org/package/@jobcloud/applywith-sdk

[`@jobcloud/applywith-sdk`](https://www.npmjs.com/package/@jobcloud/applywith-sdk) is a JavaScript library that lets you easily integrate a way for

## Installation

Using [npm](https://www.npmjs.com/):

    $ npm install --save @jobcloud/applywith-sdk

Then with a module bundler like [webpack](https://webpack.github.io/), use as you would anything else:

```js
// using ES6 modules
import { install } from '@jobcloud/applywith-sdk';

// using CommonJS modules
var install = require('@jobcloud/applywith-sdk').install
```

The UMD build is also available on [unpkg](https://unpkg.com):

```html
<script src="https://unpkg.com/@jobcloud/applywith-sdk/umd/jobcloud-sdk.min.js"></script>
```

You can find the library on `window.JobCloudSDK`.

## Usage

`@jobcloud/applywith-sdk` provides the simple `install` method that takes a few options to create all that is needed for the SDK to work. An implementation example can be found [here](https://github.com/jobcloud/applywith-sdk/blob/develop/example.html).

Basic usage looks like this (using the UMD build as example):

```JavaScript
window.JobCloudSDK.install(options);
```

The options that the `install` method takes, along with its default values, are:

```javascript
install({
  accessKey: undefined,     // The key provided by JobCloud to identify your app.
                            // Please contact service@jobs.ch

  locale: 'de',             // Locale. Supported locales are 'de', 'fr' or 'en'.

  injectElement: undefined, // A query selector string that references the HTML
                            // element in which the ApplyWith button will be rendered.
                            // Examples would be '#elementId' or '.elementClass'.

  env: 'prod'               // Setting 'test' here boots the SDK in test mode which
                            // can be used to test the implementation without hitting
                            // the actual JobCloud oAuth service. Also a genuine accessKey
                            // is not needed.

  callback: (data) => {}    // The callback function that gets called when the process was
                            // successful to provide the applicants data. Use this to
                            // map the data to the application form.
})
```

The `callback` option gets called on success with the following data structure:

```
{
  email: string,
  gender: 'M' | 'F',
  firstName?: string,
  lastName?: string,
  phone?: string,
  zipCode?: string,
  city?: string,
  country?: string,
  cv?: {
    mimeType: string,
    binary: string,
  },
  documents?: Array<{
    mimeType: string,
    binary: string,
    fileName: string,
  }>,
}
```

Please also check out the [simple example](https://github.com/jobcloud/applywith-sdk/blob/develop/example.html).

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
