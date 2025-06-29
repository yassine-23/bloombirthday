// Package Base Prices
const PACKAGE_PRICES = {
    basic: 599,
    hero: 1099,
    premium: 2500,
    proposal_mini: 899,
    proposal_signature: 1799,
    proposal_luxe: 3600,
    gender_mini: 650,
    gender_signature: 1350,
    gender_luxe: 2799
};

// Add-on Prices
const ADDON_PRICES = {
    photography: 600,
    cake_upgrades: 500,
    visual_effects: 300,
    mini_tour: 100
};

// API Configuration
const API_CONFIG = {
    BASE_URL: process.env.NODE_ENV === 'production' 
        ? 'https://api.bloombirthday.com' 
        : 'http://localhost:3000',
    ENDPOINTS: {
        bookings: '/api/bookings',
        contact: '/api/contact'
    }
};

// Contact Information
const CONTACT_INFO = {
    phone: '+212625445661',
    email: 'contact@bloombirthday.com',
    whatsapp: 'https://wa.me/212625445661',
    location: 'Casablanca, Morocco'
};

// Form Validation Rules
const VALIDATION_RULES = {
    name: {
        minLength: 2,
        pattern: '^[A-Za-zÀ-ÖØ-öø-ÿ\' -]{2,}$'
    },
    phone: {
        minLength: 8,
        maxLength: 15,
        pattern: '^[0-9+ ]{8,15}$'
    },
    email: {
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    }
};

module.exports = {
    PACKAGE_PRICES,
    ADDON_PRICES,
    API_CONFIG,
    CONTACT_INFO,
    VALIDATION_RULES
}; 