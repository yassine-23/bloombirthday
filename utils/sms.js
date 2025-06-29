// SMS utility - placeholder implementation
// You can integrate with Twilio, Nexmo, or other SMS providers here

exports.sendSMS = async (booking) => {
  // Placeholder implementation - log instead of sending SMS
  console.log('SMS would be sent to:', booking.phone);
  console.log('Message: Thank you for booking with YourBirthday! We will contact you soon.');
  
  // If you want to integrate with a real SMS service, you can do it here
  // For example, with Twilio:
  // const twilio = require('twilio');
  // const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // await client.messages.create({
  //   body: `Thank you ${booking.name} for booking ${booking.package}!`,
  //   from: process.env.TWILIO_PHONE_NUMBER,
  //   to: booking.phone
  // });
  
  return Promise.resolve({ success: true, type: 'placeholder' });
}; 