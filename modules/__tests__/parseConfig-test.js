/**
 * @jest-environment jsdom
 * @flow
 */
import parseConfig from '../parseConfig';

const createInjectElement = () => {
  const outlet = document.createElement('div');
  outlet.setAttribute('id', 'outlet');
  return outlet;
};

describe('parseConfig', () => {
  describe('with missing basics', () => {
    it('throws error when config is missing', () => {
      expect(() => parseConfig()).toThrow(new Error('Missing SDK config.'));
    });

    it('throws when accessKey is missing', () => {
      expect(() => parseConfig({})).toThrow(new Error('Missing "accessKey" config option.'));
    });
  });

  describe('with missing optionals', () => {
    describe('on undefined locale', () => {
      let config;
      beforeEach(() => {
        spyOn(console, 'warn');
        config = parseConfig({
          accessKey: 'fd00',
          injectElement: createInjectElement(),
        });
      });

      it('warns user', () => {
        expect(console.warn.calls.count()).toBe(1);
        expect(console.warn.calls.argsFor(0)[0]).toContain('JobCloudSDK: Locale not configured. Falling back to "de".');
      });

      it('falls back to "de"', () => {
        expect(config.locale).toEqual('de');
      });
    });

    describe('on unsupported locale', () => {
      let config;
      beforeEach(() => {
        spyOn(console, 'warn');
        config = parseConfig({
          accessKey: 'fd00',
          injectElement: createInjectElement(),
          locale: 'it',
        });
      });

      it('warns user', () => {
        expect(console.warn.calls.count()).toBe(1);
        expect(console.warn.calls.argsFor(0)[0]).toContain(
          'JobCloudSDK: Locale "it" is not supported. Falling back to "de".'
        );
      });

      it('falls back to "de"', () => {
        expect(config.locale).toEqual('de');
      });
    });

    describe('on undefined callback', () => {
      it('uses implicit callback', () => {
        const config = parseConfig({
          accessKey: 'fd00',
          injectElement: createInjectElement(),
          locale: 'de',
        });
        expect(config.callback).toBeDefined();
      });
    });
  });

  describe('injectElement', () => {
    it('throws on missing', () => {
      expect(() => parseConfig({ accessKey: 'fd00', locale: 'de' })).toThrow(
        new Error(
          'Invalid or missing "injectElement" config option. The element "" could not be found on the page or is undefined.'
        )
      );
    });

    it('throws on invalid selector', () => {
      expect(() =>
        parseConfig({
          accessKey: 'fd00',
          locale: 'de',
          injectElement: '#not-found',
        })
      ).toThrow(
        new Error(
          'Invalid or missing "injectElement" config option. The element "#not-found" could not be found on the page or is undefined.'
        )
      );
    });

    it('throws on invalid reference', () => {
      expect(() => parseConfig({ accessKey: 'fd00', locale: 'de', injectElement: {} })).toThrow(
        new Error(
          'Invalid or missing "injectElement" config option. The element "" could not be found on the page or is undefined.'
        )
      );
    });

    it('parses element reference', () => {
      const element = createInjectElement();
      expect(parseConfig({ accessKey: 'fd00', locale: 'de', injectElement: element }).injectElement).toEqual(element);
    });

    it('parses and selects element query', () => {
      const element = createInjectElement();
      document.body.appendChild(element);
      expect(
        parseConfig({
          accessKey: 'fd00',
          locale: 'de',
          injectElement: '#outlet',
        }).injectElement
      ).toEqual(element);
    });
  });

  describe('callback', () => {
    it('gets overwritten', () => {
      const cb = () => {};
      const config = parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        injectElement: createInjectElement(),
        callback: cb,
      });
      expect(config.callback).toEqual(cb);
    });
  });

  describe('oAuthEndpoint', () => {
    it('creates default endpoint', () => {
      expect(
        parseConfig({
          accessKey: 'fd00',
          locale: 'de',
          injectElement: createInjectElement(),
        }).oAuthEndpoint
      ).toEqual(
        'https://www.jobs.ch/de/auth/oauth/?client_id=fd00&redirect_uri=http%3A%2F%2Flocalhost%3A8080&approval_prompt=auto&response_type=code&scopes=user_cv_basic_data+user_cv_documents+user_basic_information&state=default_state&use_message=1&slim=1&use_file_refs=0'
      );
    });

    it('creates test endpoint', () => {
      expect(
        parseConfig({
          accessKey: 'fd00',
          locale: 'de',
          env: 'test',
          injectElement: createInjectElement(),
        }).oAuthEndpoint
      ).toEqual(
        'https://www.jobs.ch/public/support/oauth-test-login.html?client_id=fd00&redirect_uri=http%3A%2F%2Flocalhost%3A8080&approval_prompt=auto&response_type=code&scopes=user_cv_basic_data+user_cv_documents+user_basic_information&state=default_state&use_message=1&slim=1&use_file_refs=0'
      );
    });

    it('can be overwritten', () => {
      expect(
        parseConfig({
          accessKey: 'fd00',
          locale: 'de',
          injectElement: createInjectElement(),
          oAuthEndpoint: 'http://kittens.com',
        }).oAuthEndpoint
      ).toEqual(
        'http://kittens.com?client_id=fd00&redirect_uri=http%3A%2F%2Flocalhost%3A8080&approval_prompt=auto&response_type=code&scopes=user_cv_basic_data+user_cv_documents+user_basic_information&state=default_state&use_message=1&slim=1&use_file_refs=0'
      );
    });
  });

  describe('colorVariant', () => {
    it('defaults to blue variant', () => {
      expect(
        parseConfig({
          accessKey: 'fd00',
          locale: 'de',
          injectElement: createInjectElement(),
        }).colorVariant
      ).toEqual('blue');
    });

    it('can be overwritten', () => {
      expect(
        parseConfig({
          accessKey: 'fd00',
          locale: 'de',
          injectElement: createInjectElement(),
          colorVariant: 'white',
        }).colorVariant
      ).toEqual('white');
    });

    it('does not warn user if missing', () => {
      spyOn(console, 'warn');
      parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        injectElement: createInjectElement(),
      });
      expect(console.warn.calls.count()).toEqual(0);
    });

    describe('with unsupported color', () => {
      it('warns user', () => {
        spyOn(console, 'warn');
        parseConfig({
          accessKey: 'fd00',
          locale: 'de',
          injectElement: createInjectElement(),
          colorVariant: 'green',
        });
        expect(console.warn.calls.count()).toEqual(1);
        expect(console.warn.calls.argsFor(0)[0]).toContain(
          'JobCloudSDK: Color "green" is not supported. Falling back to "blue".'
        );
      });

      it('falls back to default', () => {
        spyOn(console, 'warn'); // Only to suppress test console output
        const config = parseConfig({
          accessKey: 'fd00',
          locale: 'de',
          injectElement: createInjectElement(),
          colorVariant: 'green',
        });
        expect(config.colorVariant).toEqual('blue');
      });
    });
  });

  describe('oAuthButtonPath', () => {
    it('creates default path', () => {
      const config = parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        injectElement: createInjectElement(),
      });
      expect(config.oAuthButtonPath).toEqual('https://www.jobs.ch/de/auth/apply-with-button/');
    });
    it('creates test path', () => {
      const config = parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        env: 'test',
        injectElement: createInjectElement(),
      });
      expect(config.oAuthButtonPath).toEqual('https://www.jobs.ch/public/support/oauth-test-button.html');
    });
    it('can be overwritten', () => {
      const config = parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        injectElement: createInjectElement(),
        oAuthButtonPath: 'http://kittens.com',
      });
      expect(config.oAuthButtonPath).toEqual('http://kittens.com');
    });
  });

  describe('oAuthProxyPath', () => {
    it('creates default path', () => {
      const config = parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        injectElement: createInjectElement(),
      });
      expect(config.oAuthProxyPath).toEqual('https://www.jobs.ch/public/support/oauth-xdomain-proxy.html');
    });
    it('creates test path', () => {
      const config = parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        env: 'test',
        injectElement: createInjectElement(),
      });
      expect(config.oAuthProxyPath).toEqual('https://www.jobs.ch/public/support/oauth-xdomain-proxy.html');
    });
    it('can be overwritten', () => {
      const config = parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        injectElement: createInjectElement(),
        oAuthProxyPath: 'http://kittens.com',
      });
      expect(config.oAuthProxyPath).toEqual('http://kittens.com');
    });
  });

  describe('useFileRefs', () => {
    it('applies config parameter', () => {
      const config = parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        injectElement: createInjectElement(),
        useFileRefs: true,
      });
      expect(config.useFileRefs).toBe(true);
    });
    it('sets flag on oAuthEndpoint', () => {
      const config = parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        injectElement: createInjectElement(),
        useFileRefs: true,
      });
      expect(config.oAuthEndpoint).toContain('&use_file_refs=1');
    });
    it('falls back to false', () => {
      const config = parseConfig({
        accessKey: 'fd00',
        locale: 'de',
        injectElement: createInjectElement(),
      });
      expect(config.useFileRefs).toBe(false);
    });
  });
});
