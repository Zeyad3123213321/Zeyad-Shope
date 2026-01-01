// ========== APPLICATION STATE ==========
        let state = {
            cart: JSON.parse(localStorage.getItem('zeyadStoreCart')) || [],
            wishlist: JSON.parse(localStorage.getItem('zeyadStoreWishlist')) || [],
            user: JSON.parse(localStorage.getItem('zeyadStoreUser')) || null,
            orders: JSON.parse(localStorage.getItem('zeyadStoreOrders')) || [],
            addresses: JSON.parse(localStorage.getItem('zeyadStoreAddresses')) || [
                {
                    id: 1,
                    name: "Home",
                    address: "123 Main Street",
                    city: "New Cairo",
                    phone: "+20 123 456 7890",
                    isDefault: true
                }
            ],
            products: [],
            currentProductPage: 1,
            productsPerPage: 8,
            currentCheckoutStep: 1,
            currentOrderNumber: parseInt(localStorage.getItem('zeyadStoreOrderNumber')) || 10001,
            GOOGLE_SHEETS_URL: "https://script.google.com/macros/s/AKfycbyJ0JyK3gRxpCuolu8pIWQmFCHS54GG9uzFzHurraXF0VB6UjKLWApmW8Ta47Y2heWu/exec" // Replace with your actual URL
        };

        // ========== PRODUCTS DATABASE ==========
        const productsDatabase = [
            {
                id: 1,
                name: 'Nano LED Wall Lighting',
                description: 'Modern LED lighting strips with smart app control, RGB colors, and dimming functionality. Perfect for home decoration and ambiance.',
                price: 999,
                oldPrice: 1200,
                image: 'https://i.pinimg.com/736x/8f/34/5b/8f345b414b2345c495bed0f83fa330fd.jpg',
                category: 'lighting',
                tags: ['new', 'smart', 'rgb'],
                badge: 'new',
                rating: 4.5,
                reviews: 128,
                stock: 'in-stock',
                sku: 'LED-001'
            },
            {
                id: 2,
                name: 'Ergonomic Office Chair',
                description: 'Premium office chair with lumbar support, adjustable height, breathable mesh fabric, and 360-degree rotation.',
                price: 1999,
                oldPrice: 2200,
                image: 'https://i.pinimg.com/736x/7a/3c/5c/7a3c5ca272bf8f2e4b2ad7c0f2d97632.jpg',
                category: 'office',
                tags: ['bestseller', 'ergonomic'],
                badge: 'sale',
                rating: 4.8,
                reviews: 89,
                stock: 'in-stock',
                sku: 'CHAIR-001'
            },
            {
                id: 3,
                name: 'Magnetic Whiteboard',
                description: 'Large hanging whiteboard with magnetic surface for office organization, brainstorming, and planning sessions.',
                price: 799,
                oldPrice: 950,
                image: 'https://i.pinimg.com/736x/da/f5/4d/daf54d1441d4be3dcb01956141d4b1c8.jpg',
                category: 'boards',
                tags: ['organization', 'office'],
                badge: null,
                rating: 4.3,
                reviews: 156,
                stock: 'low-stock',
                sku: 'BOARD-001'
            },
            {
                id: 4,
                name: 'Mechanical Gaming Keyboard',
                description: 'RGB mechanical keyboard with blue switches, programmable keys, anti-ghosting technology, and dedicated media controls.',
                price: 1299,
                oldPrice: 1500,
                image: 'https://i.pinimg.com/736x/ef/5d/f1/ef5df1d4d57c9723da73ced6366035bd.jpg',
                category: 'keyboards',
                tags: ['gaming', 'rgb', 'mechanical'],
                badge: 'hot',
                rating: 4.7,
                reviews: 234,
                stock: 'in-stock',
                sku: 'KB-001'
            },
            {
                id: 5,
                name: 'Desk Lamp with Wireless Charger',
                description: 'Modern desk lamp with Qi wireless charging pad, adjustable brightness, USB ports, and touch controls.',
                price: 699,
                oldPrice: 850,
                image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                category: 'lighting',
                tags: ['wireless', 'smart'],
                badge: 'sale',
                rating: 4.4,
                reviews: 92,
                stock: 'in-stock',
                sku: 'LAMP-001'
            },
            {
                id: 6,
                name: 'Premium Mouse Pad',
                description: 'Extended gaming mouse pad with stitched edges, waterproof surface, non-slip rubber base, and smooth tracking surface.',
                price: 599,
                oldPrice: 400,
                image: 'https://i.pinimg.com/1200x/1f/67/91/1f6791e9f1f318887d50c9a0622c2bba.jpg',
                category: 'office',
                tags: ['gaming', 'accessory'],
                badge: 'sale',
                rating: 4.2,
                reviews: 178,
                stock: 'in-stock',
                sku: 'PAD-001'
            },
            {
                id: 7,
                name: 'Smart LED Strip Lights',
                description: '16 million color LED strip lights with voice control, music sync, and timer functions via smartphone app.',
                price: 599,
                oldPrice: 750,
                image: 'https://i.pinimg.com/1200x/40/5e/9d/405e9dfd251e218f6bdbb2ccffcc5e23.jpg',
                category: 'lighting',
                tags: ['smart', 'rgb', 'voice'],
                badge: 'new',
                rating: 4.6,
                reviews: 312,
                stock: 'in-stock',
                sku: 'LED-002'
            },
            {
                id: 8,
                name: 'Executive Desk Organizer',
                description: 'Wooden desk organizer with multiple compartments for pens, papers, phones, and other office essentials.',
                price: 449,
                oldPrice: 550,
                image: 'https://i.pinimg.com/1200x/19/fb/50/19fb502ab53342dd4c0163d8be4456e1.jpg',
                category: 'office',
                tags: ['organization', 'wood'],
                badge: null,
                rating: 4.1,
                reviews: 67,
                stock: 'in-stock',
                sku: 'ORG-001'
            },
            {
                id: 9,
                name: 'Cork Notice Board',
                description: 'Large cork board with aluminum frame for pinning notes, photos, and reminders in office or home.',
                price: 399,
                oldPrice: 500,
                image: 'https://i.pinimg.com/736x/05/62/47/056247ac13b409da6856b27f602daa48.jpg',
                category: 'boards',
                tags: ['organization', 'office'],
                badge: null,
                rating: 4.0,
                reviews: 45,
                stock: 'in-stock',
                sku: 'BOARD-002'
            },
            {
                id: 10,
                name: 'Wireless Mechanical Keyboard',
                description: 'Bluetooth mechanical keyboard with brown switches, long battery life, and compact 75% layout.',
                price: 1499,
                oldPrice: 1800,
                image: 'https://i.pinimg.com/1200x/7e/0c/b7/7e0cb71a71df1d10edc51f3a3e25cb76.jpg',
                category: 'keyboards',
                tags: ['wireless', 'mechanical', 'bluetooth'],
                badge: 'new',
                rating: 4.8,
                reviews: 189,
                stock: 'in-stock',
                sku: 'KB-002'
            },
            {
                id: 11,
                name: 'RGB Gaming Mouse',
                description: 'High-precision gaming mouse with customizable RGB lighting, programmable buttons, and ergonomic design.',
                price: 799,
                oldPrice: 950,
                image: 'https://i.pinimg.com/736x/7a/c1/b9/7ac1b995aa95fe4b84bffbb444f1df07.jpg',
                category: 'office',
                tags: ['gaming', 'rgb', 'ergonomic'],
                badge: 'sale',
                rating: 4.5,
                reviews: 223,
                stock: 'in-stock',
                sku: 'MOUSE-001'
            },
            {
                id: 12,
                name: 'LED Desk Lamp',
                description: 'Adjustable desk lamp with color temperature control, multiple brightness levels, and USB charging port.',
                price: 499,
                oldPrice: 650,
                image: 'https://i.pinimg.com/1200x/3d/9d/bb/3d9dbb6799397b6854745bdc54158e41.jpg',
                category: 'lighting',
                tags: ['desk', 'adjustable', 'usb'],
                badge: null,
                rating: 4.3,
                reviews: 134,
                stock: 'in-stock',
                sku: 'LAMP-002'
            }
        ];

        // ========== INITIALIZATION ==========
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
        });

        function initializeApp() {
            // Initialize products
            state.products = [...productsDatabase];
            
            // Render initial products
            renderProducts();
            
            // Update counts
            updateCartCount();
            updateWishlistCount();
            
            // Load cart items
            loadCartItems();
            
            // Load wishlist items
            loadWishlistItems();
            
            // Setup event listeners
            setupEventListeners();
            
            // Check if user is logged in
            checkUserLogin();
            
            // Add scroll effect
            window.addEventListener('scroll', handleScroll);
            
            // Initialize filters
            initializeFilters();
            
            // Show welcome message
            setTimeout(() => {
                showNotification('Welcome to Zeyad Store!', 'success');
            }, 1000);
        }

        // ========== EVENT LISTENERS ==========
        function setupEventListeners() {
            // Mobile menu toggle
            document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);
            
            // Search functionality
            document.getElementById('searchBtn').addEventListener('click', openSearch);
            document.getElementById('searchClose').addEventListener('click', closeSearch);
            document.getElementById('searchOverlay').addEventListener('click', closeSearch);
            document.getElementById('searchInput').addEventListener('input', handleSearch);
            
            // Cart functionality
            document.getElementById('cartBtn').addEventListener('click', openCart);
            document.getElementById('cartClose').addEventListener('click', closeCart);
            document.getElementById('cartOverlay').addEventListener('click', closeCart);
            
            // Wishlist functionality
            document.getElementById('wishlistBtn').addEventListener('click', openWishlist);
            document.getElementById('wishlistClose').addEventListener('click', closeWishlist);
            document.getElementById('wishlistOverlay').addEventListener('click', closeWishlist);
            
            // Account functionality
            document.getElementById('userBtn').addEventListener('click', openAccount);
            document.getElementById('accountClose').addEventListener('click', closeAccount);
            document.getElementById('accountOverlay').addEventListener('click', closeAccount);
            
            // Checkout functionality
            document.getElementById('checkoutClose').addEventListener('click', closeCheckoutModal);
            document.getElementById('checkoutOverlay').addEventListener('click', closeCheckoutModal);
            document.getElementById('orderConfirmClose').addEventListener('click', closeOrderConfirmModal);
            document.getElementById('orderConfirmOverlay').addEventListener('click', closeOrderConfirmModal);
            
            // Load more products
            document.getElementById('loadMoreProducts').addEventListener('click', loadMoreProducts);
            
            // Account tabs
            document.querySelectorAll('[data-tab]').forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabId = this.dataset.tab;
                    // Handle account modal tabs
                    if (this.parentElement.classList.contains('tabs-header')) {
                        document.querySelectorAll('.tabs-header .btn').forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        document.querySelectorAll('.tab-content').forEach(content => {
                            content.style.display = 'none';
                        });
                        document.querySelector(`[data-tab-content="${tabId}"]`).style.display = 'block';
                    }
                    // Handle account page tabs
                    else if (this.parentElement.parentElement.classList.contains('account-nav')) {
                        document.querySelectorAll('.account-nav a').forEach(link => link.classList.remove('active'));
                        this.classList.add('active');
                        document.querySelectorAll('.account-tab-content').forEach(content => {
                            content.classList.remove('active');
                        });
                        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
                        if (tabId === 'wishlist') {
                            renderAccountWishlist();
                        } else if (tabId === 'orders') {
                            renderOrders();
                        } else if (tabId === 'addresses') {
                            renderAddresses();
                        }
                    }
                });
            });
            
            // Login form
            document.getElementById('loginForm').addEventListener('submit', handleLogin);
            
            // Register form
            document.getElementById('registerForm').addEventListener('submit', handleRegister);
            
            // Account settings form
            document.getElementById('accountSettingsForm')?.addEventListener('submit', handleAccountSettings);
            
            // Checkout form
            document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;
                    
                    // Handle internal page navigation
                    if (href === '#accountPage') {
                        openAccountPage();
                        e.preventDefault();
                        return;
                    }
                    
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                        
                        // Close mobile menu if open
                        const mainNav = document.getElementById('mainNav');
                        if (mainNav.classList.contains('active')) {
                            toggleMobileMenu();
                        }
                    }
                });
            });
            
            // Close modals with ESC key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    closeAllModals();
                }
            });
        }

        // ========== PRODUCT FUNCTIONS ==========
        function renderProducts() {
            const productsGrid = document.getElementById('productsGrid');
            if (!productsGrid) return;
            
            const startIndex = (state.currentProductPage - 1) * state.productsPerPage;
            const endIndex = startIndex + state.productsPerPage;
            const productsToShow = state.products.slice(0, endIndex);
            
            productsGrid.innerHTML = '';
            
            productsToShow.forEach(product => {
                const isInWishlist = state.wishlist.some(item => item.id === product.id);
                const discount = product.oldPrice ? 
                    Math.round((1 - product.price / product.oldPrice) * 100) : 0;
                
                const productCard = document.createElement('div');
                productCard.className = 'product-card fade-in';
                productCard.innerHTML = `
                    ${product.badge ? `
                        <div class="product-badge badge-${product.badge}">
                            ${product.badge === 'sale' ? 'Sale' : 
                              product.badge === 'new' ? 'New' : 'Hot'}
                        </div>
                    ` : ''}
                    
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}" loading="lazy">
                        <div class="product-actions">
                            <button class="product-action-btn" onclick="viewProduct(${product.id})" aria-label="Quick view">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="product-action-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id})" aria-label="${isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
                                <i class="fas fa-heart ${isInWishlist ? 'text-error' : ''}"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="product-content">
                        <h4 class="product-title">${product.name}</h4>
                        <p class="product-description">${product.description}</p>
                        
                        <div class="product-price">
                            <span class="current-price">${formatCurrency(product.price)}</span>
                            ${product.oldPrice ? `
                                <span class="old-price">${formatCurrency(product.oldPrice)}</span>
                            ` : ''}
                        </div>
                        
                        <div class="product-footer">
                            <div class="product-rating">
                                <span class="rating-stars">
                                    ${getStarRating(product.rating)}
                                </span>
                                <span class="text-muted">(${product.reviews})</span>
                            </div>
                            <span class="stock-status ${product.stock}">
                                ${product.stock === 'in-stock' ? 'In Stock' : 'Low Stock'}
                            </span>
                        </div>
                        
                        <button class="btn btn-primary btn-block mt-3" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-bag"></i> Add to Cart
                        </button>
                    </div>
                `;
                
                productsGrid.appendChild(productCard);
            });
            
            // Update load more button visibility
            const loadMoreBtn = document.getElementById('loadMoreProducts');
            if (loadMoreBtn) {
                if (endIndex >= state.products.length) {
                    loadMoreBtn.style.display = 'none';
                } else {
                    loadMoreBtn.style.display = 'inline-flex';
                }
            }
        }

        function loadMoreProducts() {
            state.currentProductPage++;
            renderProducts();
        }

        function filterByCategory(category) {
            if (category === 'all') {
                state.products = [...productsDatabase];
            } else {
                state.products = productsDatabase.filter(product => product.category === category);
            }
            state.currentProductPage = 1;
            renderProducts();
            
            // Update active filter tag
            document.querySelectorAll('.filter-tag').forEach(tag => {
                tag.classList.remove('active');
                if (tag.dataset.filter === (category === 'all' ? 'all' : '')) {
                    tag.classList.add('active');
                }
            });
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        }

        function viewProduct(productId) {
            const product = state.products.find(p => p.id === productId);
            if (product) {
                // In a real application, this would open a product detail modal
                showNotification(`Viewing: ${product.name}`, 'info');
            }
        }

        // ========== WISHLIST FUNCTIONS ==========
        function toggleWishlist(productId) {
            const product = state.products.find(p => p.id === productId);
            if (!product) return;
            
            const index = state.wishlist.findIndex(item => item.id === productId);
            
            if (index > -1) {
                state.wishlist.splice(index, 1);
                showNotification('Removed from wishlist', 'info');
            } else {
                state.wishlist.push({...product, addedAt: new Date().toISOString()});
                showNotification('Added to wishlist', 'success');
            }
            
            saveWishlist();
            updateWishlistCount();
            renderProducts(); // Update heart icons
            
            // Update account wishlist if open
            const wishlistTab = document.querySelector('[data-tab="wishlist"]');
            if (wishlistTab && wishlistTab.classList.contains('active')) {
                renderAccountWishlist();
            }
        }

        function loadWishlistItems() {
            const container = document.getElementById('wishlistItemsContainer');
            const emptyMessage = document.getElementById('emptyWishlistMessage');
            
            if (!container || !emptyMessage) return;
            
            if (state.wishlist.length === 0) {
                container.innerHTML = '';
                emptyMessage.style.display = 'block';
                return;
            }
            
            emptyMessage.style.display = 'none';
            let itemsHTML = '';
            
            state.wishlist.forEach(item => {
                itemsHTML += `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <div class="cart-item-price">${formatCurrency(item.price)}</div>
                            <div class="cart-item-actions">
                                <button class="btn btn-sm btn-primary" onclick="addToCart(${item.id}); closeWishlist();">
                                    <i class="fas fa-shopping-bag"></i> Add to Cart
                                </button>
                                <button class="btn btn-sm btn-text text-error" onclick="toggleWishlist(${item.id}); loadWishlistItems();">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = itemsHTML;
        }

        function renderAccountWishlist() {
            const container = document.getElementById('accountWishlistGrid');
            if (!container) return;
            
            if (state.wishlist.length === 0) {
                container.innerHTML = '<p class="text-muted">Your wishlist is empty. Start adding products!</p>';
                return;
            }
            
            let gridHTML = '';
            
            state.wishlist.forEach(item => {
                gridHTML += `
                    <div class="product-card">
                        <div class="product-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="product-content">
                            <h4 class="product-title">${item.name}</h4>
                            <div class="product-price">
                                <span class="current-price">${formatCurrency(item.price)}</span>
                            </div>
                            <div class="d-flex gap-2 mt-3">
                                <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})">
                                    <i class="fas fa-shopping-bag"></i> Add to Cart
                                </button>
                                <button class="btn btn-outline btn-sm" onclick="toggleWishlist(${item.id}); renderAccountWishlist();">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = gridHTML;
        }

        // ========== CART FUNCTIONS ==========
        function addToCart(productId) {
            const product = state.products.find(p => p.id === productId);
            if (!product) return;
            
            const existingItem = state.cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({
                    ...product,
                    quantity: 1
                });
            }
            
            saveCart();
            updateCartCount();
            loadCartItems();
            
            showNotification(`${product.name} added to cart`, 'success');
            
            // Pulse animation on cart icon
            const cartIcon = document.getElementById('cartBtn');
            cartIcon.classList.add('animate-pulse');
            setTimeout(() => cartIcon.classList.remove('animate-pulse'), 1000);
        }

        function updateCartQuantity(productId, delta) {
            const item = state.cart.find(item => item.id === productId);
            if (!item) return;
            
            const newQuantity = item.quantity + delta;
            
            if (newQuantity < 1) {
                removeFromCart(productId);
                return;
            }
            
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
            loadCartItems();
        }

        function removeFromCart(productId) {
            const product = state.products.find(p => p.id === productId);
            state.cart = state.cart.filter(item => item.id !== productId);
            
            saveCart();
            updateCartCount();
            loadCartItems();
            
            if (product) {
                showNotification(`${product.name} removed from cart`, 'info');
            }
        }

        function loadCartItems() {
            const container = document.getElementById('cartItemsContainer');
            const footer = document.getElementById('cartFooter');
            const emptyMessage = document.getElementById('emptyCartMessage');
            
            if (!container || !footer || !emptyMessage) return;
            
            if (state.cart.length === 0) {
                container.innerHTML = '';
                footer.style.display = 'none';
                emptyMessage.style.display = 'block';
                return;
            }
            
            emptyMessage.style.display = 'none';
            footer.style.display = 'flex';
            
            let itemsHTML = '';
            let subtotal = 0;
            
            state.cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                
                itemsHTML += `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <div class="cart-item-price">${formatCurrency(itemTotal)}</div>
                            <div class="cart-item-actions">
                                <div class="quantity-control">
                                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                                    <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                                </div>
                                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                                    <i class="fas fa-trash"></i> Remove
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            const shipping = subtotal > 500 ? 0 : 50;
            const total = subtotal + shipping;
            
            container.innerHTML = itemsHTML;
            
            // Update summary
            document.getElementById('cartSubtotal').textContent = formatCurrency(subtotal);
            document.getElementById('cartShipping').textContent = formatCurrency(shipping);
            document.getElementById('cartTotal').textContent = formatCurrency(total);
        }

        function updateCheckoutSummary() {
            const container = document.getElementById('checkoutOrderSummary');
            if (!container) return;
            
            let subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shippingMethod = document.querySelector('input[name="shippingMethod"]:checked').value;
            const shippingCost = shippingMethod === 'express' ? 50 : 0;
            const total = subtotal + shippingCost;
            
            let summaryHTML = `
                <div class="summary-item">
                    <span>Subtotal</span>
                    <span>${formatCurrency(subtotal)}</span>
                </div>
                <div class="summary-item">
                    <span>Shipping (${shippingMethod === 'express' ? 'Express' : 'Standard'})</span>
                    <span>${formatCurrency(shippingCost)}</span>
                </div>
                <div class="summary-total">
                    <span>Total</span>
                    <span>${formatCurrency(total)}</span>
                </div>
            `;
            
            container.innerHTML = summaryHTML;
            
            // Update order review
            updateOrderReview();
        }

        function updateOrderReview() {
            const container = document.getElementById('orderReviewDetails');
            if (!container) return;
            
            const formData = new FormData(document.getElementById('checkoutForm'));
            const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shippingMethod = formData.get('shippingMethod');
            const shippingCost = shippingMethod === 'express' ? 50 : 0;
            const total = subtotal + shippingCost;
            const paymentMethod = formData.get('paymentMethod');
            
            let reviewHTML = `
                <div class="mb-4">
                    <h5 class="mb-2">Shipping Information</h5>
                    <p class="text-muted">
                        ${formData.get('firstName')} ${formData.get('lastName')}<br>
                        ${formData.get('address')}<br>
                        ${formData.get('city')}<br>
                        Phone: ${formData.get('phone')}<br>
                        Email: ${formData.get('email')}
                    </p>
                </div>
                <div class="mb-4">
                    <h5 class="mb-2">Order Summary</h5>
                    <div class="summary-item">
                        <span>Subtotal</span>
                        <span>${formatCurrency(subtotal)}</span>
                    </div>
                    <div class="summary-item">
                        <span>Shipping</span>
                        <span>${formatCurrency(shippingCost)}</span>
                    </div>
                    <div class="summary-total">
                        <span>Total</span>
                        <span>${formatCurrency(total)}</span>
                    </div>
                </div>
                <div class="mb-4">
                    <h5 class="mb-2">Payment Method</h5>
                    <p class="text-muted">
                        ${paymentMethod === 'cod' ? 'Cash on Delivery' :
                          paymentMethod === 'credit' ? 'Credit/Debit Card' :
                          'Vodafone Cash'}
                    </p>
                </div>
            `;
            
            container.innerHTML = reviewHTML;
        }

        // ========== CHECKOUT FUNCTIONS ==========
        function openCheckoutModal() {
            if (state.cart.length === 0) {
                showNotification('Your cart is empty', 'warning');
                return;
            }
            
            closeCart();
            updateCheckoutSummary();
            
            // Reset to step 1
            state.currentCheckoutStep = 1;
            updateCheckoutSteps();
            
            // Open checkout modal
            document.getElementById('checkoutModal').classList.add('active');
            document.getElementById('checkoutOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeCheckoutModal() {
            document.getElementById('checkoutModal').classList.remove('active');
            document.getElementById('checkoutOverlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function nextCheckoutStep() {
            if (state.currentCheckoutStep >= 3) return;
            
            // Validate current step
            if (!validateCheckoutStep(state.currentCheckoutStep)) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            state.currentCheckoutStep++;
            updateCheckoutSteps();
            
            // Update summary for step 2
            if (state.currentCheckoutStep === 2) {
                updateCheckoutSummary();
            }
        }

        function prevCheckoutStep() {
            if (state.currentCheckoutStep <= 1) return;
            state.currentCheckoutStep--;
            updateCheckoutSteps();
        }

        function updateCheckoutSteps() {
            // Update step indicators
            document.querySelectorAll('.checkout-step').forEach((step, index) => {
                const stepNumber = parseInt(step.dataset.step);
                if (stepNumber <= state.currentCheckoutStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            
            // Show/hide step content
            document.querySelectorAll('.checkout-step-content').forEach(content => {
                const stepNumber = parseInt(content.dataset.step);
                if (stepNumber === state.currentCheckoutStep) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        }

        function validateCheckoutStep(step) {
            if (step === 1) {
                const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
                for (const field of requiredFields) {
                    const input = document.querySelector(`[name="${field}"]`);
                    if (!input.value.trim()) {
                        input.focus();
                        return false;
                    }
                }
                return true;
            }
            return true;
        }

        async function handleCheckoutSubmit(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitOrderBtn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="loading"></div> Processing...';
            submitBtn.disabled = true;
            
            try {
                // Collect form data
                const formData = new FormData(document.getElementById('checkoutForm'));
                const orderData = {
                    orderNumber: state.currentOrderNumber,
                    customer: {
                        firstName: formData.get('firstName'),
                        lastName: formData.get('lastName'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        address: formData.get('address'),
                        city: formData.get('city'),
                        zipCode: formData.get('zipCode')
                    },
                    shipping: {
                        method: formData.get('shippingMethod'),
                        cost: formData.get('shippingMethod') === 'express' ? 50 : 0
                    },
                    payment: {
                        method: formData.get('paymentMethod'),
                        status: 'pending'
                    },
                    items: state.cart.map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        total: item.price * item.quantity
                    })),
                    subtotal: state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                    total: state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 
                          (formData.get('shippingMethod') === 'express' ? 50 : 0),
                    notes: formData.get('orderNotes'),
                    status: 'processing',
                    date: new Date().toISOString()
                };
                
                // Save order to local storage
                state.orders.push(orderData);
                state.currentOrderNumber++;
                localStorage.setItem('zeyadStoreOrders', JSON.stringify(state.orders));
                localStorage.setItem('zeyadStoreOrderNumber', state.currentOrderNumber.toString());
                
                // Send to Google Sheets (if URL is configured)
                if (state.GOOGLE_SHEETS_URL && state.GOOGLE_SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE') {
                    await sendToGoogleSheets(orderData);
                }
                
                // Clear cart
                state.cart = [];
                saveCart();
                updateCartCount();
                
                // Show confirmation
                closeCheckoutModal();
                showOrderConfirmation(orderData);
                
            } catch (error) {
                console.error('Checkout error:', error);
                showNotification('Error processing order. Please try again.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }

        async function sendToGoogleSheets(orderData) {
            try {
                const response = await fetch(state.GOOGLE_SHEETS_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(orderData)
                });
                
                console.log('Order data sent to Google Sheets');
            } catch (error) {
                console.error('Error sending to Google Sheets:', error);
            }
        }

        function showOrderConfirmation(orderData) {
            // Update confirmation details
            document.getElementById('confirmOrderNumber').textContent = `#${orderData.orderNumber}`;
            document.getElementById('confirmOrderTotal').textContent = formatCurrency(orderData.total);
            
            const deliveryDays = orderData.shipping.method === 'express' ? '2-3' : '5-7';
            document.getElementById('confirmDeliveryDate').textContent = `${deliveryDays} business days`;
            
            // Show confirmation modal
            document.getElementById('orderConfirmModal').classList.add('active');
            document.getElementById('orderConfirmOverlay').classList.add('active');
        }

        function closeOrderConfirmModal() {
            document.getElementById('orderConfirmModal').classList.remove('active');
            document.getElementById('orderConfirmOverlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function selectShippingMethod(method) {
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
            const element = document.querySelector(`[value="${method}"]`).parentElement;
            element.classList.add('active');
            element.querySelector('input').checked = true;
            updateCheckoutSummary();
        }

        function selectPaymentMethod(method) {
            document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('active'));
            const element = document.querySelector(`[value="${method}"]`).parentElement;
            element.classList.add('active');
            element.querySelector('input').checked = true;
        }

        // ========== ACCOUNT FUNCTIONS ==========
        function checkUserLogin() {
            if (state.user) {
                // User is logged in
                document.getElementById('accountLoggedIn').style.display = 'block';
                document.getElementById('accountTabs').style.display = 'none';
                document.getElementById('userName').textContent = `${state.user.firstName} ${state.user.lastName}`;
                document.getElementById('userEmail').textContent = state.user.email;
            } else {
                // User is not logged in
                document.getElementById('accountLoggedIn').style.display = 'none';
                document.getElementById('accountTabs').style.display = 'block';
            }
        }

        function handleLogin(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simple validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // In a real app, this would be an API call
            // For demo, we'll create a user
            state.user = {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: email,
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem('zeyadStoreUser', JSON.stringify(state.user));
            checkUserLogin();
            closeAccount();
            showNotification('Successfully logged in!', 'success');
        }

        function handleRegister(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('registerFirstName').value;
            const lastName = document.getElementById('registerLastName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            // Validation
            if (!firstName || !lastName || !email || !password || !confirmPassword) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            // In a real app, this would be an API call
            state.user = {
                id: Date.now(),
                firstName,
                lastName,
                email,
                createdAt: new Date().toISOString()
            };
            
            localStorage.setItem('zeyadStoreUser', JSON.stringify(state.user));
            
            // Switch to login tab
            document.querySelector('[data-tab="login"]').click();
            showNotification('Account created successfully! Please login.', 'success');
        }

        function logout() {
            state.user = null;
            localStorage.removeItem('zeyadStoreUser');
            checkUserLogin();
            closeAccount();
            showNotification('Successfully logged out', 'info');
        }

        function openAccountPage() {
            if (!state.user) {
                showNotification('Please login to access your account', 'warning');
                openAccount();
                return;
            }
            
            // Hide main content, show account page
            document.querySelector('main').style.display = 'none';
            document.getElementById('accountPage').style.display = 'block';
            
            // Update account info
            document.getElementById('accountUserName').textContent = `${state.user.firstName} ${state.user.lastName}`;
            document.getElementById('accountUserEmail').textContent = state.user.email;
            document.getElementById('dashboardUserName').textContent = state.user.firstName;
            document.getElementById('wishlistCountAccount').textContent = state.wishlist.length;
            document.getElementById('orderCount').textContent = state.orders.length;
            
            // Render initial data
            renderOrders();
            renderAddresses();
            
            // Close any open modals
            closeAllModals();
        }

        function renderOrders() {
            const container = document.getElementById('ordersList');
            if (!container) return;
            
            if (state.orders.length === 0) {
                container.innerHTML = '<p class="text-muted">No orders yet. Start shopping!</p>';
                return;
            }
            
            let ordersHTML = '';
            
            state.orders.slice().reverse().forEach(order => {
                ordersHTML += `
                    <div class="card p-4 mb-3">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h5 class="mb-0">Order #${order.orderNumber}</h5>
                                <p class="text-muted mb-0">${new Date(order.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <span class="badge bg-surface-dark text-primary px-3 py-1">${order.status}</span>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <p class="text-muted mb-1">${order.items.length} items</p>
                                <p class="fw-medium mb-0">${formatCurrency(order.total)}</p>
                            </div>
                            <button class="btn btn-outline btn-sm" onclick="viewOrderDetails(${order.orderNumber})">
                                View Details
                            </button>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = ordersHTML;
        }

        function renderAddresses() {
            const container = document.getElementById('addressesList');
            if (!container) return;
            
            if (state.addresses.length === 0) {
                container.innerHTML = '<p class="text-muted">No addresses saved.</p>';
                return;
            }
            
            let addressesHTML = '';
            
            state.addresses.forEach(address => {
                addressesHTML += `
                    <div class="card p-4 mb-3 ${address.isDefault ? 'border-primary' : ''}">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h5 class="mb-1">${address.name} ${address.isDefault ? '<span class="badge bg-primary text-white ms-2">Default</span>' : ''}</h5>
                                <p class="text-muted mb-1">${address.address}</p>
                                <p class="text-muted mb-1">${address.city}</p>
                                <p class="text-muted mb-0">${address.phone}</p>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-text btn-sm" onclick="editAddress(${address.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-text btn-sm text-error" onclick="deleteAddress(${address.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            container.innerHTML = addressesHTML;
        }

        function handleAccountSettings(e) {
            e.preventDefault();
            
            if (!state.user) return;
            
            state.user.firstName = document.getElementById('settingsFirstName').value;
            state.user.lastName = document.getElementById('settingsLastName').value;
            state.user.email = document.getElementById('settingsEmail').value;
            
            localStorage.setItem('zeyadStoreUser', JSON.stringify(state.user));
            showNotification('Account settings updated', 'success');
        }

        // ========== UI FUNCTIONS ==========
        function toggleMobileMenu() {
            const nav = document.getElementById('mainNav');
            const btn = document.getElementById('mobileMenuBtn');
            
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                btn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                btn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }

        function openSearch() {
            document.getElementById('searchModal').classList.add('active');
            document.getElementById('searchOverlay').classList.add('active');
            document.getElementById('searchInput').focus();
            document.body.style.overflow = 'hidden';
        }

        function closeSearch() {
            document.getElementById('searchModal').classList.remove('active');
            document.getElementById('searchOverlay').classList.remove('active');
            document.getElementById('searchInput').value = '';
            document.getElementById('searchResults').innerHTML = '';
            document.body.style.overflow = 'auto';
        }

        function handleSearch(e) {
            const query = e.target.value.toLowerCase();
            const resultsContainer = document.getElementById('searchResults');
            
            if (query.length < 2) {
                resultsContainer.innerHTML = '';
                return;
            }
            
            const results = productsDatabase.filter(product => 
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            ).slice(0, 5);
            
            if (results.length === 0) {
                resultsContainer.innerHTML = '<p class="text-muted p-3">No products found</p>';
                return;
            }
            
            let resultsHTML = '<div class="search-results-list">';
            results.forEach(product => {
                resultsHTML += `
                    <div class="search-result-item p-3 border-bottom cursor-pointer" onclick="addToCart(${product.id}); closeSearch();">
                        <div class="d-flex align-items-center gap-3">
                            <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover;">
                            <div>
                                <h6 class="mb-1">${product.name}</h6>
                                <p class="text-muted mb-0">${formatCurrency(product.price)}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            resultsHTML += '</div>';
            
            resultsContainer.innerHTML = resultsHTML;
        }

        function openCart() {
            loadCartItems();
            document.getElementById('cartSidebar').classList.add('active');
            document.getElementById('cartOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeCart() {
            document.getElementById('cartSidebar').classList.remove('active');
            document.getElementById('cartOverlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function openWishlist() {
            if (!state.user) {
                showNotification('Please login to view your wishlist', 'warning');
                openAccount();
                return;
            }
            
            loadWishlistItems();
            document.getElementById('wishlistSidebar').classList.add('active');
            document.getElementById('wishlistOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeWishlist() {
            document.getElementById('wishlistSidebar').classList.remove('active');
            document.getElementById('wishlistOverlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function openAccount() {
            checkUserLogin();
            document.getElementById('accountModal').classList.add('active');
            document.getElementById('accountOverlay').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeAccount() {
            document.getElementById('accountModal').classList.remove('active');
            document.getElementById('accountOverlay').classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function closeAllModals() {
            closeSearch();
            closeCart();
            closeWishlist();
            closeAccount();
            closeCheckoutModal();
            closeOrderConfirmModal();
        }

        // ========== UTILITY FUNCTIONS ==========
        function saveCart() {
            localStorage.setItem('zeyadStoreCart', JSON.stringify(state.cart));
        }

        function saveWishlist() {
            localStorage.setItem('zeyadStoreWishlist', JSON.stringify(state.wishlist));
        }

        function updateCartCount() {
            const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCount = document.getElementById('cartCount');
            if (cartCount) {
                cartCount.textContent = totalItems;
                cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
            }
        }

        function updateWishlistCount() {
            const wishlistCount = document.getElementById('wishlistCount');
            if (wishlistCount) {
                wishlistCount.textContent = state.wishlist.length;
                wishlistCount.style.display = state.wishlist.length > 0 ? 'flex' : 'none';
            }
        }

        function formatCurrency(amount) {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'EGP',
                minimumFractionDigits: 2
            }).format(amount);
        }

        function getStarRating(rating) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            let stars = '';
            
            for (let i = 0; i < 5; i++) {
                if (i < fullStars) {
                    stars += '<i class="fas fa-star"></i>';
                } else if (i === fullStars && hasHalfStar) {
                    stars += '<i class="fas fa-star-half-alt"></i>';
                } else {
                    stars += '<i class="far fa-star"></i>';
                }
            }
            
            return stars;
        }

        function showNotification(message, type = 'info') {
            const container = document.getElementById('notificationContainer');
            
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            
            const icons = {
                success: 'check-circle',
                error: 'exclamation-circle',
                warning: 'exclamation-triangle',
                info: 'info-circle'
            };
            
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-${icons[type] || 'info-circle'}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close" onclick="this.parentElement.classList.add('hiding')">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            container.appendChild(notification);
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                notification.classList.add('hiding');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 5000);
        }

        function handleScroll() {
            const header = document.getElementById('mainHeader');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        function initializeFilters() {
            // Category filter
            document.getElementById('categoryFilter').addEventListener('change', function() {
                filterByCategory(this.value);
            });
            
            // Sort filter
            document.getElementById('sortFilter').addEventListener('change', function() {
                const sortValue = this.value;
                let sortedProducts = [...state.products];
                
                switch(sortValue) {
                    case 'price-low':
                        sortedProducts.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-high':
                        sortedProducts.sort((a, b) => b.price - a.price);
                        break;
                    case 'newest':
                        // For demo, we'll sort by ID (assuming higher ID = newer)
                        sortedProducts.sort((a, b) => b.id - a.id);
                        break;
                    case 'popular':
                        sortedProducts.sort((a, b) => b.reviews - a.reviews);
                        break;
                }
                
                state.products = sortedProducts;
                renderProducts();
            });
            
            // Filter tags
            document.querySelectorAll('.filter-tag').forEach(tag => {
                tag.addEventListener('click', function() {
                    const filter = this.dataset.filter;
                    
                    document.querySelectorAll('.filter-tag').forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    let filteredProducts = [...productsDatabase];
                    
                    switch(filter) {
                        case 'new':
                            filteredProducts = filteredProducts.filter(p => p.badge === 'new');
                            break;
                        case 'sale':
                            filteredProducts = filteredProducts.filter(p => p.badge === 'sale');
                            break;
                        case 'bestseller':
                            filteredProducts = filteredProducts.filter(p => p.rating >= 4.5);
                            break;
                    }
                    
                    state.products = filteredProducts;
                    state.currentProductPage = 1;
                    renderProducts();
                });
            });
        }

        // ========== HELPER FUNCTIONS ==========
        window.clearCart = function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                state.cart = [];
                saveCart();
                updateCartCount();
                loadCartItems();
                showNotification('Cart cleared', 'info');
            }
        };

        window.viewOrderDetails = function(orderNumber) {
            const order = state.orders.find(o => o.orderNumber === orderNumber);
            if (order) {
                alert(`Order #${order.orderNumber}\nTotal: ${formatCurrency(order.total)}\nStatus: ${order.status}\nDate: ${new Date(order.date).toLocaleDateString()}`);
            }
        };

        window.addNewAddress = function() {
            const address = {
                id: Date.now(),
                name: 'New Address',
                address: 'Enter address',
                city: 'Enter city',
                phone: 'Enter phone',
                isDefault: false
            };
            
            state.addresses.push(address);
            localStorage.setItem('zeyadStoreAddresses', JSON.stringify(state.addresses));
            renderAddresses();
            showNotification('New address added', 'success');
        };

        window.editAddress = function(addressId) {
            const address = state.addresses.find(a => a.id === addressId);
            if (address) {
                const newName = prompt('Enter address name:', address.name);
                if (newName) {
                    address.name = newName;
                    localStorage.setItem('zeyadStoreAddresses', JSON.stringify(state.addresses));
                    renderAddresses();
                    showNotification('Address updated', 'success');
                }
            }
        };

        window.deleteAddress = function(addressId) {
            if (confirm('Are you sure you want to delete this address?')) {
                state.addresses = state.addresses.filter(a => a.id !== addressId);
                localStorage.setItem('zeyadStoreAddresses', JSON.stringify(state.addresses));
                renderAddresses();
                showNotification('Address deleted', 'info');
            }
        };

        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .animate-pulse {
                animation: pulse 0.6s ease-in-out;
            }
            
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
            
            .cart-item {
                display: grid;
                grid-template-columns: 80px 1fr;
                gap: var(--space-md);
                padding: var(--space-md) 0;
                border-bottom: 1px solid var(--border-light);
                align-items: start;
            }
            
            .cart-item:last-child {
                border-bottom: none;
            }
            
            .cart-item-image {
                width: 80px;
                height: 80px;
                border-radius: var(--radius);
                overflow: hidden;
                background: var(--surface-dark);
            }
            
            .cart-item-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .cart-item-details {
                flex: 1;
            }
            
            .cart-item-title {
                font-size: var(--text-base);
                font-weight: 400;
                margin-bottom: var(--space-xs);
            }
            
            .cart-item-price {
                font-size: var(--text-lg);
                font-weight: 400;
                color: var(--primary);
                margin-bottom: var(--space-sm);
            }
            
            .cart-item-actions {
                display: flex;
                align-items: center;
                gap: var(--space-md);
            }
            
            .quantity-control {
                display: flex;
                align-items: center;
                gap: var(--space-sm);
                background: var(--surface-dark);
                border-radius: var(--radius);
                padding: var(--space-xs);
            }
            
            .quantity-btn {
                width: 24px;
                height: 24px;
                border-radius: var(--radius-sm);
                border: 1px solid var(--border-light);
                background: var(--surface);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: var(--text-primary);
                font-weight: 400;
                transition: var(--transition);
            }
            
            .quantity-btn:hover {
                background: var(--primary);
                border-color: var(--primary);
                color: var(--text-light);
            }
            
            .quantity-input {
                width: 40px;
                text-align: center;
                border: none;
                background: transparent;
                font-weight: 400;
                font-size: var(--text-base);
                color: var(--text-primary);
            }
            
            .remove-btn {
                background: transparent;
                border: none;
                color: var(--error);
                cursor: pointer;
                font-size: var(--text-sm);
                font-weight: 400;
                display: flex;
                align-items: center;
                gap: var(--space-xs);
                transition: var(--transition);
            }
            
            .remove-btn:hover {
                color: #c82333;
            }
        `;
        document.head.appendChild(style);