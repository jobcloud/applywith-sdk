# JobCloud ApplyWith SDK [![npm package][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/@jobcloud/applywith-sdk.svg?style=flat-square
[npm]: https://www.npmjs.org/package/@jobcloud/applywith-sdk

[`@jobcloud/applywith-sdk`](https://www.npmjs.com/package/@jobcloud/applywith-sdk) is a JavaScript library that lets you easily integrate JobCloud's "Apply with jobs.ch" button on your application form or ATS integration. The feature is mobile-friendly and allows job seekers to apply faster with their jobs.ch profile, including their CV and uploaded documents.

In order to use it in production, you need an access key. Please contact [applywith@jobcloud.ch](mailto:applywith@jobcloud.ch) alongside with a logo image (400x400px) and the domain you want to run it on.

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

`@jobcloud/applywith-sdk` provides the simple `install` method that takes a few options to create all that is needed for the SDK to work. An implementation example can be found [here](https://github.com/jobcloud/applywith-sdk/blob/develop/example/index.html).

Basic usage looks like this (using the UMD build as example):

```JavaScript
window.JobCloudSDK.install(options);
```

The options that the `install` method takes, along with its default values, are:

```javascript
install({
  accessKey: 'unique key',  // The key provided by JobCloud to identify your app.
                            // Please contact applywith@jobcloud.ch to get a personal key.
                            // Define any string when using the 'test' environment.

  env: 'prod',              // Setting 'test' here boots the SDK in test mode which
                            // can be used to test the implementation without hitting
                            // the actual JobCloud OAuth service. Also a genuine accessKey
                            // is not needed.

  injectElement: undefined, // A query selector string that references the HTML
                            // element in which the ApplyWith button will be rendered.
                            // Examples would be '#elementId' or '.elementClass'.
                            // Make sure that the injectElement is available on the DOM
                            // when you call `install`.

  locale: 'de',             // Locale. Supported locales are 'de', 'fr' or 'en'.

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

### Handling documents

The SDK will provide the documents a user has attached to his or her profile as base64 encoded strings together with a file name and the mime type. In order to save them on your server you'll need to decode them first. This strongly depends on your used server stack. An example on how to do this in an `nodejs` environment can be found in the [example folder](https://github.com/jobcloud/applywith-sdk/tree/develop/example).

There is currently no way to attach these files to the form in a way that would mimic a file that was selected by the user in the browser.

## Running the example

1. Clone this project and `cd` into the directory.
2. `npm install` to fetch dependencies.
3. `npm run example` to run the example.
4. Open [`localhost:8082/index.html`](http://localhost:8082/index.html), press the applyWith button and send the application. The attachments are now uploaded and saved to `example/uploads`.

It's important to serve the page containing the ApplyWith button through a webserver. Otherwise the authentication will fail.
In that case the browser console will show the following error:
* Firefox
    ```
    SyntaxError: An invalid or illegal string was specified
    oauth-test-button.html:39
    ```
* Chrome
    ```
    Failed to execute 'postMessage' on 'DOMWindow': The target origin
    provided ('file://') does not match the recipient window's origin ('null').
    oauth-test-button.html?color=blue&accessKey=my-prod-key&parent=file%3A%2F%2F:39
    ```

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
