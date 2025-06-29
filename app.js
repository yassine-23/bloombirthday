// BLOOMBIRTHDAY - Advanced UI/UX Implementation
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initializeHeader();
    initializeHeroSection();
    initializeGallery();
    initializePackages();
    initializeAddOns();
    initializeAnimations();
    initializeBookingModal();
    initializeMusicLibrary();
    initializeFAQ();
    initializeTestimonials();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeInteractiveElements();
});

// Header & Navigation
function initializeHeader() {
    const header = document.querySelector('header');
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    header.appendChild(scrollProgress);
    
    // Magnetic nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0, 0)';
        });
    });
}

// Hero Section Parallax
function initializeHeroSection() {
    const hero = document.querySelector('.hero');
    const videoBg = document.querySelector('.video-bg');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && videoBg) {
        // Parallax on mouse move
        hero.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            videoBg.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(1.1)`;
            heroContent.style.transform = `translate(${-x * 0.5}px, ${-y * 0.5}px)`;
        });
        
        // Smooth scroll indicator
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = `
            <div class="mouse">
                <div class="wheel"></div>
            </div>
            <div class="arrows">
                <span></span>
                <span></span>
            </div>
        `;
        hero.appendChild(scrollIndicator);
    }
}

// Modern Product Catalog Gallery
function initializeGallery() {
    console.log('🎨 Initializing modern product catalog...');
    
    // Check if gallery elements exist
    const gallerySection = document.getElementById('gallery');
    const catalogGrid = document.getElementById('catalog-grid');
    
    if (!gallerySection || !catalogGrid) {
        console.error('❌ Gallery elements not found!');
        return;
    }
    
    console.log('✅ Gallery elements found, proceeding with initialization...');
    
    // Add loading state
    catalogGrid.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Loading gallery...</div>';
    
    // Professional product catalog data
    const products = [
        {
            image: 'IMAGES/backdrop main3.png',
            title: 'Premium Backdrop Collection',
            description: 'Elegant and sophisticated backdrop designs perfect for memorable birthday celebrations',
            badge: 'Popular'
        },
        {
            image: 'IMAGES/mpp .png',
            title: 'Hero Package Setup',
            description: 'Complete party setup with premium decorations and professional styling',
            badge: 'Featured'
        },
        {
            image: 'IMAGES/popularb.png',
            title: 'Popular Birthday Theme',
            description: 'Our most requested birthday decoration theme with stunning visual appeal',
            badge: 'Trending'
        },
        {
            image: 'IMAGES/custumsetfancy1.webp',
            title: 'Custom Fancy Collection',
            description: 'Luxurious custom decorations tailored to your unique celebration style',
            badge: 'Premium'
        },
        {
            image: 'IMAGES/LUX1.webp',
            title: 'Luxury Experience',
            description: 'Ultra-premium decoration package for the most exclusive celebrations',
            badge: 'Luxury'
        },
        {
            image: 'IMAGES/ballon1.webp',
            title: 'Gold & Pink Balloons',
            description: 'Elegant balloon arrangements in sophisticated gold and pink color schemes',
            badge: 'Classic'
        },
        {
            image: 'IMAGES/ADD1.png',
            title: 'Special Add-ons',
            description: 'Premium additional decorative elements to enhance your celebration',
            badge: 'Add-on'
        },
        {
            image: 'IMAGES/CAKE1.png',
            title: 'Custom Birthday Cakes',
            description: 'Beautifully designed custom cakes that complement your decoration theme',
            badge: 'Sweet'
        },
        {
            image: 'IMAGES/LUX2.png',
            title: 'Luxury Setup Premium',
            description: 'Exclusive high-end decoration setup for sophisticated celebrations',
            badge: 'Exclusive'
        },
        {
            image: 'IMAGES/custume min touer .png',
            title: 'Custom Mini Tower',
            description: 'Unique decorative tower elements for distinctive party aesthetics',
            badge: 'Unique'
        },
        {
            image: 'IMAGES/blooncolors.png',
            title: 'Colorful Balloon Mix',
            description: 'Vibrant and cheerful balloon arrangements in various color combinations',
            badge: 'Colorful'
        },
        {
            image: 'IMAGES/custumsetfancy2.webp',
            title: 'Fancy Custom Set 2',
            description: 'Second edition of our premium custom decoration collection',
            badge: 'New'
        }
    ];

    console.log(`📸 Creating modern catalog with ${products.length} products`);

    // Clear existing content
    catalogGrid.innerHTML = '';
    
    // Create catalog items
    products.forEach((product, index) => {
        const catalogItem = createCatalogItem(product, index);
        catalogGrid.appendChild(catalogItem);
    });
    
    // Initialize view more button
    initializeViewMoreButton();
    
    console.log('✨ Modern product catalog initialized successfully!');
}

function createCatalogItem(product, index) {
    const catalogItem = document.createElement('div');
    catalogItem.className = 'catalog-item';
    catalogItem.setAttribute('data-aos', 'fade-up');
    catalogItem.setAttribute('data-aos-delay', `${index * 100}`);
    
    catalogItem.innerHTML = `
        <div class="catalog-item-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <div class="catalog-item-overlay"></div>
            ${product.badge ? `<div class="catalog-item-badge">${product.badge}</div>` : ''}
        </div>
        <div class="catalog-item-content">
            <h3 class="catalog-item-title">${product.title}</h3>
            <p class="catalog-item-description">${product.description}</p>
        </div>
    `;
    
    // Add error handling for images
    const img = catalogItem.querySelector('img');
    img.addEventListener('error', () => {
        console.warn(`⚠️ Image failed to load: ${product.image}`);
        // Replace with placeholder instead of hiding
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzIwMjAyMCIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjIwMCIgeT0iMTUwIiBzdHlsZT0iZmlsbDojZDRhZjM3O2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjE2cHg7Zm9udC1mYW1pbHk6QXJpYWwsc2Fucy1zZXJpZiI+QkxPT01CSVJUSERBWSA8L3RleHQ+PC9zdmc+';
        img.alt = 'BLOOMBIRTHDAY Placeholder';
    });
    
    // Add click handler for product interaction
    catalogItem.addEventListener('click', () => {
        console.log(`🖼️ Clicked on: ${product.title}`);
        openProductModal(product);
    });
    
    return catalogItem;
}

function initializeViewMoreButton() {
    const viewMoreBtn = document.getElementById('view-more-btn');
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', () => {
            console.log('📋 View more products clicked');
            // Future: Load more products or navigate to full catalog page
            showNotification('More designs coming soon!', 'info');
        });
    }
}

function openProductModal(product) {
    // Future: Implement product detail modal
    console.log(`Opening modal for: ${product.title}`);
    showNotification(`${product.title} - Contact us for more details!`, 'info');
}

// Enhanced Package Cards
function initializePackages() {
    const packages = document.querySelectorAll('.package');
    
    packages.forEach((pkg, index) => {
        // Stagger animation
        pkg.style.animationDelay = `${index * 0.1}s`;
        
        // 3D tilt effect
        pkg.addEventListener('mousemove', (e) => {
            const rect = pkg.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const tiltX = (y - 0.5) * 10;
            const tiltY = (x - 0.5) * -10;
            
            pkg.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(20px)`;
        });
        
        pkg.addEventListener('mouseleave', () => {
            pkg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
        
        // Click to expand with smooth animation
        pkg.addEventListener('click', function(e) {
            if (e.target.closest('.btn')) return;
            
            // Close others
            packages.forEach(other => {
                if (other !== pkg) {
                    other.classList.remove('expanded');
                }
            });
            
            // Toggle current
            pkg.classList.toggle('expanded');
            
            // Smooth scroll into view
            if (pkg.classList.contains('expanded')) {
                setTimeout(() => {
                    pkg.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 300);
            }
        });
    });
}

// Enhanced Add-ons with Advanced Interactions
function initializeAddOns() {
    const addOns = document.querySelectorAll('.add-on');
    const selectedAddOns = new Set();
    
    addOns.forEach((addon, index) => {
        // Stagger animation
        addon.style.animationDelay = `${index * 0.1 + 0.3}s`;
        
        // Hover effect with glow
        addon.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 40px rgba(212, 175, 55, 0.3)';
        });
        
        addon.addEventListener('mouseleave', function() {
            if (!this.classList.contains('selected')) {
                this.style.boxShadow = '';
            }
        });
        
        // Click to expand
        addon.addEventListener('click', function(e) {
            if (e.target.closest('.select-addon') || e.target.closest('input')) return;
            
            // Close others
            addOns.forEach(other => {
                if (other !== addon) {
                    other.classList.remove('expanded');
                }
            });
            
            addon.classList.toggle('expanded');
        });
        
        // Select button functionality
        const selectBtn = addon.querySelector('.select-addon');
        if (selectBtn) {
            selectBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                addon.classList.toggle('selected');
                const addonId = addon.dataset.addonId;
                
                if (addon.classList.contains('selected')) {
                    selectedAddOns.add(addonId);
                    selectBtn.textContent = 'Selected ✓';
                    selectBtn.classList.add('selected');
                    
                    // Celebration animation
                    createMiniConfetti(addon);
                } else {
                    selectedAddOns.delete(addonId);
                    selectBtn.textContent = 'Select Add-on';
                    selectBtn.classList.remove('selected');
                }
                
                updateTotalPrice();
            });
        }
    });
}

// Advanced Scroll Animations
function initializeAnimations() {
    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate children with stagger
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('animate-on-scroll');
        observer.observe(section);
    });
    
    // Observe cards and other elements
    document.querySelectorAll('.package, .add-on, .testimonial, .faq-item').forEach(el => {
        el.classList.add('animate-child');
    });
}

// Enhanced Booking Modal
function initializeBookingModal() {
    const modal = document.getElementById('booking-modal');
    const bookButtons = document.querySelectorAll('.book-now-btn');
    const closeBtn = document.getElementById('close-booking-modal');
    const steps = document.querySelectorAll('.modal-step');
    let currentStep = 0;
    
    // Open modal with animation
    bookButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Populate package options
            populatePackageOptions();
            
            // Reset to first step
            showStep(0);
        });
    });
    
    // Close modal
    closeBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            currentStep = 0;
            showStep(0);
        }, 300);
    }
    
    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        currentStep = stepIndex;
        
        // Update progress bar
        updateProgressBar();
    }
    
    function updateProgressBar() {
        const progress = ((currentStep + 1) / steps.length) * 100;
        const progressBar = modal.querySelector('.modal-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }
    
    // Navigation between steps
    document.querySelectorAll('[id^="modal-next-step"]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateCurrentStep()) {
            if (currentStep < steps.length - 1) {
                showStep(currentStep + 1);
                }
            }
        });
    });
    
    document.querySelectorAll('[id^="modal-prev-step"]').forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                showStep(currentStep - 1);
            }
        });
    });

    // Date input validation
    const eventDateInput = document.getElementById('event-date');
    if (eventDateInput) {
        // Set minimum date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        eventDateInput.min = tomorrow.toISOString().split('T')[0];
        
        eventDateInput.addEventListener('change', function() {
            const nextBtn = document.getElementById('modal-next-step-2');
            if (this.value) {
                nextBtn.disabled = false;
                // Update booking summary
                updateBookingSummary();
            } else {
                nextBtn.disabled = true;
            }
        });
    }
    
    // Form submission
    const bookingForm = document.getElementById('modal-booking-form');
    bookingForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        
        try {
            // Collect form data
            const formData = new FormData(bookingForm);
            const bookingData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                balloonTheme: formData.get('balloonTheme'),
                message: formData.get('message'),
                selectedPackage: getSelectedPackage(),
                selectedAddOns: getSelectedAddOns(),
                eventDate: document.getElementById('event-date').value,
                occasion: document.getElementById('occasion-select').value
            };

            // Validate required fields
            if (!bookingData.name || !bookingData.email || !bookingData.phone || 
                !bookingData.eventDate || !bookingData.selectedPackage || !bookingData.occasion) {
                throw new Error('Please fill in all required fields');
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(bookingData.email)) {
                throw new Error('Please enter a valid email address');
            }
            
            // Validate phone format (Morocco)
            const phoneRegex = /^(\+212|0)[5-7]\d{8}$/;
            const cleanPhone = bookingData.phone.replace(/\s/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                throw new Error('Please enter a valid Moroccan phone number');
            }

            // Send to backend API
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Booking failed');
            }

            // Show success step
            showSuccessStep(result);
            
            // Create celebration
            createConfetti();
            
            // Reset form after delay
            setTimeout(() => {
                closeModal();
                bookingForm.reset();
                resetBookingState();
            }, 5000);

        } catch (error) {
            console.error('Booking error:', error);
            showErrorStep(error.message);
        } finally {
            // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
        }
    });

    // Populate package options in modal
    function populatePackageOptions() {
        const packageOptionsContainer = document.getElementById('package-options-dynamic');
        const packages = [
            {
                name: 'Basic Package',
                price: 'Starting at 599 MAD',
                image: 'IMAGES/ballon3.png',
                description: 'Perfect for intimate gatherings'
            },
            {
                name: 'Hero Backdrop Package',
                price: 'Starting at 1,099 MAD',
                image: 'IMAGES/mpp .png',
                description: 'Most popular choice with premium decorations',
                featured: true
            },
            {
                name: 'Premium Package',
                price: 'Starting at 2,500 MAD',
                image: 'IMAGES/popularb.png',
                description: 'Ultimate luxury experience'
            }
        ];

        packageOptionsContainer.innerHTML = packages.map(pkg => `
            <div class="package-option ${pkg.featured ? 'featured' : ''}" data-package="${pkg.name}">
                <img src="${pkg.image}" alt="${pkg.name}" onerror="this.style.display='none'">
                <h3>${pkg.name}</h3>
                <p class="price">${pkg.price}</p>
                <p class="description">${pkg.description}</p>
                ${pkg.featured ? '<span class="featured-badge">Most Popular</span>' : ''}
            </div>
        `).join('');

        // Add click listeners to package options
        document.querySelectorAll('.package-option').forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                document.querySelectorAll('.package-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Enable next button
                const nextBtn = document.getElementById('modal-next-step-1');
                nextBtn.disabled = false;
            });
        });
    }

    // Validate current step before proceeding
    function validateCurrentStep() {
        switch(currentStep) {
            case 0: // Package selection
                const selectedPackage = document.querySelector('.package-option.selected');
                if (!selectedPackage) {
                    showNotification('Please select a package to continue', 'error');
                    return false;
                }
                return true;
            
            case 1: // Date selection
                const eventDate = document.getElementById('event-date').value;
                if (!eventDate) {
                    showNotification('Please select an event date to continue', 'error');
                    return false;
                }
                
                // Check if date is in the future
                const selectedDate = new Date(eventDate);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                
                if (selectedDate < today) {
                    showNotification('Please select a future date for your event', 'error');
                    return false;
                }
                return true;
            
            default:
                return true;
        }
    }

    // Helper functions for booking data collection
    function getSelectedPackage() {
        const selectedPackageOption = document.querySelector('.package-option.selected');
        if (selectedPackageOption) {
            return {
                name: selectedPackageOption.querySelector('h3').textContent,
                price: selectedPackageOption.querySelector('.price').textContent
            };
        }
        return null;
    }

    function getSelectedAddOns() {
        const selectedAddOns = [];
        document.querySelectorAll('.add-on.selected').forEach(addon => {
            const addonData = {
                id: addon.dataset.addonId,
                name: addon.dataset.addonName,
                price: addon.dataset.price
            };
            
            // Check for sub-options (like cake options)
            const subOptions = [];
            addon.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                subOptions.push(checkbox.value);
            });
            
            if (subOptions.length > 0) {
                addonData.subOptions = subOptions;
            }
            
            selectedAddOns.push(addonData);
        });
        return selectedAddOns;
    }

    function showSuccessStep(result) {
        const finalStep = document.getElementById('booking-modal-step-final');
        finalStep.innerHTML = `
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h2>Booking Request Sent Successfully!</h2>
                <p>Thank you for choosing BloomBirthday! We've received your booking request.</p>
                <div class="booking-details">
                    <p><strong>Booking ID:</strong> ${result.bookingId}</p>
                    <p><strong>Status:</strong> Pending Confirmation</p>
                </div>
                <p>We'll contact you within 24 hours to confirm your event details and finalize the booking.</p>
                <p>A confirmation email has been sent to your email address.</p>
            </div>
        `;
        showStep(steps.length - 1);
    }

    function showErrorStep(errorMessage) {
        const finalStep = document.getElementById('booking-modal-step-final');
        finalStep.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Booking Failed</h2>
                <p>We're sorry, but there was an issue processing your booking request.</p>
                <p><strong>Error:</strong> ${errorMessage}</p>
                <p>Please try again or contact us directly at:</p>
                <div class="contact-info">
                    <p><i class="fas fa-phone"></i> +212 625-445661</p>
                    <p><i class="fas fa-envelope"></i> info@bloombirthday.com</p>
                </div>
                <button class="btn secondary-btn" onclick="location.reload()">Try Again</button>
            </div>
        `;
        showStep(steps.length - 1);
    }

    function resetBookingState() {
        // Clear selected packages and add-ons
        document.querySelectorAll('.package-option.selected').forEach(el => {
            el.classList.remove('selected');
        });
        document.querySelectorAll('.add-on.selected').forEach(el => {
            el.classList.remove('selected');
            const btn = el.querySelector('.select-addon');
            if (btn) {
                btn.textContent = 'Select Add-on';
                btn.classList.remove('selected');
            }
        });
        
        // Reset form fields
        document.getElementById('occasion-select').value = '';
        document.getElementById('event-date').value = '';
        
        // Reset theme selection
        document.querySelectorAll('.theme-option').forEach(option => {
            option.classList.remove('selected');
            const radio = option.querySelector('input[type="radio"]');
            if (radio) radio.checked = false;
        });
    }
    
    // Update booking summary when selections change
    function updateBookingSummary() {
        const summaryDiv = document.getElementById('booking-summary');
        if (!summaryDiv) return;
        
        const selectedPackage = getSelectedPackage();
        const selectedAddOns = getSelectedAddOns();
        const eventDate = document.getElementById('event-date')?.value;
        const occasion = document.getElementById('occasion-select')?.value;
        
        let summaryHTML = '<h4>Booking Summary:</h4>';
        
        if (occasion) {
            summaryHTML += `<p><strong>Occasion:</strong> ${occasion.charAt(0).toUpperCase() + occasion.slice(1)}</p>`;
        }
        
        if (selectedPackage) {
            summaryHTML += `<p><strong>Package:</strong> ${selectedPackage.name} - ${selectedPackage.price}</p>`;
        }
        
        if (selectedAddOns.length > 0) {
            summaryHTML += '<p><strong>Add-ons:</strong></p><ul>';
            selectedAddOns.forEach(addon => {
                summaryHTML += `<li>${addon.name} - ${addon.price} MAD`;
                if (addon.subOptions && addon.subOptions.length > 0) {
                    summaryHTML += '<ul>';
                    addon.subOptions.forEach(option => {
                        summaryHTML += `<li>${option}</li>`;
                    });
                    summaryHTML += '</ul>';
                }
                summaryHTML += '</li>';
            });
            summaryHTML += '</ul>';
        }
        
        if (eventDate) {
            const date = new Date(eventDate);
            const formattedDate = date.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            summaryHTML += `<p><strong>Event Date:</strong> ${formattedDate}</p>`;
        }
        
        summaryDiv.innerHTML = summaryHTML;
    }
    
    // Add occasion dropdown change listener
    const occasionSelect = document.getElementById('occasion-select');
    if (occasionSelect) {
        occasionSelect.addEventListener('change', function() {
            updateBookingSummary();
        });
    }
}

// Music Library with Drag & Drop
function initializeMusicLibrary() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.querySelector('#music-upload');
    const uploadedFiles = document.querySelector('.uploaded-files');
    
    if (!uploadArea || !fileInput) return;
    
    // Drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.add('drag-over');
        });
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => {
            uploadArea.classList.remove('drag-over');
        });
    });
    
    uploadArea.addEventListener('drop', (e) => {
        const files = e.dataTransfer.files;
        handleFiles(files);
    });
    
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    function handleFiles(files) {
        ([...files]).forEach(uploadFile);
    }
    
    function uploadFile(file) {
        if (!file.type.startsWith('audio/')) {
            showNotification('Please upload audio files only', 'error');
            return;
        }
        
        const fileElement = createFileElement(file);
        uploadedFiles.appendChild(fileElement);
        uploadedFiles.classList.add('has-files');
        
        // Animate in
        setTimeout(() => {
            fileElement.classList.add('show');
        }, 10);
    }
    
    function createFileElement(file) {
        const div = document.createElement('div');
        div.className = 'uploaded-file';
        div.innerHTML = `
            <i class="fas fa-music"></i>
            <div class="file-info">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${formatFileSize(file.size)}</span>
            </div>
            <button class="remove-file"><i class="fas fa-times"></i></button>
        `;
        
        div.querySelector('.remove-file').addEventListener('click', () => {
            div.classList.add('removing');
            setTimeout(() => {
                div.remove();
                if (!uploadedFiles.children.length) {
                    uploadedFiles.classList.remove('has-files');
                }
            }, 300);
        });
        
        return div;
    }
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                
                // Smooth height animation
                const answer = item.querySelector('.faq-answer');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

// Testimonial Slider
function initializeTestimonials() {
    const slider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    if (!slider || testimonials.length === 0) return;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
            testimonial.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentIndex);
    }
    
    prevBtn?.addEventListener('click', prevTestimonial);
    nextBtn?.addEventListener('click', nextTestimonial);
    
    // Auto-play
    setInterval(nextTestimonial, 5000);
    
    // Initialize
    showTestimonial(0);
    
    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextTestimonial();
        if (touchEndX > touchStartX + 50) prevTestimonial();
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu?.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.remove('active');
            navLinks?.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    const header = document.querySelector('header');
    const backToTop = createBackToTopButton();
    const scrollProgress = document.querySelector('.scroll-progress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Header scroll effect
        header.classList.toggle('scrolled', scrollTop > 50);
        
        // Progress bar
        if (scrollProgress) {
            scrollProgress.style.width = `${scrollPercent}%`;
        }
        
        // Back to top visibility
        backToTop.classList.toggle('visible', scrollTop > 300);
    });
    
    function createBackToTopButton() {
        const btn = document.createElement('div');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(btn);
        
        btn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        return btn;
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Ripple effect on buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Utility Functions
function createConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);
    
    const colors = ['#d4af37', '#ffffff', '#f9ca24', '#ffbe76', '#f0932b'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 5) + 's';
        container.appendChild(confetti);
    }
    
    setTimeout(() => {
        container.remove();
    }, 8000);
}

function createMiniConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#d4af37', '#ffffff', '#f9ca24'];
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'mini-confetti';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 20;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.setProperty('--vx', vx + 'px');
        particle.style.setProperty('--vy', vy + 'px');
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function updateTotalPrice() {
    // This would calculate and update the total price
    // based on selected packages and add-ons
    console.log('Updating total price...');
}

// Export for use in other modules if needed
window.BloomBirthday = {
    showNotification,
    createConfetti,
    updateTotalPrice
};