// @flow
import getHosts from './hosts';

import type { SDKConfig, SDKSecureConfig, Locale, ApplyButtonColor, Tenant } from './types';

const supportedLocales: { [Tenant]: Array<Locale> } = { 'jobs.ch': ['de', 'fr', 'en'], 'jobup.ch': ['de', 'fr', 'en'] };
const defaultLocales: { [Tenant]: Locale } = { 'jobs.ch': 'de', 'jobup.ch': 'fr' };
const supportedColors: Array<ApplyButtonColor> = ['white', 'blue'];
const supportedTenants: Array<Tenant> = ['jobs.ch', 'jobup.ch'];

export default (config: SDKConfig): SDKSecureConfig => {
  if (typeof config !== 'object' || config === null) {
    throw new Error('Missing SDK config.');
  }
  if (typeof config.accessKey !== 'string') {
    throw new Error('Missing "accessKey" config option.');
  }
  const env = config.env || 'prod';

  const parsedConfig: Object = {
    accessKey: config.accessKey,
    callback: config.callback ? config.callback : () => {},
  };

  if (config.colorVariant && supportedColors.find(color => color === config.colorVariant)) {
    parsedConfig.colorVariant = config.colorVariant;
  } else if (config.colorVariant) {
    console.warn(`JobCloudSDK: Color "${config.colorVariant}" is not supported. Falling back to "blue".`);
    parsedConfig.colorVariant = 'blue';
  } else {
    parsedConfig.colorVariant = 'blue';
  }

  if (config.tenant && supportedTenants.find(tenant => tenant === config.tenant)) {
    parsedConfig.tenant = config.tenant;
  } else if (config.tenant) {
    console.warn(`JobCloudSDK: Tenant "${config.tenant}" is not supported. Falling back to "jobs.ch".`);
    parsedConfig.tenant = 'jobs.ch';
  } else {
    parsedConfig.tenant = 'jobs.ch';
  }

  if (config.locale && supportedLocales[config.tenant].find(code => code === config.locale)) {
    parsedConfig.locale = config.locale;
  } else if (config.locale) {
    console.warn(
      `JobCloudSDK: Locale "${config.locale}" is not supported. Falling back to "${defaultLocales[config.tenant]}".`
    );
    parsedConfig.locale = defaultLocales[config.tenant];
  } else {
    console.warn(`JobCloudSDK: Locale not configured. Falling back to "${defaultLocales[config.tenant]}".`);
    parsedConfig.locale = defaultLocales[config.tenant];
  }

  const hosts = getHosts(parsedConfig.tenant);

  parsedConfig.useFileRefs = !!config.useFileRefs;

  const endpointSearch =
    `?client_id=${parsedConfig.accessKey}&` +
    `redirect_uri=${encodeURIComponent(window.location.origin)}&` +
    'approval_prompt=auto&response_type=code&' +
    'scopes=user_cv_basic_data+user_cv_documents+user_basic_information&' +
    `state=default_state&use_message=1&slim=1&use_file_refs=${parsedConfig.useFileRefs ? 1 : 0}`;

  parsedConfig.oAuthEndpoint =
    typeof config.oAuthEndpoint === 'string'
      ? `${config.oAuthEndpoint}${endpointSearch}`
      : `${hosts[env].getOAuthPath(parsedConfig.locale)}${endpointSearch}`;

  parsedConfig.oAuthButtonPath =
    typeof config.oAuthButtonPath === 'string' ? config.oAuthButtonPath : hosts[env].getButtonPath(parsedConfig.locale);

  parsedConfig.oAuthProxyPath =
    typeof config.oAuthProxyPath === 'string' ? config.oAuthProxyPath : hosts[env].getProxyPath(parsedConfig.locale);

  const originalSelector = (parsedConfig.injectElement = config.injectElement);
  if (parsedConfig && typeof parsedConfig.injectElement === 'string') {
    parsedConfig.injectElement = document.querySelector(parsedConfig.injectElement);
  }
  if (
    typeof parsedConfig.injectElement !== 'object' ||
    parsedConfig.injectElement === null ||
    !('appendChild' in parsedConfig.injectElement)
  ) {
    throw new Error(
      `Invalid or missing "injectElement" config option. The element "${
        typeof originalSelector === 'string' ? originalSelector : ''
      }" could not be found on the page or is undefined.`
    );
  }
  return parsedConfig;
};
