// @flow
import type { ApplyButtonClickHandler, ApplyButtonOptions, Locale, ApplyButtonColor } from './types';

const defaultButtonOrigin = 'https://www.jobs.ch';
const getDefaultButtonPath = (locale: Locale) => `/${locale}/apply-with/button/`;

const createButtonUrl = (locale: Locale, color: ApplyButtonColor, accessKey: string, origin?: string): string => {
  const path = origin || `${defaultButtonOrigin}${getDefaultButtonPath(locale)}`;
  return `${path}?color=${color}&accessKey=${accessKey}&parent=${encodeURIComponent(window.location.origin)}`;
};

const anchorTitles: { [id: Locale]: string } = {
  de: 'Bewerben mit jobs.ch',
  en: 'Apply with jobs.ch',
  fr: 'Postuler avec jobs.ch',
};

const buttonSizes: { [id: Locale]: Array<number> } = {
  de: [217, 50],
  en: [186, 50],
  fr: [211, 50],
};

const getFrameStyle = (locale: Locale) => `
  width: ${buttonSizes[locale][0]}px;
  height: ${buttonSizes[locale][1]}px;
  border: 0;
`;

let messageEventListener;

export default (container: HTMLElement, clickHandler: ApplyButtonClickHandler, options: ApplyButtonOptions): void => {
  const color: ApplyButtonColor = options.color;
  const frame: HTMLIFrameElement = document.createElement('iframe');
  const url = createButtonUrl(options.locale, color, options.accessKey, options.path);
  const framePath = options.path || defaultButtonOrigin;

  frame.setAttribute('src', url);
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('scrolling', 'no');
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin');
  frame.setAttribute('style', getFrameStyle(options.locale));

  container.appendChild(frame);

  if (messageEventListener) {
    window.removeEventListener('message', messageEventListener);
  }

  messageEventListener = (event: MessageEvent) => {
    if (typeof event.data !== 'object' || event.data === null) {
      return;
    }
    if (event.data === undefined || !('type' in event.data) || event.data.type === undefined) {
      return;
    }
    if (event.data.type !== '@jobcloud/click') {
      return;
    }
    // Not the best outcome to have test specific code here. But better be
    // able to test this security feature as to be left in the dark.
    if (process.env.NODE_ENV === 'test') {
      if (
        !('testOrigin' in event.data) ||
        typeof event.data.testOrigin !== 'string' ||
        !framePath.startsWith(event.data.testOrigin)
      ) {
        console.warn('JobCloudSDK: Recieved click message from invalid origin!');
        return;
      }
    } else if (!framePath.startsWith(event.origin)) {
      console.warn('JobCloudSDK: Recieved click message from invalid origin!');
      return;
    }

    clickHandler();
  };
  window.addEventListener('message', messageEventListener);
};
