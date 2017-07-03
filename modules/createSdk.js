// @flow
import renderFrame from './buttonFrame';
import renderProxy from './proxyFrame';
import parseConfig from './parseConfig';
import createPopup from './popup';
import parseApplication from './parseApplication';

import type { SDKConfig, SDKSecureConfig, Locale } from './types';

const supportedLocales: Array<Locale> = ['de', 'fr', 'en'];
const defaultOAuthHost = 'https://www.jobs.ch';
const defaultOAuthEndpoint = '/auth/oauth/';

const createSdk = (config: SDKConfig) => {
  const parsedConfig = parseConfig(config);
  const sdk = {
    injectButton: (): void => {
      renderProxy(parsedConfig.injectElement, parsedConfig.oAuthProxyPath);
      const popup = createPopup(
        {
          endpoint: parsedConfig.oAuthEndpoint,
        },
        application => parsedConfig.callback(parseApplication(application))
      );
      renderFrame(parsedConfig.injectElement, popup.open, {
        locale: parsedConfig.locale,
        color: parsedConfig.colorVariant,
        path: parsedConfig.oAuthButtonPath,
        accessKey: parsedConfig.accessKey,
      });
    },
  };

  return sdk;
};

export default createSdk;
