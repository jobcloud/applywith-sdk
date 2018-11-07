// @flow

import parse from '../parseApplication';

describe('parseApplication', () => {
  describe('sane defaults', () => {
    const apiResult = {
      Email: 'test@jobcloud.ch',
      Title: 'Mr',
    };

    it('sets email', () => {
      expect(parse(apiResult).email).toEqual('test@jobcloud.ch');
    });
    it('sets gender', () => {
      expect(parse(apiResult).gender).toEqual('M');
    });
    it('sets unknown fields to undefined', () => {
      const result = parse(apiResult);
      expect(result.firstName).toBeUndefined();
      expect(result.lastName).toBeUndefined();
      expect(result.phone).toBeUndefined();
      expect(result.zipCode).toBeUndefined();
      expect(result.city).toBeUndefined();
      expect(result.country).toBeUndefined();
      expect(result.cv).toBeUndefined();
    });
    it('sets documents to empty array', () => {
      expect(parse(apiResult).documents).toEqual([]);
    });
  });
  describe('full response', () => {
    const apiResult = {
      Email: 'test@jobcloud.ch',
      Title: 'Mr',
      FirstName: 'Max',
      Surname: 'Mustermann',
      PhoneNumber: '000000',
      Address: {
        ZipCode: '8000',
        City: 'Zürich',
        Country: 'CH',
      },
      CV: {
        mime_type: 'application/pdf',
        binary_data: 'ffab',
      },
      Picture: 'http://some.url',
      AdditionalDocuments: [
        {
          mime_type: 'application/pdf',
          binary_data: 'ffff',
          media_api_url: 'http://some.url',
          file_size: 10000,
          expires: 20000,
          filename: 'document.pdf',
          tags: ['cv'],
        },
      ],
    };

    [
      ['firstName', 'Max'],
      ['lastName', 'Mustermann'],
      ['phone', '000000'],
      ['zipCode', '8000'],
      ['city', 'Zürich'],
      ['country', 'CH'],
    ].forEach(test =>
      it(`sets ${test[0]} to ${test[1]}`, () => {
        expect(parse(apiResult)[test[0]]).toEqual(test[1]);
      })
    );

    it('parses CV', () => {
      const cv = parse(apiResult).cv;
      expect(cv).toBeDefined();
      expect(cv.mimeType).toEqual('application/pdf');
      expect(cv.binary).toEqual('ffab');
    });

    it('parses documents', () => {
      const docs = parse(apiResult).documents;
      expect(docs).toBeDefined();
      expect(docs.length).toBe(1);
      expect(docs[0]).toEqual({
        mimeType: 'application/pdf',
        binary: 'ffff',
        transientUrl: 'http://some.url',
        fileName: 'document.pdf',
        fileSize: 10000,
        expires: 20000,
        tags: ['cv'],
      });
    });
  });
});
