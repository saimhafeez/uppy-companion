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
  saveUninitialized: true,
  cookie: {
    secure: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  }
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

  // 🧩 Required by new Uppy versions
  uploadUrls: [process.env.UPLOAD_URL]
};

// ✅ Correct way to use middleware
const { app: companionApp } = companion.app(options);
app.use(companionApp);

const PORT = process.env.PORT || 3020;
const server = app.listen(PORT, () => {
  console.log(`✅ Uppy Companion running at ${options.server.protocol}://${options.server.host}`);
});

// ✅ Enable WebSocket support
companion.socket(server, options);
