// @flow

export type Locale = 'de' | 'fr' | 'en';

// All SDKConfig fields are marked optional because the API is called by
// the SDK consumer which could lead to required properties beeing undefined.
export type SDKConfig = {
  // The oAuth consumer access key
  +accessKey?: string,
  // Locale used to display the process to the end-user
  +locale?: Locale,
  // Used to overwrite the default endpoint for testing purposes.
  +oAuthEndpoint?: string,
};
