// @flow
import checkSecureMessage from './checkSecureMessage';
import type { ApplyButtonClickHandler, ApplyButtonOptions, Locale, ApplyButtonColor } from './types';

const defaultButtonOrigin = 'https://www.jobs.ch';
const getDefaultButtonPath = (locale: Locale) => `/${locale}/auth/apply-with-button/`;

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
    if (checkSecureMessage(event, '@jobcloud/click', framePath) === null) {
      return;
    }

    clickHandler();
  };
  window.addEventListener('message', messageEventListener);
};
