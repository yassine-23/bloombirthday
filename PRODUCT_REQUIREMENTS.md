

## 1. Project State & Architecture

### 1.1. Overview
This document provides a complete technical breakdown of the "BloomBirthday" web application. It is intended for junior developers and AI agents to understand the project's current state and the roadmap for future enhancements. The project is a single-page application (SPA) with a Node.js backend, designed to showcase luxury birthday decoration services and capture booking leads.

### 1.2. Technical Architecture
- **Frontend:** Vanilla Stack
  - **Language:** HTML5, CSS3, JavaScript (ES6+)
  - **Styling:** Advanced CSS with custom properties, animations, glassmorphism effects, and a fully responsive layout using Flexbox and Grid. No CSS frameworks are used.
  - **Libraries:**
    - `Font Awesome`: For icons.
    - `Google Fonts`: For the 'Poppins' typeface.
- **Backend:** Node.js
  - **Framework:** Express.js
  - **Database:** The project is configured to use Airtable as its primary data store, with a graceful fallback to an in-memory array. A Mongoose `Booking.js` model exists but is not currently integrated into the API routes.
  - **Communication:** RESTful API for handling booking submissions.
- **Environment:**
  - **Runtime:** Node.js
  - **Dependencies:** Managed via `npm`.

### 1.3. Dependencies (`package.json`)
- **Production:**
  - `@sendgrid/mail`: For sending emails (e.g., booking confirmations).
  - `airtable`: To interact with the Airtable API.
  - `cors`: To handle Cross-Origin Resource Sharing.
  - `dotenv`: To manage environment variables.
  - `express`: Web server framework.
  - `express-validator`: For data validation (available but not used in routes).
  - `mongodb`: MongoDB driver.
  - `mongoose`: ORM for MongoDB (model defined but not used).
  - `twilio`: For sending SMS notifications.
- **Development:**
  - `jest`: For testing.

### 1.4. File Structure Overview
```
/
├── IMAGES/               # Static image assets
├── videos/               # Static video assets
├── models/
│   └── Booking.js        # Mongoose schema for bookings
├── routes/
│   └── bookings.js       # Express router for /api/bookings
├── utils/
│   ├── email.js          # (Assumed) Logic for SendGrid
│   └── sms.js            # (Assumed) Logic for Twilio
├── app.js                # Main frontend JavaScript file
├── index.html            # Main HTML document
├── server.js             # Main backend server entry point
├── styles.css            # Main stylesheet
├── package.json          # Project dependencies and scripts
└── PRODUCT_REQUIREMENTS.md # This document
```

---

## 2. Component Breakdown (Current Implementation)

This section details each component of the application as it currently exists.

### 2.1. Global Elements
- **`Header & Navigation`**
  - **HTML:** `<header>` containing a logo and `<nav>` links.
  - **CSS:** A "glassmorphism" effect, fixed to the top of the viewport. Becomes opaque on scroll.
  - **JS (`initializeHeader`)**: Implements a "magnetic" hover effect on navigation links.
- **`Floating WhatsApp Button`**
  - **HTML:** An `<a>` tag with a Font Awesome icon.
  - **CSS:** Fixed position on the top right.
- **`Booking Modal`**
  - **HTML:** A multi-step modal (`#booking-modal`) with 4 steps for package selection, date picking, and user info submission.
  - **CSS:** Uses a `glass-card` style. Initially hidden.
  - **JS (`initializeBookingModal`)**:
    - Handles opening/closing the modal.
    - Manages navigation between steps.
    - Updates a progress bar.
    - Simulates an API call on form submission with a 2-second timeout before showing a success message. **This does not currently hit the backend.**

### 2.2. Page Sections (`index.html`)
- **`Hero Section (#home)`**
  - **HTML:** Contains a background video, an overlay, and a `glass-card` for the main heading and CTAs.
  - **CSS:** Full-screen (`100vh`) with video background.
  - **JS (`initializeHeroSection`)**: Implements a parallax effect on the background video and content based on mouse movement.
- **`Services Section (#services)`**
  - **HTML:** A grid of expandable service "packages" and a grid of selectable "add-ons."
  - **CSS:** Uses CSS Grid for layout. Packages have background images and a `featured` variant.
  - **JS (`initializePackages`, `initializeAddOns`)**:
    - Adds 3D tilt effect to package cards on hover.
    - Expands/collapses package details on click.
    - Toggles a `.selected` class on add-ons and triggers a confetti animation.
- **`Music Library Section (#music-library)`**
  - **HTML:** A section to describe a "Guest Music Library" feature with a drag-and-drop file upload area.
  - **CSS:** Uses a two-column layout.
  - **JS (`initializeMusicLibrary`)**:
    - Implements full drag-and-drop functionality for the upload area.
    - Validates for audio files.
    - Dynamically creates and displays a list of uploaded files, with an option to remove them.
- **`About Us & Testimonials (#about, #testimonials)`**
  - **HTML:** Standard content sections with images and text. The testimonials section has a slider structure.
  - **JS (`initializeTestimonials`)**: Implements a simple JavaScript-powered slider that auto-plays and supports touch swipes.
- **`FAQ Section (#faq)`**
  - **HTML:** A list of question/answer pairs.
  - **JS (`initializeFAQ`)**: Implements an accordion, where clicking a question reveals the answer.

### 2.3. Backend (`server.js`)
- **Initialization:** Initializes an Express server, enables CORS, and parses JSON bodies.
- **Airtable Integration:** It's configured to connect to Airtable using credentials from `.env`. It passes the Airtable `base` object to the routers via `app.locals`.
- **Routing:** The server uses the `bookingsRouter` for all requests to `/api/bookings`.
- **API Endpoint (`routes/bookings.js`):**
  - `GET /api/bookings`: Fetches all records from the Airtable 'Bookings' table.
  - `POST /api/bookings`: Creates a new record in the Airtable 'Bookings' table. It includes basic validation.
  - **Fallback Logic:** If Airtable fails (e.g., bad credentials), the router switches to an in-memory `fallbackBookings` array for the remainder of the session.

---

## 3. Enhancement Roadmap & New Features

This section outlines the engineering tasks required to enhance the application and add new features.

### 3.1. Foundational Task: Connect Frontend to Backend
- **Objective:** Make the booking modal functional by sending its data to the backend API.
- **Technical Steps:**
  1.  In `app.js`, within the `initializeBookingModal` function, modify the form's `submit` event listener.
  2.  Instead of `setTimeout`, use the `fetch()` API to make a `POST` request to `/api/bookings`.
  3.  Construct the request body from the form fields (name, email, selected package, etc.).
  4.  Handle the API response:
      - On success, show the success step in the modal.
      - On error, show an error message to the user.
  5.  Ensure all environment variables for the backend (`.env` file) are correctly configured.

### 3.2. Feature: Interactive Public Booking Calendar
- **Objective:** Display booking availability to users in a visually appealing, interactive calendar.
- **Technical Steps:**
  1.  **Backend:**
      - Create a new API endpoint in `routes/bookings.js`: `GET /api/bookings/dates`.
      - This endpoint should query the data source (Airtable or fallback array) and return an array of all `eventDate` strings.
  2.  **Frontend:**
      - Add a new section in `index.html` for the calendar.
      - Create a new function in `app.js`, e.g., `initializeCalendar`.
      - In this function, `fetch` the booked dates from `/api/bookings/dates`.
      - **Calendar Generation:** Write logic to dynamically generate the calendar grid for the current month.
      - **Marking Dates:** When generating, check each date against the fetched array of booked dates.
          - If a date is booked, add a `.booked` class and render a candle icon (`<i class="fas fa-candle-holder"></i>` - requires adding this to Font Awesome or using an SVG).
      - **Interactivity:**
          - Add event listeners for next/previous month buttons, which will re-render the calendar.
          - Add hover listeners to booked dates to trigger a CSS animation (e.g., a candle glow).
  3.  **Integration:** Link the calendar to the booking modal. Clicking an *available* date should open the modal and pre-populate the date input.

### 3.3. Feature: Infinite Scroll Creative Gallery
- **Objective:** Showcase the company's work in a beautiful, endlessly scrolling gallery.
- **Technical Steps:**
  1.  **Backend:**
      - **Data Store:** It's recommended to use a dedicated solution like Cloudinary for image hosting and optimization, or a new table in Airtable to store image URLs and metadata (title, category).
      - **API Endpoint:** Create a new route file (`routes/gallery.js`) and an endpoint `GET /api/gallery`. This endpoint should support pagination (e.g., `GET /api/gallery?page=1&limit=10`). It will fetch image data from the chosen data store.
  2.  **Frontend:**
      - Add a new section in `index.html` for the gallery, including a container for the grid and a loading spinner element.
      - Create a new function in `app.js`, e.g., `initializeGallery`.
      - **Initial Load:** On page load, `fetch` the first page of images from `/api/gallery`.
      - **Render Images:** Write a function to take the image data and append new image elements to the gallery grid. Use a masonry layout library (like Masonry.js or CSS columns) for the Pinterest-style effect.
      - **Infinite Scroll:** Use an `IntersectionObserver` on the loading spinner at the bottom of the grid. When the spinner becomes visible in the viewport, trigger a `fetch` for the next page of images and increment the page counter.
      - **Lightbox:** Implement a simple lightbox for viewing images full-screen when clicked.

---

## 4. Deployment Strategy

- **Objective:** Get the full-stack application live on the internet.
- **Recommended Services:**
  - **Frontend:** Vercel or Netlify (excellent for static sites and can handle serverless functions).
  - **Backend:** Heroku, Render, or Railway (easy to deploy Node.js applications).
  - **Database:** MongoDB Atlas for the database (if migrating from Airtable) or continue with Airtable.
- **Deployment Steps:**
  1.  **Code Preparation:** Ensure there is a `build` script in `package.json` if a build step is needed.
  2.  **Environment Variables:** Configure all necessary environment variables (`AIRTABLE_API_KEY`, `SENDGRID_API_KEY`, etc.) in the chosen hosting provider's dashboard.
  3.  **Backend Deployment:** Connect your Git repository to the backend hosting provider (e.g., Heroku) and deploy the `main` branch.
  4.  **Frontend Deployment:**
      - Update the `fetch` URLs in `app.js` to point to your live backend URL (e.g., `https://your-app.herokuapp.com/api/bookings`).
      - Deploy the frontend code (including `index.html`, `styles.css`, `app.js`, and assets) to a static host like Vercel.
  5.  **CORS:** Ensure your backend CORS configuration (`server.js`) allows requests from your live frontend domain.
 