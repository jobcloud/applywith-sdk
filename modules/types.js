// @flow

export type Locale = 'de' | 'fr' | 'en';

// All SDKConfig fields are marked optional because the API is called by
// the SDK consumer which could lead to required properties beeing undefined.
export type SDKConfig = {
  // -- Required keys

  // The oAuth consumer access key
  +accessKey?: string,
  // Locale used to display the process to the end-user
  +locale?: Locale,
  // Element in which the button will be injected
  +injectElement?: HTMLElement | string,

  // -- Really optional fields

  // Used to overwrite the default endpoint for testing purposes.
  +oAuthEndpoint?: string,
  // Used to overwrite the default button path
  +oAuthButtonPath?: string,
  // Color variant of the apply-with button
  +colorVariant?: ApplyButtonColor,
};

export type SDKSecureConfig = {
  accessKey: string,
  locale: Locale,
  injectElement: HTMLElement,
  oAuthEndpoint: string,
  colorVariant: ApplyButtonColor,
  oAuthButtonPath?: string,
};

export type ApplyButtonClickHandler = () => void;

export type ApplyButtonColor = 'white' | 'blue';

export type ApplyButtonOptions = {
  // The oAuth consumer access key
  +accessKey: string,
  // Color variant of the button
  +color: ApplyButtonColor,
  // Locale of the button
  +locale: Locale,
  // Used to overwrite the default path for testing purposes.
  +path?: string,
};
