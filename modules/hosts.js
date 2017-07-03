// @flow
import type { Locale } from './types';

export default {
  prod: {
    getOAuthPath: (locale: Locale) => `https://www.jobs.ch/${locale}/auth/oauth/`,
    getButtonPath: (locale: Locale) => `https://www.jobs.ch/${locale}/auth/apply-with-button/`,
    getProxyPath: (locale: Locale) => `https://www.jobs.ch/public/support/oauth-xdomain-proxy.html`,
  },
  test: {
    getOAuthPath: (locale: Locale) => `https://www.jobs.ch/public/support/oauth-test-login.html`,
    getButtonPath: (locale: Locale) => `https://www.jobs.ch/public/support/oauth-test-button.html`,
    getProxyPath: (locale: Locale) => `https://www.jobs.ch/public/support/oauth-xdomain-proxy.html`,
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
