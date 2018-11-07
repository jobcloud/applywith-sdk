/**
 * @jest-environment jsdom
 * @flow
 */
import render from '../buttonFrame';

const spies = {
  clickHandler: () => {},
};

const createFrame = (locale = 'de', color = 'blue', path) => {
  const container = document.createElement('div');
  render(container, spies.clickHandler, { locale, color, path, accessKey: 'd4609c6b-38c7-4b2b-8ef4-26a715d29593' });
  return container;
};

describe('buttonFrame', () => {
  describe('renders', () => {
    it('renders anchor in container', () => {
      expect(createFrame().children.length).toBe(1);
      expect(createFrame().children[0].tagName).toBe('IFRAME');
    });
    it('renders frame with correct default structure', () => {
      const anchor = createFrame();
      expect(anchor.innerHTML).toMatchSnapshot();
    });
    it('renders frame with optional color', () => {
      const frame = createFrame('de', 'white').children[0];
      expect(frame.getAttribute('src')).toContain('?color=white');
    });
    it('renders frame with overwritten locale', () => {
      const frame = createFrame('en').children[0];
      expect(frame.getAttribute('src')).toContain('/en/');
    });
    it('renders frame with overwritten button pathname', () => {
      const origin = 'http://localhost:8081';
      const pathname = `${origin}/button.html`;
      const frame = createFrame('de', undefined, pathname).children[0];
      expect(frame.getAttribute('src')).toContain(pathname);
    });
  });
  describe('postMessage', () => {
    it('calls clickHandler callback', done => {
      spyOn(spies, 'clickHandler').and.callFake(done);
      createFrame(undefined, undefined, 'http://localhost:8081/button.html');
      window.postMessage(JSON.stringify({ type: '@jobcloud/click', testOrigin: 'http://localhost:8081' }), '*');
    });
    it('shows user warning when origin does not match', done => {
      spyOn(console, 'warn').and.callFake(() => {
        expect(console.warn.calls.count()).toEqual(1);
        expect(console.warn.calls.argsFor(0)[0]).toContain('JobCloudSDK: Recieved click message from invalid origin!');
        done();
      });
      createFrame(undefined, undefined, 'http://localhost:8081/button.html');
      window.postMessage(JSON.stringify({ type: '@jobcloud/click', testOrigin: 'http://www.hostile-host.ch' }), '*');
    });
  });
});
