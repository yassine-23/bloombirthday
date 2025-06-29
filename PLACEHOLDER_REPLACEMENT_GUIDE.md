# Placeholder Replacement Guide

## Quick Reference for Updating Image URLs

After generating images using the prompts in `IMAGE_PROMPTS.md`, use this guide to update the placeholder URLs in your codebase.

---

## 📄 HTML File Updates (`index.html`)

### Service Add-ons Section (Lines 172-207)

**1. Photography Add-on (Line 172)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/300x200/111111/d4af37?text=Event+Photography" alt="Photography Add-on">

<!-- WITH THIS -->
<img src="images/services/photography-addon.jpg" alt="Photography Add-on">
```

**2. Cake Add-on (Line 180)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/300x200/222222/d4af37?text=Custom+Theme+Cakes" alt="Cake Upgrades Add-on">

<!-- WITH THIS -->
<img src="images/services/cake-addon.jpg" alt="Cake Upgrades Add-on">
```

**3. Custom Signage - Name Sign (Line 189)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/400x300/000000/d4af37?text=Custom+Name+Sign" alt="Custom Name Sign">

<!-- WITH THIS -->
<img src="images/services/signage-name.jpg" alt="Custom Name Sign">
```

**4. Custom Signage - Birthday Banner (Line 192)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/400x300/111111/d4af37?text=Festive+Birthday+Banner" alt="Birthday Banner">

<!-- WITH THIS -->
<img src="images/services/signage-banner.jpg" alt="Birthday Banner">
```

**5. Custom Signage - Event Sign (Line 195)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/400x300/222222/d4af37?text=Elegant+Event+Sign" alt="Custom Event Sign">

<!-- WITH THIS -->
<img src="images/services/signage-event.jpg" alt="Custom Event Sign">
```

**6. Party Favors (Line 207)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/300x200/333333/d4af37?text=Themed+Party+Favors" alt="Party Favors Add-on">

<!-- WITH THIS -->
<img src="images/services/party-favors.jpg" alt="Party Favors Add-on">
```

### Music Library Section (Line 226)

**7. DJ Setup (Line 226)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/600x450/111111/d4af37?text=DJ+Setup+with+Party+Lights" alt="Music library" class="glass-card">

<!-- WITH THIS -->
<img src="images/music/dj-setup.jpg" alt="Music library" class="glass-card">
```

### About Us Section (Line 258)

**8. Team Spirit (Line 258)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/600x400/111111/d4af37?text=YourBirthday+Team+Spirit" alt="About YourBirthday">

<!-- WITH THIS -->
<img src="images/about/team-spirit.jpg" alt="About YourBirthday">
```

### Testimonials Section (Lines 294-308)

**9. Client Fatima B. (Line 294)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/80x80/222222/d4af37?text=FB" alt="Client Fatima B." class="client-image">

<!-- WITH THIS -->
<img src="images/testimonials/client-fatima.jpg" alt="Client Fatima B." class="client-image">
```

**10. Client Mohammed A. (Line 301)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/80x80/333333/d4af37?text=MA" alt="Client Mohammed A." class="client-image">

<!-- WITH THIS -->
<img src="images/testimonials/client-mohammed.jpg" alt="Client Mohammed A." class="client-image">
```

**11. Client Laila M. (Line 308)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/80x80/444444/d4af37?text=LM" alt="Client Laila M." class="client-image">

<!-- WITH THIS -->
<img src="images/testimonials/client-laila.jpg" alt="Client Laila M." class="client-image">
```

### Booking Modal Section (Lines 429-439)

**12. Basic Package (Line 429)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/300x200/111111/d4af37?text=Basic+Package+Visual" alt="Basic Package">

<!-- WITH THIS -->
<img src="images/packages/basic-package.jpg" alt="Basic Package">
```

**13. Standard Package (Line 434)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/300x200/222222/d4af37?text=Standard+Package+Visual" alt="Standard Package">

<!-- WITH THIS -->
<img src="images/packages/standard-package.jpg" alt="Standard Package">
```

**14. Premium Package (Line 439)**
```html
<!-- REPLACE THIS -->
<img src="https://placehold.co/300x200/333333/d4af37?text=Premium+Package+Visual" alt="Premium Package">

<!-- WITH THIS -->
<img src="images/packages/premium-package.jpg" alt="Premium Package">
```

---

## 🎨 CSS File Updates (`styles.css`)

### Hero Section Background (Line 664)

**15. Hero Background (Line 664)**
```css
/* REPLACE THIS */
background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://placehold.co/1920x1080/000000/d4af37?text=Magical+Birthday+Celebration');

/* WITH THIS */
background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('images/hero/background-fallback.jpg');
```

---

## 🚀 Implementation Steps

### Step 1: Create Directory Structure
```bash
mkdir -p images/{hero,services,music,about,testimonials,packages}
```

### Step 2: Generate Images
Use the prompts from `IMAGE_PROMPTS.md` to generate all 17 images using your preferred AI image generation tool (DALL-E, Midjourney, Stable Diffusion, etc.).

### Step 3: Optimize Images
- Compress images for web use
- Create WebP versions for modern browsers
- Ensure proper dimensions for each image

### Step 4: Update Files
Replace all placeholder URLs using the mappings above.

### Step 5: Test
- Check that all images load correctly
- Verify responsive behavior on different screen sizes
- Test image loading performance

---

## 📱 Responsive Image Considerations

For better performance and user experience, consider implementing responsive images:

```html
<!-- Example for service add-on images -->
<picture>
  <source srcset="images/services/photography-addon.webp" type="image/webp">
  <source srcset="images/services/photography-addon.jpg" type="image/jpeg">
  <img src="images/services/photography-addon.jpg" alt="Photography Add-on" loading="lazy">
</picture>
```

---

## 🔧 Additional Improvements

### Lazy Loading
Add `loading="lazy"` attribute to images below the fold:
```html
<img src="images/about/team-spirit.jpg" alt="About YourBirthday" loading="lazy">
```

### Alt Text Optimization
Ensure all alt text is descriptive and SEO-friendly:
```html
<img src="images/services/photography-addon.jpg" alt="Professional event photographer capturing luxury birthday party moments">
```

### Image Preloading
For critical images (hero section), consider preloading:
```html
<link rel="preload" as="image" href="images/hero/background-fallback.jpg">
``` 