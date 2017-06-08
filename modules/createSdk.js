// @flow
import invariant from 'invariant';

import type { SDKConfig } from './types';

const supportedLocales = ['de', 'fr', 'en'];
const defaultOAuthHost = 'https://www.jobs.ch';
const defaultOAuthEndpoint = '/auth/oauth/';

const createSdk = (config: SDKConfig) => {
  getOAuthEndpoint: (): string => {
    if (config.oAuthEndpoint) {
      return config.oAuthEndpoint;
    }

    if (config.locale === undefined || supportedLocales.indexOf(config.locale) === -1) {
      invariant(`JobCloudSDK: Locale "${config.locale || 'undefined'}" is not supported.`);
    }
    return `${defaultOAuthHost}/${config.locale || 'de'}/${defaultOAuthEndpoint}`;
  };

  const sdk = {
    // @TODO Add SDK Methods
  };

  return sdk;
};

export default createSdk;
