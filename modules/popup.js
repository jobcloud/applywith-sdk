// @flow
import checkSecureMessage from './checkSecureMessage';

import type { PopupOptions, Locale } from './types';

export default (options: PopupOptions, callback: ?Function) => {
  let pWindow;
  let messageEventListener;

  return {
    open: (senderId?: string) => {
      const width = 780;
      const height = 700;
      const left = window.screenX + 200;
      const top = window.screenY + 200;
      const windowString = `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,location=0,resizable=1`;
      const endpointWithSenderId = `${options.endpoint}&sender_id=${senderId || 'false'}`;

      pWindow = window.open(endpointWithSenderId, 'Authorization', windowString);

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
        if (eventData.senderId !== senderId) {
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
