// @flow
import checkSecureMessage from './checkSecureMessage';
import type { ApplyButtonClickHandler, ApplyButtonOptions, Locale, ApplyButtonColor, Tenant } from './types';

const defaultButtonOrigin = 'https://www.jobs.ch';
const getDefaultButtonPath = (locale: Locale) => `/${locale}/auth/apply-with-button/`;

const createButtonUrl = (
  locale: Locale,
  color: ApplyButtonColor,
  accessKey: string,
  origin?: string,
  senderId?: string
): string => {
  const path = origin || `${defaultButtonOrigin}${getDefaultButtonPath(locale)}`;
  return `${path}?color=${color}&accessKey=${accessKey}&parent=${encodeURIComponent(
    window.location.origin
  )}&sender_id=${senderId || 'false'}`;
};

const buttonSizes: { [tenant: Tenant]: { [id: Locale]: Array<number> } } = {
  jobs_ch: {
    de: [217, 50],
    en: [186, 50],
    fr: [211, 50],
  },
  jobup_ch: {
    de: [217, 50],
    en: [186, 50],
    fr: [211, 50],
  },
};

const getFrameStyle = (locale: Locale, tenant: Tenant) => `
  width: ${buttonSizes[tenant][locale][0]}px;
  height: ${buttonSizes[tenant][locale][1]}px;
  border: 0;
`;

export default (container: HTMLElement, clickHandler: ApplyButtonClickHandler, options: ApplyButtonOptions): void => {
  const color: ApplyButtonColor = options.color;
  const frame: HTMLIFrameElement = document.createElement('iframe');
  const senderId = options.senderId;
  const url = createButtonUrl(options.locale, color, options.accessKey, options.path, senderId);
  const framePath = options.path || defaultButtonOrigin;

  frame.setAttribute('src', url);
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('scrolling', 'no');
  frame.setAttribute('sandbox', 'allow-scripts allow-same-origin');
  frame.setAttribute('style', getFrameStyle(options.locale, options.tenant));

  container.appendChild(frame);

  const messageEventListener = (event: MessageEvent) => {
    const eventData = checkSecureMessage(event, '@jobcloud/click', framePath);

    if (!eventData) {
      return;
    }

    if (eventData.senderId !== senderId) {
      return;
    }

    clickHandler(senderId);
  };
  window.addEventListener('message', messageEventListener);
};
