// @flow

export type Locale = 'de' | 'fr' | 'en';

export type Env = 'prod' | 'test' | 'dev' | '_internal_test';

export type Tenant = 'jobs_ch' | 'jobup_ch';

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
  // Callback called with the applicants personal information
  +callback?: ApplicationCallback,
  // Hosts configuration
  +env?: Env,
  // Use filre refs instead of blobs
  +useFileRefs: boolean,
  // Tenant (jobs_ch | jobup_ch)
  +tenant: Tenant,

  // -- Really optional fields

  // Used to overwrite the default endpoint for testing purposes.
  +oAuthEndpoint?: string,
  // Used to overwrite the default button path
  +oAuthButtonPath?: string,
  // Used to overwrite the default iframe xorigin proxy
  +oAuthProxyPath?: string,
  // Color variant of the apply-with button
  +colorVariant?: ApplyButtonColor,
};

export type SDKSecureConfig = {
  accessKey: string,
  tenant: Tenant,
  locale: Locale,
  injectElement: HTMLElement,
  oAuthEndpoint: string,
  colorVariant: ApplyButtonColor,
  callback: ApplicationCallback,
  oAuthButtonPath?: string,
  oAuthProxyPath: string,
  useFileRefs: boolean,
};

export type ApplyButtonClickHandler = (senderId?: string) => void;

export type ApplyButtonColor = 'white' | 'blue' | 'green' | 'grey';

export type ApplyButtonOptions = {
  // The oAuth consumer access key
  +accessKey: string,
  // Color variant of the button
  +color: ApplyButtonColor,
  // Locale of the button
  +locale: Locale,
  // Used to overwrite the default path for testing purposes.
  +path?: string,
  // Tenant: jobs_ch | jobup_ch
  +tenant: Tenant,
  // Sender ID, used to identify the sender button
  +senderId: string,
};

export type PopupOptions = {
  // oAuth Endpoint
  +endpoint: string,
};

export type API10ApplicationPayload = {
  Email: string,
  Title: 'Mr' | 'Mrs',
  FirstName: string,
  Surname: string,
  PhoneNumber: string,
  Address?: {
    ZipCode: string,
    City: string,
    Country: string,
  },
  AdditionalDocuments?: Array<{
    mime_type: string,
    binary_data?: string,
    media_api_url?: string,
    file_size?: number,
    expires?: number,
    filename: string,
    tags?: Array<string>,
  }>,
  Picture?: string,
  CV?: {
    mime_type: string,
    binary_data: string,
  },
};

export type Application = {
  email: string,
  gender: 'M' | 'F',
  firstName?: string,
  lastName?: string,
  phone?: string,
  zipCode?: string,
  city?: string,
  country?: string,
  cv?: {
    mimeType: string,
    binary: string,
  },
  picture?: string,
  documents?: Array<{
    mimeType: string,
    binary?: string,
    transientUrl?: string,
    fileSize?: number,
    expires?: number,
    fileName: string,
    tags?: Array<string>,
  }>,
};

export type ApplicationCallback = (app: Application) => void;
