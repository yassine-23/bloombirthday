require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Airtable = require('airtable');
const bookingsRouter = require('./routes/bookings');

const app = express();

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// Serve static files
app.use(express.static('.'));

// Initialise Airtable client (with fallback for missing credentials)
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;
if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
  Airtable.configure({ apiKey: AIRTABLE_API_KEY });
  const base = Airtable.base(AIRTABLE_BASE_ID);
  app.locals.airtableBase = base;
} else {
  console.log('Airtable credentials not found, using fallback storage');
  app.locals.airtableBase = null;
}

app.use('/api/bookings', bookingsRouter);

// Serve the main HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 