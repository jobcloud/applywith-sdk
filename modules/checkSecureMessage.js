// @flow

export default (event: MessageEvent, messageType: string, origin: string): ?Object => {
  if (!event.data || !(typeof event.data === 'string')) {
    return null;
  }
  let data;
  try {
    data = JSON.parse(event.data);
  } catch (e) {
    console.warn('JobCloudSDK: Received invalid message format!');
  }
  if (data === undefined || !('type' in data) || data.type === undefined) {
    return null;
  }
  if (data.type !== messageType && data.type !== '@jobcloud/*') {
    return null;
  }
  // Not the best outcome to have test specific code here. But better be
  // able to test this security feature as to be left in the dark.
  if (process.env.NODE_ENV === 'test') {
    if (!('testOrigin' in data) || typeof data.testOrigin !== 'string' || !origin.startsWith(data.testOrigin)) {
      console.warn('JobCloudSDK: Received click message from invalid origin!');
      return null;
    }
  } else if (!origin.startsWith(event.origin)) {
    console.warn('JobCloudSDK: Received click message from invalid origin!');
    return null;
  }

  return data;
};
