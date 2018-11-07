const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post('/upload', function(req, res) {
  const attachments = req.body.attachment;

  if (attachments) {
    const uploadPath = path.resolve(__dirname, 'uploads');

    // Walk all attachments received
    Object.keys(attachments).forEach(fileName => {
      // Determine proper destination in upload folder
      const filePath = path.resolve(uploadPath, fileName);

      // Decode base64 content to buffer
      const contentBuffer = Buffer.from(attachments[fileName], 'base64');

      console.log('Writing file: ' + filePath);
      // Write file to disk
      fs.writeFileSync(filePath, contentBuffer);
    });
  }
  res.send(200);
});

app.listen(8083, () => {
  console.log('Server listening on 8083');
});
