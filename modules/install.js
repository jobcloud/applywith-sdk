// @flow
import createSdk from './createSdk';

import type { SDKConfig } from './types';

export const install = (config: SDKConfig): void => {
  try {
    const sdk = createSdk(config);
    sdk.injectButton();
  } catch (e) {
    console.error(`
  JobCloud SDK:
    The SDK could not be initialized because of an occured error.
    ======
    ${e.message}
  `);
  }
};
