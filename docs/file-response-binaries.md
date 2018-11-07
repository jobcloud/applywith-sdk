# Example Response - Binaries

In this example, you can see the file response when the SDK was set to `useFileRefs = false`.

> This approach will be removed in version 2.0.0

## Example

```
{
  email: 'email@example.org',
  gender: 'F',
  firstName: 'Ann',
  lastName: 'Boile',
  phone: '+41 55 44 88 774',
  zipCode: '8032',
  city: 'Zürich',
  country: 'Switzerland',
  documents: [
    {
      mimeType: 'application/pdf',
      binary: 'JVBERi0xLjQlNSAwIG9iajw8 ...',
      fileName: 'referenzen bewerbung.pdf',
    },
    {
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      binary: 'UCFtPydLZltDb250ZW50X1R5cGVzXS54bWwgPyg/Pz8/bj8wRT8 ...',
      fileName: 'Lebenslauf Hans Müller.pdf',
    }
  ],
  cv: {
    mimeType: 'application/pdf',
    binary: ''JVBERi0xLjQlNSAwIG9iajw8 ...'
  }
}
```

## Comments
* Requesting the files as binaries is not recommended because of performance reasons. Files are _downloaded_ from jobs.ch when the user allows the site to access the data and _uploaded_ again when sending the application.
* We do not recommend to use the `cv` property any more, as this is deprecated and won't be included in future versions of ApplyWith SDK.
* The `cv` property is only included when setting `useFileRefs = false`.
* Requesting files as binaries is deprecated and will be removed in version 2.0.0.
