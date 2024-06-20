const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.get('/pdf-binary', (req, res) => {
  // Read the binary data from the PDF file
  fs.readFile('./simpleTestPDF.pdf', 'binary', (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const fileName = uuidv4();
      // Set the response headers for binary data
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${fileName}.pdf"`);
      res.status(200).end(data, 'binary');
    }
  });
});

const PORT = process.env.PORT || 3050;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
