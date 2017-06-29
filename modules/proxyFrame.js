// @flow
import checkSecureMessage from './checkSecureMessage';

const defaultProxyPath = 'http://www.jobs.ch/public/oauth-xdomain-proxy.html';

const getFrameStyle = () => `
  visibility: hidden;
`;

let frame: ?HTMLIFrameElement;

export default (container: HTMLElement, oAuthProxyPath: ?string): void => {
  if (frame) {
    return;
  }
  // Bail if we detect a browser that has a woking postMessage implementation.
  if (
    navigator.userAgent.indexOf('MSIE') === -1 &&
    navigator.appVersion.indexOf('Trident/') === -1 &&
    !process.env.NODE_ENV === 'test'
  ) {
    return;
  }

  frame = document.createElement('iframe');
  const url = oAuthProxyPath || defaultProxyPath;

  frame.setAttribute('src', url);
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('width', '0');
  frame.setAttribute('height', '0');
  frame.setAttribute('id', 'jobcloud-xdomain-frame');
  frame.setAttribute('style', getFrameStyle());

  container.appendChild(frame);
};

export const reset = () => {
  if (frame) {
    frame.remove();
    frame = undefined;
  }
};
