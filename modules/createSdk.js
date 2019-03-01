// @flow
import renderFrame from './buttonFrame';
import renderProxy from './proxyFrame';
import parseConfig from './parseConfig';
import createPopup from './popup';
import parseApplication from './parseApplication';
import uuid from 'uuid';

import type { SDKConfig, SDKSecureConfig, Locale } from './types';

const supportedLocales: Array<Locale> = ['de', 'fr', 'en'];
const defaultOAuthHost = 'https://www.jobs.ch';
const defaultOAuthEndpoint = '/auth/oauth/';

const createSdk = () => {
  const sdk = {
    injectButton: (config: SDKConfig): void => {
      const parsedConfig = parseConfig(config);
      const senderId = uuid.v4();
      renderProxy(parsedConfig.injectElement, parsedConfig.oAuthProxyPath);
      const popup = createPopup(
        {
          endpoint: parsedConfig.oAuthEndpoint,
        },
        application => parsedConfig.callback(parseApplication(application))
      );
      renderFrame(parsedConfig.injectElement, popup.open, {
        senderId: senderId,
        locale: parsedConfig.locale,
        color: parsedConfig.colorVariant,
        path: parsedConfig.oAuthButtonPath,
        accessKey: parsedConfig.accessKey,
        tenant: parsedConfig.tenant,
      });
    },
  };

  return sdk;
};

export default createSdk;
