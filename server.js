import express from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import { app as companionApp, socket } from '@uppy/companion'

const app = express()
const PORT = process.env.PORT || 3020

// Session + Body Parser
app.use(bodyParser.json())
app.use(session({
  secret: process.env.COMPANION_SECRET || 'your-super-secret',
  resave: false,
  saveUninitialized: true
}))

// Companion Options
const options = {
  providerOptions: {
    drive: {
      key: process.env.GOOGLE_KEY,
      secret: process.env.GOOGLE_SECRET,
    },
    dropbox: {
      key: process.env.DROPBOX_KEY,
      secret: process.env.DROPBOX_SECRET,
    },
    onedrive: {
      key: process.env.ONEDRIVE_KEY,
      secret: process.env.ONEDRIVE_SECRET,
    }
  },
  server: {
    host: process.env.COMPANION_DOMAIN || 'http://localhost:3020',
    protocol: process.env.COMPANION_PROTOCOL || 'http'
  },
  filePath: '/tmp', // or your desired temp path
  secret: process.env.COMPANION_SECRET || 'your-super-secret',
  debug: true
}

// Mount Companion
app.use(companionApp(options))

// Start Server
const server = app.listen(PORT, () => {
  console.log(`🚀 Companion server running on http://localhost:${PORT}`)
})

// Enable Companion WebSocket (for real-time file progress)
socket(server, options)
