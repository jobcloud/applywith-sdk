# Frequently asked questions

This section answers frequently asked questions. If you have questions not answered here, please approach [applywith@jobcloud.ch](mailto:applywith@jobcloud.ch).


## What is ApplyWith SDK?

ApplyWith SDK is a software development kit written in JavaScript. Is is intended to be included in a job ad or application form. It enables users to apply faster using their jobs.ch profile in delivering the relevant data to external career sites.

## Does it provide an application form?

No. ApplyWith SDK provides _data_ that can be filled up e.g. into an application form. The application form itself must be provided by the career site that embeds the SDK.

## Visually - how does it look like?

ApplyWith SDK is visually represented as a button "_Apply with jobs.ch_". By clicking on the button, a pop-up (Desktop) or new window (Mobile) is opened, asking users to allow the tr ansfer of data to the career site that requested them.

## What do I need to implement?

As a developer, you need to

* Include the JavaScript library files
* Configure and call the SDK
* Handle the data response within the `callback` function
* Process the data on the server side

For the JavaScript part, we provide an example in [example/index.html](../example/index.html).

## Can I send the received data directly in the `callback` function?

When receiving the data, you need to
* pre-fill an application form, or
* show a preview page

In any case, the user has to verify the transmission of the data.

## Can I use it with PDF job ads?

ApplyWith SDK is written in JavaScript and needs to be embedded into a Web page. The button cannot be included into a PDF.

Nevertheless, it is possible to
* Show the job detail as a PDF using an `<iframe>`
* Include the ApplyWith button on the page that surrounds the PDF job ad

## Is there a plug-in for a CMS like Wordpress?

We do not provide CMS plug-ins as the implementations are different on every career site.

## What are the technical prerequisites?

* The site runs on HTTPS
* A productive access key is generated
* The backend is able to handle the response

## Should I send the whole application via e-mail?

You can deliver the filled-out application via e-mail. Please make sure
* not to attach files in the e-mail, and
* not to simply include the file links.

See the answers below for details.

## Should I send the file references via e-mail?

Please *don't* do that. The links only are available for 24 hours and can't be accessed afterwards. We highly recommend to download the files on the server side and use your copy of them.

An example file response when setting the SDK to `useFileRefs = true` can be seen [here](file-response-references.md).

## Is there a file size restriction?

No - the jobs.ch profile does not have a restriction for the uploaded file size. That also means no file size limitations for data transferred via ApplyWith SDK.

## The redirect fails. What's wrong?

When using the productive access key, the data is only delivered on the productive domain. In this case, "Redirection failed" security error message appears.

As HTTPS is a hard technical prerequisite, the redirect also fails if the site containing ApplyWith is accessed through unencrypted HTTP.
