// @flow
import invariant from 'invariant';
import renderFrame from './buttonFrame';
import parseConfig from './parseConfig';

import type { SDKConfig, SDKSecureConfig, Locale } from './types';

const supportedLocales: Array<Locale> = ['de', 'fr', 'en'];
const defaultOAuthHost = 'https://www.jobs.ch';
const defaultOAuthEndpoint = '/auth/oauth/';

const createSdk = (config: SDKConfig) => {
  const parsedConfig = parseConfig(config);

  const sdk = {
    injectButton: (): void => {
      renderFrame(
        parsedConfig.injectElement,
        () => {
          console.log('CLICK REGISTERED! WOO!');
        },
        {
          locale: parsedConfig.locale,
          color: parsedConfig.colorVariant,
          path: parsedConfig.oAuthButtonPath,
          accessKey: parsedConfig.accessKey,
        },
      );
    },
  };

  return sdk;
};

export default createSdk;
