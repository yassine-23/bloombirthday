const sgMail = require('@sendgrid/mail');
const { CONTACT_INFO } = require('./config');

// Validate SendGrid API key
if (!process.env.SENDGRID_API_KEY) {
    console.warn('WARNING: SENDGRID_API_KEY is not set. Email notifications will be disabled.');
} else {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

exports.sendConfirmationEmail = async (booking) => {
    // Validate required booking data
    if (!booking || !booking.email || !booking.name || !booking.package || !booking.eventDate) {
        throw new Error('Missing required booking information for email confirmation');
    }

    // Skip if SendGrid is not configured
    if (!process.env.SENDGRID_API_KEY) {
        console.log('Skipping email confirmation - SendGrid not configured');
        return;
    }

    try {
        const msg = {
            to: booking.email,
            from: process.env.FROM_EMAIL || CONTACT_INFO.email,
            subject: 'BLOOMBIRTHDAY Booking Confirmation',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #d4af37;">Thank You for Choosing BLOOMBIRTHDAY!</h2>
                    <p>Dear ${booking.name},</p>
                    <p>We're excited to confirm your booking for the <strong>${booking.package}</strong> 
                    on ${new Date(booking.eventDate).toLocaleDateString()}.</p>
                    
                    <h3>Booking Details:</h3>
                    <ul>
                        <li>Package: ${booking.package}</li>
                        <li>Date: ${new Date(booking.eventDate).toLocaleDateString()}</li>
                        ${booking.addOns ? `<li>Add-ons: ${booking.addOns}</li>` : ''}
                    </ul>
                    
                    <p>Our team will contact you within 24 hours to discuss the details and finalize your booking.</p>
                    
                    <p>If you have any questions in the meantime, feel free to:</p>
                    <ul>
                        <li>Call us: ${CONTACT_INFO.phone}</li>
                        <li>WhatsApp: <a href="${CONTACT_INFO.whatsapp}">Click here</a></li>
                    </ul>
                    
                    <p>Best regards,<br>The BLOOMBIRTHDAY Team</p>
                </div>
            `,
            mailSettings: {
                sandboxMode: {
                    enable: process.env.SENDGRID_SANDBOX === 'true'
                }
            }
        };

        await sgMail.send(msg);
        console.log(`Confirmation email sent to ${booking.email}`);
    } catch (error) {
        console.error('Failed to send confirmation email:', error.message);
        // Don't throw the error - we don't want to fail the booking if email fails
        // But we might want to log it to a monitoring service in production
        if (process.env.NODE_ENV === 'production') {
            // TODO: Log to monitoring service
        }
    }
}; 