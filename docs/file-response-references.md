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
  picture: 'https://media.jobs.ch/media/280d8fce-efc3-42f5-9c06-606aba92e2d3?token=8d62',
  documents: [
    {
      mimeType: 'application/pdf',
      transientUrl: 'https://media.jobs.ch/media/280d8fce-efc3-42f5-9c06-606aba92e2d3/cv-ann-boile.pdf?token=8d62',
      fileName: 'cv-ann-boile.pdf',
      fileSize: 450214,
      expires: 1525080413,
      tags: ['cv'],
    },
    {
      mimeType: 'application/pdf',
      transientUrl: 'https://media.jobs.ch/media/ae50d8b32-87bd-12d1-cb71-145dde92a8a9/recommendations-and-testimony.pdf?token=cf23',
      fileName: 'recommendation-letter-ann-boile.pdf',
      fileSize: 856234,
      expires: 1525080413,
      tags: ['recommendation', 'testimony'],
    }
  ]
}
```

## Tags
`tags` may contain the following values:
* cv
* motivation
* portfolio
* recommendation
* testimony

A file can have one, multiple or no tags.


## Comments
* The links in the `transientUrl` have an expiry time of 6 months. You may include them in e.g. an application email, if it is enough to have them valid for 6 months. If you need to store the files permanently, download them to your own system.
* Please mind that with setting `useFileRefs = true` there is *no* `cv` object in the data structure.
* Please mind that the the `picture` URL is optional and does not contain meta information.
