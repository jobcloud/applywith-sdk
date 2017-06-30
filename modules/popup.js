// @flow
import checkSecureMessage from './checkSecureMessage';

import type { PopupOptions, Locale } from './types';

export default (options: PopupOptions, callback: ?Function) => {
  let pWindow;
  let messageEventListener;

  return {
    open: () => {
      const width = Math.min(Math.floor(window.outerWidth * 0.8), 1000);
      const height = Math.min(Math.floor(window.outerHeight * 0.5), 630);
      const left = Math.floor(window.screenX + (window.outerWidth - width) / 2);
      const top = Math.floor(window.screenY + (window.outerHeight - height) / 8);
      const windowString = `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,resizable=1`;

      pWindow = window.open(options.endpoint, 'Authorization', windowString);

      if (pWindow) {
        pWindow.focus();
      } else {
        throw new Error('Could not open popup.');
      }

      if (messageEventListener) {
        window.removeEventListener('message', messageEventListener);
      }

      messageEventListener = (event: MessageEvent) => {
        const eventData = checkSecureMessage(event, '@jobcloud/application', options.endpoint);
        if (!eventData) {
          return;
        }
        if (!eventData.payload) {
          return;
        }
        if (pWindow) {
          pWindow.close();
          pWindow = undefined;
        }
        callback && callback(eventData.payload.application);
      };
      window.addEventListener('message', messageEventListener);

      return pWindow;
    },

    close: () => {
      if (pWindow) {
        pWindow.close();
        pWindow = undefined;
      }
      if (messageEventListener) {
        window.removeEventListener('message', messageEventListener);
      }
    },
  };
};
