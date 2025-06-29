require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const companion = require('@uppy/companion');

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: process.env.COMPANION_SECRET,
  resave: false,
  saveUninitialized: true
}));

const options = {
  providerOptions: {
    drive: {
      key: process.env.GOOGLE_KEY,
      secret: process.env.GOOGLE_SECRET
    },
    dropbox: {
      key: process.env.DROPBOX_KEY,
      secret: process.env.DROPBOX_SECRET
    },
    onedrive: {
      key: process.env.ONEDRIVE_KEY,
      secret: process.env.ONEDRIVE_SECRET
    }
  },
  server: {
    host: process.env.COMPANION_DOMAIN,
    protocol: 'https'
  },
  filePath: '/tmp',
  secret: process.env.COMPANION_SECRET,
  debug: true,

  uploadUrls: [process.env.UPLOAD_URL] // frontend URLs allowed to receive upload result
};

app.use(companion.app(options));

const PORT = process.env.PORT || 3020;
const server = app.listen(PORT, () => {
  console.log(`🚀 Uppy Companion running on port ${PORT}`);
});

companion.socket(server, options);
