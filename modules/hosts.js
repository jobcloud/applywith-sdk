// @flow
import type { Locale, Tenant } from './types';

export default (tenant: Tenant) => {
  const prodHost = tenant === 'jobs_ch' ? 'https://www.jobs.ch' : 'https://www.jobup.ch';
  const localHost = tenant === 'jobs_ch' ? 'https://jobs.local' : 'https://jobup.unity';
  return {
    prod: {
      getOAuthPath: (locale: Locale) => `${prodHost}/${locale}/auth/oauth/`,
      getButtonPath: (locale: Locale) => `${prodHost}/${locale}/auth/apply-with-button/`,
      getProxyPath: (locale: Locale) => `${prodHost}/public/support/oauth-xdomain-proxy.html`,
    },
    test: {
      getOAuthPath: (locale: Locale) => `${prodHost}/public/support/oauth-test-login.html`,
      getButtonPath: (locale: Locale) => `${prodHost}/public/support/oauth-test-button.html`,
      getProxyPath: (locale: Locale) => `${prodHost}/public/support/oauth-xdomain-proxy.html`,
    },
    local: {
      getOAuthPath: (locale: Locale) => `${localHost}/${locale}/auth/oauth/`,
      getButtonPath: (locale: Locale) => `${localHost}/${locale}/auth/apply-with-button/`,
      getProxyPath: (locale: Locale) => `${localHost}/public/support/oauth-xdomain-proxy.html`,
    },
    dev: {
      getOAuthPath: (locale: Locale) => `http://localhost:8081/oauth.html`,
      getButtonPath: (locale: Locale) => `http://localhost:8081/button.html`,
      getProxyPath: (locale: Locale) => `http://localhost:8081/proxy.html`,
    },
    _internal_test: {
      getOAuthPath: (locale: Locale) => `http://localhost:4000/public/support/oauth-test-login.html`,
      getButtonPath: (locale: Locale) => `http://localhost:4000/public/support/oauth-test-button.html`,
      getProxyPath: (locale: Locale) => `http://localhost:4000/public/support/oauth-xdomain-proxy.html`,
    },
  };
};
