const { Schema, model } = require('mongoose');

const BookingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    package: { type: String, required: true },
    eventDate: { type: Date, required: true },
    addOns: [String],
    message: String,
    guestCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model('Booking', BookingSchema); 