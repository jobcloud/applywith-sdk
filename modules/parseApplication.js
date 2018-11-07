// @flow

import type { API10ApplicationPayload, Application } from './types';

export default (response: API10ApplicationPayload): Application => {
  const app: Application = {
    email: response.Email,
    gender: response.Title === 'Mr' ? 'M' : 'F',
    firstName: response.FirstName ? response.FirstName : undefined,
    lastName: response.Surname ? response.Surname : undefined,
    phone: response.PhoneNumber,
    picture: response.Picture,
  };

  if (typeof response.Address === 'object' && response.Address !== null) {
    app.zipCode = response.Address.ZipCode;
    app.city = response.Address.City;
    app.country = response.Address.Country;
  }

  if (typeof response.CV === 'object' && response.CV !== null) {
    app.cv = {
      mimeType: response.CV.mime_type,
      binary: response.CV.binary_data,
    };
  }

  if (Array.isArray(response.AdditionalDocuments) && response.AdditionalDocuments.length) {
    app.documents = response.AdditionalDocuments.map(doc => ({
      mimeType: doc.mime_type,
      binary: doc.binary_data,
      fileName: doc.filename,
      transientUrl: doc.media_api_url,
      fileSize: doc.file_size,
      expires: doc.expires,
      tags: doc.tags,
    }));
  } else {
    app.documents = [];
  }

  return app;
};
