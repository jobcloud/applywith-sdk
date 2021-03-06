/**
 * @jest-environment jsdom
 * @flow
 */
import createPopup from '../popup';

let popup;

const spies = {
  focus: () => {},
  close: () => {},
  callback: () => {},
};

describe('popup', () => {
  describe('opening', () => {
    beforeEach(() => {
      spyOn(spies, 'focus');
      spyOn(window, 'open').and.returnValue({ focus: spies.focus });
      popup = createPopup({ endpoint: 'http://localhost:8081?client_id=client001' });
      popup.open('sender001');
    });
    it('opens popup', () => {
      expect(window.open.calls.count()).toEqual(1);
    });
    it('sets correct url', () => {
      expect(window.open.calls.argsFor(0)[0]).toEqual('http://localhost:8081?client_id=client001&sender_id=sender001');
    });
    it('sets correct title', () => {
      expect(window.open.calls.argsFor(0)[1]).toEqual('Authorization');
    });
    it('sets correct options', () => {
      expect(window.open.calls.argsFor(0)[2]).toEqual(
        'width=780,height=700,left=200,top=200,toolbar=0,menubar=0,location=0,resizable=1'
      );
    });
    it('focuses after opening', () => {
      expect(spies.focus).toHaveBeenCalled();
    });
  });

  describe('postMessage', () => {
    it('calls message callback', done => {
      spyOn(window, 'open').and.returnValue({ focus: spies.focus, close: spies.close });
      spyOn(spies, 'callback').and.callFake(done);
      createPopup({ endpoint: 'http://localhost:8081' }, spies.callback).open('sender001');
      window.postMessage(
        JSON.stringify({
          type: '@jobcloud/application',
          testOrigin: 'http://localhost:8081',
          payload: { application: {} },
          senderId: 'sender001',
        }),
        '*'
      );
    });
    it('closes popup', done => {
      spyOn(spies, 'close');
      spyOn(window, 'open').and.returnValue({ focus: spies.focus, close: spies.close });
      spyOn(spies, 'callback').and.callFake(() => {
        expect(spies.close).toHaveBeenCalled();
        done();
      });
      createPopup({ endpoint: 'http://localhost:8081' }, spies.callback).open('sender001');
      window.postMessage(
        JSON.stringify({
          type: '@jobcloud/application',
          testOrigin: 'http://localhost:8081',
          payload: { application: {} },
          senderId: 'sender001',
        }),
        '*'
      );
    });
  });
});
