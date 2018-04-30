# Example Response - References

In this example, you can see the file response when the SDK was set to `useFileRefs = true`.

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
      transientUrl: 'https://media.jobs.ch/media/280d8fce-efc3-42f5-9c06-606aba92e2d3/cv-ann-boile.pdf?token=8d62',
      fileName: 'cv-ann-boile.pdf',
      fileSize: 450214,
      expires: 1525080413
    },
    {
      mimeType: 'image/jpeg',
      transientUrl: 'https://media.jobs.ch/media/ae50d8b32-87bd-12d1-cb71-145dde92a8a9/portrait-image-ann-boile.jpg?token=cf23',
      fileName: 'portrait-image-ann-boile.jpg',
      fileSize: 856234,
      expires: 1525080413
    }
  ]
  }
}
```

## Comments
* Please mind that with setting `useFileRefs = true` there is *no* `cv` object in the data structure.
* The links in the `transientUrl` have an expiry time of 24 hours. Do *not* include them in an application e-mail, do *no* store them persistently. We recommend to download the files immediately after receiving the response.
