// @flow
import createSdk from './createSdk';

import type { SDKConfig } from './types';

export const injectButton = (config: SDKConfig): void => {
  try {
    const sdk = createSdk();
    return sdk.injectButton(config);
  } catch (e) {
    console.error(`
  JobCloud SDK:
    The SDK could not be initialized because of an occurred error.
    ======
    ${e.message}
  `);
  }
};

export const install = (config: SDKConfig) => {
  console.warn('JobCloudSdk.install is deprecated, please use injectButton instead. Use the same args.');
  return injectButton(config);
};
