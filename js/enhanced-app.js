// Enhanced BLOOM Birthday App with Cart & Package Management
class EnhancedBloomApp {
  constructor() {
    this.init();
    this.setupEventListeners();
    this.initializeAnimations();
    this.setupLazyLoading();
    this.initializeModals();
    this.setupFormValidation();
    this.initializeCart();
    this.initializePackages();
    this.initStepNavigation();
  }

  init() {
    // Check for reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize state
    this.state = {
      currentStep: 1,
      totalSteps: 4,
      selectedPackage: null,
      selectedAddons: new Set(),
      cart: {
        items: [],
        total: 0,
        subtotal: 0,
        addonsTotal: 0
      },
      formData: {},
      isLoading: false
    };
    
    // Package definitions with enhanced features
    this.packages = {
      basic: {
        id: 'basic',
        name: 'Basic Bloom',
        icon: 'fas fa-gift',
        price: 599,
        description: 'Perfect for intimate celebrations',
        features: [
          'Basic balloon arrangement',
          'Simple backdrop setup',
          'Number balloons',
          'Setup & cleanup',
          '2-hour event duration'
        ],
        gallery: ['ADD1.png', 'ADD2.png'],
        popular: false
      },
      premium: {
        id: 'premium',
        name: 'Premium Bloom',
        icon: 'fas fa-star',
        price: 1299,
        description: 'Most popular choice for memorable celebrations',
        features: [
          'Luxury balloon arrangements',
          'Professional backdrop',
          'Custom cake (medium)',
          'Photography session (1 hour)',
          'Setup & cleanup',
          '4-hour event duration'
        ],
        gallery: ['LUX1.webp', 'LUX2.png'],
        popular: true
      },
      luxury: {
        id: 'luxury',
        name: 'Luxury Bloom',
        icon: 'fas fa-crown',
        price: 2499,
        description: 'Ultimate luxury experience',
        features: [
          'Premium balloon arrangements',
          'Luxury backdrop & signage',
          'Custom cake (large)',
          'Professional photography (3 hours)',
          'Music & entertainment',
          'Setup & cleanup',
          '6-hour event duration'
        ],
        gallery: ['LUX3.png', 'CAKE1.png'],
        popular: false
      },
      wedding: {
        id: 'wedding',
        name: 'Wedding Proposal',
        icon: 'fas fa-heart',
        price: 3000,
        description: 'Make your proposal unforgettable',
        features: [
          'Romantic balloon arrangements',
          'Luxury proposal setup',
          'Custom engagement cake',
          'Professional videographer (4 hours)',
          'Live musician/DJ',
          'Champagne service',
          'Photographer & coordinator',
          'Setup & cleanup',
          'All-day event support'
        ],
        gallery: ['custumsetfancy1.webp', 'custumsetfancy2.webp'],
        popular: false
      }
    };

    // Available add-ons
    this.addons = {
      photography: {
        id: 'photography',
        name: 'Extra Photography',
        description: 'Additional hour of professional photography',
        price: 200,
        category: 'photography'
      },
      balloons: {
        id: 'balloons',
        name: 'Premium Balloons',
        description: 'Upgrade to metallic and specialty balloons',
        price: 150,
        category: 'decorations'
      },
      music: {
        id: 'music',
        name: 'DJ Services',
        description: 'Professional DJ for 2 hours',
        price: 300,
        category: 'entertainment'
      },
      cake: {
        id: 'cake',
        name: 'Cake Upgrade',
        description: 'Upgrade to premium custom cake design',
        price: 250,
        category: 'catering'
      },
      flowers: {
        id: 'flowers',
        name: 'Fresh Flowers',
        description: 'Beautiful fresh flower arrangements',
        price: 180,
        category: 'decorations'
      },
      lighting: {
        id: 'lighting',
        name: 'LED Lighting',
        description: 'Professional LED mood lighting',
        price: 220,
        category: 'decorations'
      }
    };
    
    // Initialize navigation
    this.initNavigation();
  }

  // Enhanced Package System
  initializePackages() {
    this.renderPackages();
    this.setupPackageInteractions();
  }

  renderPackages() {
    const packagesContainer = document.querySelector('.packages-grid');
    if (!packagesContainer) return;

    packagesContainer.innerHTML = '';

    Object.values(this.packages).forEach(package => {
      const packageCard = this.createPackageCard(package);
      packagesContainer.appendChild(packageCard);
    });
  }

  createPackageCard(package) {
    const card = document.createElement('div');
    card.className = `package-card ${package.popular ? 'package-card--featured' : ''} ${package.id === 'wedding' ? 'package-card--wedding' : ''}`;
    card.dataset.package = package.id;

    card.innerHTML = `
      <div class="package-card__header">
        <div class="package-card__icon">
          <i class="${package.icon}"></i>
        </div>
        <h3 class="package-card__name">${package.name}</h3>
        <p class="package-card__description">${package.description}</p>
        <div class="package-card__pricing">
          <div class="package-card__price">
            <span class="package-card__price-currency">MAD</span>
            <span class="package-card__price-amount">${package.price}</span>
          </div>
        </div>
      </div>
      
      <div class="package-card__features">
        <h4 class="package-card__features-title">What's Included</h4>
        <ul class="package-card__feature-list">
          ${package.features.map(feature => `
            <li class="package-card__feature">
              <span class="package-card__feature-icon">
                <i class="fas fa-check"></i>
              </span>
              ${feature}
            </li>
          `).join('')}
        </ul>
      </div>
      
      <div class="package-card__addons">
        <h4 class="package-card__addons-title">Popular Add-ons</h4>
        <div class="package-card__addon-list" id="addons-${package.id}">
          <!-- Add-ons will be populated here -->
        </div>
      </div>
      
      <div class="package-card__actions">
        <button class="package-card__select-btn" data-action="select-package">
          Select ${package.name}
        </button>
        <button class="package-card__compare-btn" data-action="compare">
          Compare Packages
        </button>
      </div>
      
      <div class="package-card__details">
        <div class="package-card__details-content">
          <h4 class="package-card__details-title">Package Gallery</h4>
          <div class="package-card__gallery">
            ${package.gallery.map(img => `
              <div class="package-card__gallery-item">
                <img src="IMAGES/${img}" alt="${package.name}" class="package-card__gallery-img" loading="lazy">
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Populate relevant add-ons for this package
    this.populatePackageAddons(package.id);

    return card;
  }

  populatePackageAddons(packageId) {
    const addonsContainer = document.getElementById(`addons-${packageId}`);
    if (!addonsContainer) return;

    // Show different add-ons based on package
    let relevantAddons = [];
    
    switch (packageId) {
      case 'basic':
        relevantAddons = ['balloons', 'photography'];
        break;
      case 'premium':
        relevantAddons = ['music', 'lighting', 'flowers'];
        break;
      case 'luxury':
        relevantAddons = ['flowers', 'lighting'];
        break;
      case 'wedding':
        relevantAddons = ['flowers', 'lighting'];
        break;
    }

    relevantAddons.forEach(addonId => {
      const addon = this.addons[addonId];
      if (!addon) return;

      const addonElement = document.createElement('div');
      addonElement.className = 'package-card__addon';
      addonElement.dataset.addon = addonId;
      
      addonElement.innerHTML = `
        <div class="package-card__addon-info">
          <div class="package-card__addon-checkbox" data-addon="${addonId}"></div>
          <span class="package-card__addon-name">${addon.name}</span>
        </div>
        <span class="package-card__addon-price">+${addon.price} MAD</span>
      `;

      addonElement.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleAddon(addonId);
      });

      addonsContainer.appendChild(addonElement);
    });
  }

  setupPackageInteractions() {
    // Package selection
    document.querySelectorAll('[data-action="select-package"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const packageId = e.target.closest('.package-card').dataset.package;
        this.selectPackage(packageId);
      });
    });

    // Package comparison
    document.querySelectorAll('[data-action="compare"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.showPackageComparison();
      });
    });

    // Package card clicks for details
    document.querySelectorAll('.package-card').forEach(card => {
      card.addEventListener('click', () => {
        this.togglePackageDetails(card);
      });
    });
  }

  selectPackage(packageId) {
    // Update UI
    document.querySelectorAll('.package-card').forEach(card => {
      card.classList.remove('package-card--selected');
    });
    
    const selectedCard = document.querySelector(`[data-package="${packageId}"]`);
    selectedCard?.classList.add('package-card--selected');
    
    // Update state
    this.state.selectedPackage = packageId;
    
    // Add to cart or open booking modal
    this.addPackageToCart(packageId);
    
    // Show success feedback
    this.showNotification(`${this.packages[packageId].name} added to cart!`, 'success');
  }

  toggleAddon(addonId) {
    const checkbox = document.querySelector(`[data-addon="${addonId}"]`);
    if (!checkbox) return;

    if (this.state.selectedAddons.has(addonId)) {
      this.state.selectedAddons.delete(addonId);
      checkbox.classList.remove('checked');
    } else {
      this.state.selectedAddons.add(addonId);
      checkbox.classList.add('checked');
    }

    this.updateCartTotals();
    this.updateCartUI();
  }

  togglePackageDetails(card) {
    const details = card.querySelector('.package-card__details');
    if (!details) return;

    details.classList.toggle('expanded');
  }

  // Enhanced Cart System
  initializeCart() {
    this.createCartUI();
    this.setupCartEventListeners();
  }

  createCartUI() {
    // Add cart icon to navigation if not exists
    const nav = document.querySelector('.nav__container');
    if (!nav || document.querySelector('.cart-icon')) return;

    const cartIcon = document.createElement('div');
    cartIcon.className = 'cart-icon';
    cartIcon.innerHTML = `
      <i class="fas fa-shopping-cart"></i>
      <span class="cart-badge">0</span>
    `;

    // Create cart dropdown
    const cartDropdown = document.createElement('div');
    cartDropdown.className = 'cart-dropdown';
    cartDropdown.innerHTML = `
      <div class="cart-header">
        <h3 class="cart-title">Your Booking</h3>
        <button class="cart-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="cart-content">
        <div class="cart-empty">
          <div class="cart-empty-icon">
            <i class="fas fa-shopping-cart"></i>
          </div>
          <p class="cart-empty-text">Your cart is empty</p>
          <p class="cart-empty-subtitle">Add a package to get started</p>
        </div>
        <div class="cart-items" style="display: none;"></div>
      </div>
      <div class="cart-summary" style="display: none;">
        <div class="cart-summary-row">
          <span class="cart-summary-label">Package</span>
          <span class="cart-summary-value" id="cart-package-total">MAD 0</span>
        </div>
        <div class="cart-summary-row">
          <span class="cart-summary-label">Add-ons</span>
          <span class="cart-summary-value" id="cart-addons-total">MAD 0</span>
        </div>
        <div class="cart-summary-row cart-total-row">
          <span class="cart-total-label">Total</span>
          <span class="cart-total-value" id="cart-total">MAD 0</span>
        </div>
        <div class="cart-actions">
          <button class="cart-checkout-btn">
            <i class="fas fa-calendar-check"></i>
            Book Now
          </button>
          <button class="cart-continue-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    `;

    // Add cart overlay
    const cartOverlay = document.createElement('div');
    cartOverlay.className = 'cart-overlay';

    // Insert cart elements
    nav.appendChild(cartIcon);
    document.body.appendChild(cartDropdown);
    document.body.appendChild(cartOverlay);
  }

  setupCartEventListeners() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartClose = document.querySelector('.cart-close');
    const cartContinue = document.querySelector('.cart-continue-btn');
    const cartCheckout = document.querySelector('.cart-checkout-btn');

    // Toggle cart dropdown
    cartIcon?.addEventListener('click', () => {
      this.toggleCart();
    });

    // Close cart
    cartClose?.addEventListener('click', () => {
      this.closeCart();
    });

    cartOverlay?.addEventListener('click', () => {
      this.closeCart();
    });

    cartContinue?.addEventListener('click', () => {
      this.closeCart();
    });

    // Checkout
    cartCheckout?.addEventListener('click', () => {
      this.openBookingModal();
    });
  }

  toggleCart() {
    const dropdown = document.querySelector('.cart-dropdown');
    const overlay = document.querySelector('.cart-overlay');
    
    if (dropdown.classList.contains('show')) {
      this.closeCart();
    } else {
      dropdown.classList.add('show');
      overlay.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  closeCart() {
    const dropdown = document.querySelector('.cart-dropdown');
    const overlay = document.querySelector('.cart-overlay');
    
    dropdown.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  addPackageToCart(packageId) {
    const packageData = this.packages[packageId];
    if (!packageData) return;

    // Remove existing package if any
    this.state.cart.items = this.state.cart.items.filter(item => item.type !== 'package');

    // Add new package
    this.state.cart.items.push({
      type: 'package',
      id: packageId,
      name: packageData.name,
      price: packageData.price,
      icon: packageData.icon
    });

    this.updateCartTotals();
    this.updateCartUI();
  }

  addAddonToCart(addonId) {
    const addonData = this.addons[addonId];
    if (!addonData) return;

    // Check if addon already exists
    const existingIndex = this.state.cart.items.findIndex(item => 
      item.type === 'addon' && item.id === addonId
    );

    if (existingIndex === -1) {
      this.state.cart.items.push({
        type: 'addon',
        id: addonId,
        name: addonData.name,
        price: addonData.price
      });
    }

    this.updateCartTotals();
    this.updateCartUI();
  }

  removeFromCart(itemId, itemType) {
    this.state.cart.items = this.state.cart.items.filter(item => 
      !(item.id === itemId && item.type === itemType)
    );

    if (itemType === 'package') {
      this.state.selectedPackage = null;
      // Also clear package selection UI
      document.querySelectorAll('.package-card').forEach(card => {
        card.classList.remove('package-card--selected');
      });
    } else if (itemType === 'addon') {
      this.state.selectedAddons.delete(itemId);
      // Update addon checkboxes
      document.querySelectorAll(`[data-addon="${itemId}"]`).forEach(checkbox => {
        checkbox.classList.remove('checked');
      });
    }

    this.updateCartTotals();
    this.updateCartUI();
  }

  updateCartTotals() {
    const packageItems = this.state.cart.items.filter(item => item.type === 'package');
    const addonItems = this.state.cart.items.filter(item => item.type === 'addon');
    
    this.state.cart.subtotal = packageItems.reduce((sum, item) => sum + item.price, 0);
    this.state.cart.addonsTotal = addonItems.reduce((sum, item) => sum + item.price, 0);
    this.state.cart.total = this.state.cart.subtotal + this.state.cart.addonsTotal;

    // Update selected add-ons based on cart
    this.state.selectedAddons.clear();
    addonItems.forEach(item => {
      this.state.selectedAddons.add(item.id);
    });
  }

  updateCartUI() {
    const cartBadge = document.querySelector('.cart-badge');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartItems = document.querySelector('.cart-items');
    const cartSummary = document.querySelector('.cart-summary');

    const totalItems = this.state.cart.items.length;

    // Update badge
    if (cartBadge) {
      cartBadge.textContent = totalItems;
      if (totalItems > 0) {
        cartBadge.classList.add('show');
        cartBadge.classList.add('updating');
        setTimeout(() => cartBadge.classList.remove('updating'), 300);
      } else {
        cartBadge.classList.remove('show');
      }
    }

    // Update cart content
    if (totalItems === 0) {
      cartEmpty.style.display = 'block';
      cartItems.style.display = 'none';
      cartSummary.style.display = 'none';
    } else {
      cartEmpty.style.display = 'none';
      cartItems.style.display = 'block';
      cartSummary.style.display = 'block';

      // Render cart items
      this.renderCartItems();
      
      // Update totals
      document.getElementById('cart-package-total').textContent = `MAD ${this.state.cart.subtotal}`;
      document.getElementById('cart-addons-total').textContent = `MAD ${this.state.cart.addonsTotal}`;
      document.getElementById('cart-total').textContent = `MAD ${this.state.cart.total}`;
    }
  }

  renderCartItems() {
    const cartItems = document.querySelector('.cart-items');
    if (!cartItems) return;

    cartItems.innerHTML = this.state.cart.items.map(item => `
      <div class="cart-item">
        <div class="cart-item-icon">
          <i class="${item.icon || (item.type === 'addon' ? 'fas fa-plus' : 'fas fa-gift')}"></i>
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">MAD ${item.price}</div>
        </div>
        <button class="cart-item-remove" data-id="${item.id}" data-type="${item.type}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `).join('');

    // Add remove event listeners
    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.closest('.cart-item-remove').dataset.id;
        const itemType = e.target.closest('.cart-item-remove').dataset.type;
        this.removeFromCart(itemId, itemType);
      });
    });
  }

  // Enhanced Booking Modal
  openBookingModal() {
    this.closeCart();
    
    // Create enhanced booking modal if not exists
    if (!document.querySelector('.booking-modal')) {
      this.createBookingModal();
    }
    
    // Populate with cart data
    this.populateBookingModal();
    
    // Show modal
    const modal = document.querySelector('.booking-modal');
    const backdrop = document.querySelector('.modal-backdrop');
    
    modal.classList.add('booking-modal--active');
    backdrop.classList.add('modal-backdrop--active');
    document.body.classList.add('modal-open');
    
    // Reset to first step
    this.state.currentStep = 1;
    this.updateBookingStep();
  }

  createBookingModal() {
    const modalHTML = `
      <div class="modal-backdrop"></div>
      <div class="booking-modal" role="dialog" aria-labelledby="booking-title">
        <div class="booking-modal__header">
          <div>
            <h2 class="booking-modal__title" id="booking-title">Complete Your Booking</h2>
            <p class="booking-modal__subtitle">Let's make your celebration perfect</p>
          </div>
          <button class="booking-modal__close" aria-label="Close modal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="booking-progress">
          <div class="booking-progress__steps">
            <div class="booking-progress__step booking-progress__step--active">
              <div class="booking-progress__step-circle">
                <span>1</span>
              </div>
              <div class="booking-progress__step-label">Review</div>
            </div>
            <div class="booking-progress__step">
              <div class="booking-progress__step-circle">
                <span>2</span>
              </div>
              <div class="booking-progress__step-label">Customize</div>
            </div>
            <div class="booking-progress__step">
              <div class="booking-progress__step-circle">
                <span>3</span>
              </div>
              <div class="booking-progress__step-label">Details</div>
            </div>
            <div class="booking-progress__step">
              <div class="booking-progress__step-circle">
                <span>4</span>
              </div>
              <div class="booking-progress__step-label">Confirm</div>
            </div>
            <div class="booking-progress__line">
              <div class="booking-progress__line-fill"></div>
            </div>
          </div>
        </div>
        
        <div class="booking-modal__body">
          <!-- Step content will be dynamically inserted here -->
        </div>
        
        <div class="booking-modal__footer">
          <button class="booking-nav-btn booking-nav-btn--prev" id="booking-prev" style="display: none;">
            <i class="fas fa-arrow-left"></i>
            Previous
          </button>
          <button class="booking-nav-btn booking-nav-btn--next" id="booking-next">
            Next
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    this.setupBookingModalEvents();
  }

  setupBookingModalEvents() {
    const modal = document.querySelector('.booking-modal');
    const backdrop = document.querySelector('.modal-backdrop');
    const closeBtn = document.querySelector('.booking-modal__close');
    const prevBtn = document.getElementById('booking-prev');
    const nextBtn = document.getElementById('booking-next');

    // Close modal
    closeBtn?.addEventListener('click', () => this.closeBookingModal());
    backdrop?.addEventListener('click', () => this.closeBookingModal());

    // Navigation
    prevBtn?.addEventListener('click', () => this.previousStep());
    nextBtn?.addEventListener('click', () => this.nextStep());

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('booking-modal--active')) {
        this.closeBookingModal();
      }
    });
  }

  closeBookingModal() {
    const modal = document.querySelector('.booking-modal');
    const backdrop = document.querySelector('.modal-backdrop');
    
    modal.classList.remove('booking-modal--active');
    backdrop.classList.remove('modal-backdrop--active');
    document.body.classList.remove('modal-open');
  }

  populateBookingModal() {
    // Will be implemented with step content
    this.renderBookingStep();
  }

  renderBookingStep() {
    const body = document.querySelector('.booking-modal__body');
    if (!body) return;

    let content = '';

    switch (this.state.currentStep) {
      case 1:
        content = this.renderReviewStep();
        break;
      case 2:
        content = this.renderCustomizeStep();
        break;
      case 3:
        content = this.renderDetailsStep();
        break;
      case 4:
        content = this.renderConfirmStep();
        break;
    }

    body.innerHTML = content;
    this.setupCurrentStepEvents();
  }

  renderReviewStep() {
    const selectedPackage = this.state.selectedPackage ? this.packages[this.state.selectedPackage] : null;
    const selectedAddons = Array.from(this.state.selectedAddons).map(id => this.addons[id]);

    return `
      <div class="booking-step booking-step--active">
        <h3 class="booking-step__title">Review Your Selection</h3>
        <p class="booking-step__description">
          Review your selected package and add-ons before proceeding
        </p>
        
        ${selectedPackage ? `
          <div class="package-mini-card">
            <div class="package-mini-icon">
              <i class="${selectedPackage.icon}"></i>
            </div>
            <div class="package-mini-info">
              <div class="package-mini-name">${selectedPackage.name}</div>
              <div class="package-mini-price">MAD ${selectedPackage.price}</div>
            </div>
          </div>
        ` : '<p>No package selected</p>'}
        
        ${selectedAddons.length > 0 ? `
          <h4 style="color: var(--primary-gold); margin: var(--space-lg) 0 var(--space-md);">Selected Add-ons</h4>
          ${selectedAddons.map(addon => `
            <div class="addon-item addon-item--selected">
              <div class="addon-checkbox checked"></div>
              <div class="addon-info">
                <div class="addon-name">${addon.name}</div>
                <div class="addon-description">${addon.description}</div>
              </div>
              <div class="addon-price">MAD ${addon.price}</div>
            </div>
          `).join('')}
        ` : ''}
        
        <div class="price-summary">
          <h4 class="price-summary__title">Order Summary</h4>
          <div class="price-summary__item">
            <span class="price-summary__label">Package</span>
            <span class="price-summary__value">MAD ${this.state.cart.subtotal}</span>
          </div>
          <div class="price-summary__item">
            <span class="price-summary__label">Add-ons</span>
            <span class="price-summary__value">MAD ${this.state.cart.addonsTotal}</span>
          </div>
          <div class="price-summary__item price-summary__total">
            <span class="price-summary__label">Total</span>
            <span class="price-summary__value">MAD ${this.state.cart.total}</span>
          </div>
        </div>
      </div>
    `;
  }

  renderCustomizeStep() {
    return `
      <div class="booking-step booking-step--active">
        <h3 class="booking-step__title">Customize Your Package</h3>
        <p class="booking-step__description">
          Add extra services to make your celebration even more special
        </p>
        
        <div class="addons-section">
          <div class="addons-grid">
            ${Object.values(this.addons).map(addon => `
              <div class="addon-item ${this.state.selectedAddons.has(addon.id) ? 'addon-item--selected' : ''}" 
                   data-addon="${addon.id}">
                <div class="addon-checkbox ${this.state.selectedAddons.has(addon.id) ? 'checked' : ''}"></div>
                <div class="addon-info">
                  <div class="addon-name">${addon.name}</div>
                  <div class="addon-description">${addon.description}</div>
                </div>
                <div class="addon-price">MAD ${addon.price}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="price-summary">
          <h4 class="price-summary__title">Updated Total</h4>
          <div class="price-summary__item">
            <span class="price-summary__label">Package</span>
            <span class="price-summary__value">MAD ${this.state.cart.subtotal}</span>
          </div>
          <div class="price-summary__item">
            <span class="price-summary__label">Add-ons</span>
            <span class="price-summary__value" id="dynamic-addons-total">MAD ${this.state.cart.addonsTotal}</span>
          </div>
          <div class="price-summary__item price-summary__total">
            <span class="price-summary__label">Total</span>
            <span class="price-summary__value" id="dynamic-total">MAD ${this.state.cart.total}</span>
          </div>
        </div>
      </div>
    `;
  }

  renderDetailsStep() {
    return `
      <div class="booking-step booking-step--active">
        <h3 class="booking-step__title">Event Details</h3>
        <p class="booking-step__description">
          Tell us about your special event
        </p>
        
        <form class="booking-form needs-validation" novalidate>
          <div class="form-grid form-grid--2">
            <div class="form-group">
              <label class="form-label form-label--required" for="event-name">Event Name</label>
              <input type="text" id="event-name" name="eventName" class="form-input" required placeholder="e.g., Sarah's 5th Birthday">
            </div>
            
            <div class="form-group">
              <label class="form-label form-label--required" for="event-date">Event Date</label>
              <input type="date" id="event-date" name="eventDate" class="form-input" required>
            </div>
          </div>
          
          <div class="form-grid form-grid--2">
            <div class="form-group">
              <label class="form-label form-label--required" for="event-time">Event Time</label>
              <input type="time" id="event-time" name="eventTime" class="form-input" required>
            </div>
            
            <div class="form-group">
              <label class="form-label form-label--required" for="guest-count">Number of Guests</label>
              <select id="guest-count" name="guestCount" class="form-select" required>
                <option value="">Select guests</option>
                <option value="1-10">1-10 guests</option>
                <option value="11-25">11-25 guests</option>
                <option value="26-50">26-50 guests</option>
                <option value="50+">50+ guests</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label form-label--required" for="event-location">Event Location</label>
            <input type="text" id="event-location" name="eventLocation" class="form-input" required placeholder="Full address">
          </div>
          
          <div class="form-grid form-grid--2">
            <div class="form-group">
              <label class="form-label form-label--required" for="contact-name">Your Name</label>
              <input type="text" id="contact-name" name="contactName" class="form-input" required>
            </div>
            
            <div class="form-group">
              <label class="form-label form-label--required" for="contact-phone">Phone Number</label>
              <input type="tel" id="contact-phone" name="contactPhone" class="form-input" required>
            </div>
          </div>
          
          <div class="form-group">
            <label class="form-label form-label--required" for="contact-email">Email Address</label>
            <input type="email" id="contact-email" name="contactEmail" class="form-input" required>
          </div>
          
          <div class="form-group">
            <label class="form-label" for="special-requests">Special Requests</label>
            <textarea id="special-requests" name="specialRequests" class="form-textarea" rows="3" placeholder="Any specific themes, colors, or requirements?"></textarea>
          </div>
        </form>
      </div>
    `;
  }

  renderConfirmStep() {
    const selectedPackage = this.packages[this.state.selectedPackage];
    const selectedAddons = Array.from(this.state.selectedAddons).map(id => this.addons[id]);

    return `
      <div class="booking-step booking-step--active">
        <h3 class="booking-step__title">Confirm Your Booking</h3>
        <p class="booking-step__description">
          Review all details before submitting your booking request
        </p>
        
        <div style="display: grid; gap: var(--space-lg);">
          <div style="background: rgba(255,255,255,0.05); padding: var(--space-lg); border-radius: var(--radius-lg);">
            <h4 style="color: var(--primary-gold); margin-bottom: var(--space-md);">Event Information</h4>
            <div id="event-summary">
              <!-- Will be populated with form data -->
            </div>
          </div>
          
          <div style="background: rgba(255,255,255,0.05); padding: var(--space-lg); border-radius: var(--radius-lg);">
            <h4 style="color: var(--primary-gold); margin-bottom: var(--space-md);">Package & Services</h4>
            <div>
              <strong>${selectedPackage.name}</strong> - MAD ${selectedPackage.price}
              ${selectedAddons.length > 0 ? `
                <ul style="margin-top: var(--space-sm); list-style: none;">
                  ${selectedAddons.map(addon => `
                    <li style="margin-bottom: var(--space-xs);">+ ${addon.name} - MAD ${addon.price}</li>
                  `).join('')}
                </ul>
              ` : ''}
            </div>
          </div>
        </div>
        
        <div class="price-summary">
          <h4 class="price-summary__title">Final Total</h4>
          <div class="price-summary__item price-summary__total">
            <span class="price-summary__label">Total Amount</span>
            <span class="price-summary__value">MAD ${this.state.cart.total}</span>
          </div>
        </div>
        
        <div style="margin-top: var(--space-xl);">
          <div class="form-checkbox">
            <input type="checkbox" id="agree-terms" required>
            <div class="form-checkbox__box"></div>
            <label for="agree-terms">I agree to the Terms & Conditions and confirm the booking details are correct</label>
          </div>
        </div>
      </div>
    `;
  }

  setupCurrentStepEvents() {
    const currentStep = this.state.currentStep;

    if (currentStep === 2) {
      // Setup addon toggle events
      document.querySelectorAll('.addon-item').forEach(item => {
        item.addEventListener('click', () => {
          const addonId = item.dataset.addon;
          this.toggleAddonInModal(addonId);
        });
      });
    } else if (currentStep === 4) {
      // Populate event summary
      this.populateEventSummary();
    }
  }

  toggleAddonInModal(addonId) {
    const addonItem = document.querySelector(`[data-addon="${addonId}"]`);
    const checkbox = addonItem.querySelector('.addon-checkbox');

    if (this.state.selectedAddons.has(addonId)) {
      this.state.selectedAddons.delete(addonId);
      addonItem.classList.remove('addon-item--selected');
      checkbox.classList.remove('checked');
    } else {
      this.state.selectedAddons.add(addonId);
      addonItem.classList.add('addon-item--selected');
      checkbox.classList.add('checked');
    }

    // Update cart and pricing
    this.syncCartWithModal();
    this.updateModalPricing();
  }

  syncCartWithModal() {
    // Remove all addons from cart
    this.state.cart.items = this.state.cart.items.filter(item => item.type !== 'addon');
    
    // Add selected addons to cart
    this.state.selectedAddons.forEach(addonId => {
      const addon = this.addons[addonId];
      this.state.cart.items.push({
        type: 'addon',
        id: addonId,
        name: addon.name,
        price: addon.price
      });
    });

    this.updateCartTotals();
    this.updateCartUI();
  }

  updateModalPricing() {
    const addonsTotal = document.getElementById('dynamic-addons-total');
    const total = document.getElementById('dynamic-total');

    if (addonsTotal) {
      addonsTotal.textContent = `MAD ${this.state.cart.addonsTotal}`;
    }
    if (total) {
      total.textContent = `MAD ${this.state.cart.total}`;
    }
  }

  populateEventSummary() {
    const summary = document.getElementById('event-summary');
    if (!summary) return;

    const formData = this.collectFormData();
    
    summary.innerHTML = `
      <div style="display: grid; gap: var(--space-sm);">
        <div><strong>Event:</strong> ${formData.eventName || 'Not specified'}</div>
        <div><strong>Date:</strong> ${formData.eventDate || 'Not specified'}</div>
        <div><strong>Time:</strong> ${formData.eventTime || 'Not specified'}</div>
        <div><strong>Guests:</strong> ${formData.guestCount || 'Not specified'}</div>
        <div><strong>Location:</strong> ${formData.eventLocation || 'Not specified'}</div>
        <div><strong>Contact:</strong> ${formData.contactName || 'Not specified'}</div>
        <div><strong>Phone:</strong> ${formData.contactPhone || 'Not specified'}</div>
        <div><strong>Email:</strong> ${formData.contactEmail || 'Not specified'}</div>
        ${formData.specialRequests ? `<div><strong>Special Requests:</strong> ${formData.specialRequests}</div>` : ''}
      </div>
    `;
  }

  collectFormData() {
    const form = document.querySelector('.booking-form');
    if (!form) return {};

    const formData = new FormData(form);
    return Object.fromEntries(formData);
  }

  // Navigation methods
  nextStep() {
    if (this.state.currentStep < this.state.totalSteps) {
      // Validate current step
      if (this.validateCurrentBookingStep()) {
        this.state.currentStep++;
        this.updateBookingStep();
      }
    } else {
      // Submit booking
      this.submitBooking();
    }
  }

  previousStep() {
    if (this.state.currentStep > 1) {
      this.state.currentStep--;
      this.updateBookingStep();
    }
  }

  updateBookingStep() {
    // Update progress indicator
    this.updateBookingProgress();
    
    // Update step content
    this.renderBookingStep();
    
    // Update navigation buttons
    this.updateBookingNavigation();
  }

  updateBookingProgress() {
    const steps = document.querySelectorAll('.booking-progress__step');
    const progressFill = document.querySelector('.booking-progress__line-fill');
    
    steps.forEach((step, index) => {
      const stepNumber = index + 1;
      
      step.classList.remove('booking-progress__step--active', 'booking-progress__step--completed');
      
      if (stepNumber < this.state.currentStep) {
        step.classList.add('booking-progress__step--completed');
      } else if (stepNumber === this.state.currentStep) {
        step.classList.add('booking-progress__step--active');
      }
    });
    
    // Update progress line
    const progressPercent = ((this.state.currentStep - 1) / (this.state.totalSteps - 1)) * 100;
    progressFill.style.width = `${progressPercent}%`;
  }

  updateBookingNavigation() {
    const prevBtn = document.getElementById('booking-prev');
    const nextBtn = document.getElementById('booking-next');
    
    // Previous button
    if (this.state.currentStep === 1) {
      prevBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
    }
    
    // Next/Submit button
    if (this.state.currentStep === this.state.totalSteps) {
      nextBtn.innerHTML = '<i class="fas fa-check"></i> Confirm Booking';
      nextBtn.classList.add('booking-nav-btn--confirm');
    } else {
      nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
      nextBtn.classList.remove('booking-nav-btn--confirm');
    }
  }

  validateCurrentBookingStep() {
    switch (this.state.currentStep) {
      case 1:
        return this.state.selectedPackage !== null;
      case 2:
        return true; // Add-ons are optional
      case 3:
        return this.validateBookingForm();
      case 4:
        const agreeTerms = document.getElementById('agree-terms');
        return agreeTerms && agreeTerms.checked;
      default:
        return true;
    }
  }

  validateBookingForm() {
    const form = document.querySelector('.booking-form');
    if (!form) return false;

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  async submitBooking() {
    try {
      this.setLoading(true);
      
      // Collect all booking data
      const bookingData = {
        package: this.packages[this.state.selectedPackage],
        addons: Array.from(this.state.selectedAddons).map(id => this.addons[id]),
        eventDetails: this.collectFormData(),
        pricing: {
          subtotal: this.state.cart.subtotal,
          addonsTotal: this.state.cart.addonsTotal,
          total: this.state.cart.total
        },
        timestamp: new Date().toISOString()
      };
      
      // Submit to API (simulated)
      await this.submitFormData(bookingData);
      
      // Show success and close modal
      this.showNotification('🎉 Booking confirmed! We\'ll contact you within 24 hours to finalize details.', 'success');
      
      // Clear cart and close modal
      this.clearCart();
      this.closeBookingModal();
      
    } catch (error) {
      this.showNotification('Failed to submit booking. Please try again.', 'error');
    } finally {
      this.setLoading(false);
    }
  }

  clearCart() {
    this.state.cart.items = [];
    this.state.selectedPackage = null;
    this.state.selectedAddons.clear();
    this.updateCartTotals();
    this.updateCartUI();
    
    // Clear UI selections
    document.querySelectorAll('.package-card--selected').forEach(card => {
      card.classList.remove('package-card--selected');
    });
    
    document.querySelectorAll('.addon-checkbox.checked').forEach(checkbox => {
      checkbox.classList.remove('checked');
    });
  }

  // Navigation functionality (from original app)
  initNavigation() {
    const nav = document.querySelector('.nav');
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    // Sticky nav on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        nav?.classList.add('nav--scrolled');
      } else {
        nav?.classList.remove('nav--scrolled');
      }
      
      // Hide/show nav on scroll
      if (currentScroll > lastScroll && currentScroll > 500) {
        if (nav) nav.style.transform = 'translateY(-100%)';
      } else {
        if (nav) nav.style.transform = 'translateY(0)';
      }
      
      lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
      navMenu?.classList.toggle('nav__menu--open');
      document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu?.classList.remove('nav__menu--open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // Event listeners (from original app)
  setupEventListeners() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: this.prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Animations (from original app)
  initializeAnimations() {
    if (this.prefersReducedMotion) return;
    
    // Intersection Observer for scroll animations
    const animateOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Stagger animations for children
          const children = entry.target.querySelectorAll('.animate-child');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 100);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      animateOnScroll.observe(el);
    });
  }

  // Lazy loading (from original app)
  setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyVideos = document.querySelectorAll('video[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target;
          video.src = video.dataset.src;
          video.load();
          video.classList.add('loaded');
          videoObserver.unobserve(video);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    lazyVideos.forEach(video => videoObserver.observe(video));
  }

  // Form validation and other methods (from original app)
  initializeModals() {
    // Keep existing modal functionality for other modals
  }

  setupFormValidation() {
    // Keep existing form validation
  }

  initStepNavigation() {
    // Enhanced with booking modal navigation
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    const pattern = field.getAttribute('pattern');
    const minLength = field.getAttribute('minlength');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required check
    if (required && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Phone validation
    else if (type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid phone number';
      }
    }
    
    // Pattern validation
    else if (pattern && value) {
      const regex = new RegExp(pattern);
      if (!regex.test(value)) {
        isValid = false;
        errorMessage = field.getAttribute('data-pattern-error') || 'Invalid format';
      }
    }
    
    // Min length validation
    else if (minLength && value.length < minLength) {
      isValid = false;
      errorMessage = `Minimum ${minLength} characters required`;
    }
    
    // Update UI
    if (isValid) {
      field.classList.remove('form-input--error');
      field.classList.add('form-input--success');
      const errorEl = field.parentElement.querySelector('.form-error');
      if (errorEl) errorEl.remove();
    } else {
      field.classList.add('form-input--error');
      field.classList.remove('form-input--success');
      
      let errorEl = field.parentElement.querySelector('.form-error');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        field.parentElement.appendChild(errorEl);
      }
      errorEl.textContent = errorMessage;
    }
    
    return isValid;
  }

  setLoading(isLoading) {
    this.state.isLoading = isLoading;
    
    const buttons = document.querySelectorAll('.btn, .booking-nav-btn');
    buttons.forEach(btn => {
      if (isLoading) {
        btn.classList.add('btn--loading');
        btn.disabled = true;
      } else {
        btn.classList.remove('btn--loading');
        btn.disabled = false;
      }
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification__content">
        <div class="notification__icon">
          <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        </div>
        <p class="notification__message">${message}</p>
        <button class="notification__close">&times;</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.classList.add('notification--show');
    }, 10);
    
    // Close button
    notification.querySelector('.notification__close').addEventListener('click', () => {
      this.removeNotification(notification);
    });
    
    // Auto remove
    setTimeout(() => {
      this.removeNotification(notification);
    }, 5000);
  }

  removeNotification(notification) {
    notification.classList.remove('notification--show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }

  async submitFormData(data) {
    // Simulated API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Booking submitted:', data);
        resolve();
      }, 2000);
    });
  }

  showPackageComparison() {
    // TODO: Implement package comparison modal
    this.showNotification('Package comparison feature coming soon!', 'info');
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.bloomApp = new EnhancedBloomApp();
});

// Export for use in other modules
export default EnhancedBloomApp;