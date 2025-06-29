const express = require('express');
const router = express.Router();
const { sendConfirmationEmail } = require('../utils/email');
const { sendSMS } = require('../utils/sms');

// In-memory fallback storage for when Airtable is not available
let fallbackBookings = [];
let useAirtable = true;

// Helper to access the airtable table
function getBookingsTable(req) {
  const base = req.app.locals.airtableBase;
  const tableName = process.env.AIRTABLE_TABLE_NAME || 'Bookings';
  return base(tableName);
}

// GET /api/bookings - list all bookings
router.get('/', async (req, res) => {
  try {
    if (!useAirtable) {
      // Use fallback storage
      const bookings = fallbackBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json({ success: true, count: bookings.length, bookings, source: 'fallback' });
    }
    
    const records = await getBookingsTable(req).select({ sort: [{ field: 'createdAt', direction: 'desc' }] }).all();
    const bookings = records.map((r) => ({ id: r.id, ...r.fields }));
    res.json({ success: true, count: bookings.length, bookings, source: 'airtable' });
  } catch (err) {
    console.error('Error fetching bookings:', err);
    
    // Fallback to in-memory storage if Airtable fails
    if (err.statusCode === 403 || err.error === 'NOT_AUTHORIZED') {
      console.log('Airtable unauthorized, switching to fallback storage...');
      useAirtable = false;
      const bookings = fallbackBookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.json({ success: true, count: bookings.length, bookings, source: 'fallback' });
    }
    
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      selectedPackage, 
      eventDate, 
      selectedAddOns, 
      message, 
      balloonTheme, 
      occasion 
    } = req.body;
    
    // basic validation
    if (!name || !email || !phone || !selectedPackage || !eventDate) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Format add-ons for storage
    const formattedAddOns = (selectedAddOns || []).map(addon => {
      let addonText = `${addon.name} (${addon.price} MAD)`;
      if (addon.subOptions && addon.subOptions.length > 0) {
        addonText += ` - Options: ${addon.subOptions.join(', ')}`;
      }
      return addonText;
    }).join(' | ');

    const bookingData = {
      name,
      email,
      phone,
      package: selectedPackage.name,
      packagePrice: selectedPackage.price,
      eventDate,
      addOns: formattedAddOns,
      balloonTheme: balloonTheme || 'Not specified',
      occasion: occasion || 'Birthday',
      message: message || '',
      createdAt: new Date().toISOString(),
    };

    if (!useAirtable) {
      // Use fallback storage
      const booking = { 
        id: 'fallback_' + Date.now(), 
        ...bookingData 
      };
      fallbackBookings.push(booking);
      
      // Send email & SMS (fail silently)
      sendConfirmationEmail(booking).catch(console.error);
      sendSMS(booking).catch(console.error);
      
      return res.json({ success: true, bookingId: booking.id, source: 'fallback' });
    }

    const table = getBookingsTable(req);
    const created = await table.create(bookingData);

    const booking = { id: created.id, ...created.fields };

    // Send email & SMS (fail silently)
    sendConfirmationEmail(booking).catch(console.error);
    sendSMS(booking).catch(console.error);

    res.json({ success: true, bookingId: booking.id, source: 'airtable' });
  } catch (err) {
    console.error(err);
    
    // Fallback to in-memory storage if Airtable fails
    if (err.statusCode === 403 || err.error === 'NOT_AUTHORIZED') {
      console.log('Airtable unauthorized, switching to fallback storage...');
      useAirtable = false;
      
      const { 
        name, 
        email, 
        phone, 
        selectedPackage, 
        eventDate, 
        selectedAddOns, 
        message, 
        balloonTheme, 
        occasion 
      } = req.body;
      
      // Format add-ons for storage
      const formattedAddOns = (selectedAddOns || []).map(addon => {
        let addonText = `${addon.name} (${addon.price} MAD)`;
        if (addon.subOptions && addon.subOptions.length > 0) {
          addonText += ` - Options: ${addon.subOptions.join(', ')}`;
        }
        return addonText;
      }).join(' | ');

      const booking = { 
        id: 'fallback_' + Date.now(), 
        name,
        email,
        phone,
        package: selectedPackage.name,
        packagePrice: selectedPackage.price,
        eventDate,
        addOns: formattedAddOns,
        balloonTheme: balloonTheme || 'Not specified',
        occasion: occasion || 'Birthday',
        message: message || '',
        createdAt: new Date().toISOString(),
      };
      fallbackBookings.push(booking);
      
      // Send email & SMS (fail silently)
      sendConfirmationEmail(booking).catch(console.error);
      sendSMS(booking).catch(console.error);
      
      return res.json({ success: true, bookingId: booking.id, source: 'fallback' });
    }
    
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router; 