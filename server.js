require('dotenv').config();
const express = require('express');
const companion = require('@uppy/companion');

const app = express();

const options = {
  providerOptions: {
    google: {
      key: process.env.GOOGLE_CLIENT_ID,
      secret: process.env.GOOGLE_CLIENT_SECRET
    },
    dropbox: {
      key: process.env.DROPBOX_CLIENT_ID,
      secret: process.env.DROPBOX_CLIENT_SECRET
    },
    onedrive: {
      key: process.env.ONEDRIVE_CLIENT_ID,
      secret: process.env.ONEDRIVE_CLIENT_SECRET
    }
  },
  server: {
    host: process.env.COMPANION_DOMAIN,
    protocol: "https"
  },
  filePath: "/tmp",
  secret: process.env.COMPANION_SECRET,
  debug: true
};

app.use(companion.app(options));

// Enable WebSocket for real-time progress (optional)
const server = app.listen(process.env.PORT || 3020, () => {
  console.log(`Uppy Companion running on ${process.env.COMPANION_DOMAIN}`);
});
companion.socket(server, options);
