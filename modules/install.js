// @flow
import createSdk from './createSdk';

import type { SDKConfig } from './types';

export const install = (config: SDKConfig): void => {
  createSdk(config);
};
