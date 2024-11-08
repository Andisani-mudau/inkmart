import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Offers");
        this.exchangeRate = 19; // USD to ZAR rate
        this.allProducts = []; // Initialize as empty array
        this.filteredProducts = []; // Initialize as empty array
        this.cart = [];
        this.currentQuery = '';
        this.currentSort = '';
        this.currentFilter = 'all';
        this.loadProducts(); // Call method to load products
    }

    async loadProducts() {
        try {
            const response = await fetch('/static/data/products.json');
            const products = await response.json();
            this.allProducts = products.map(product => ({
                ...product,
                price: product.price * this.exchangeRate
            }));
            this.filteredProducts = [...this.allProducts];
            this.render(); // Re-render the view after loading products
        } catch (error) {
            console.error('Error loading products:', error);
            this.allProducts = [];
            this.filteredProducts = [];
        }
    }

    updateCartSummary() {
        const totalPrice = this.cart.reduce((sum, item) => sum + item.price, 0);
        const cartSummary = document.querySelector('.cart-summary');
        
        cartSummary.innerHTML = `
            <p class="total-price">Total: R${totalPrice.toFixed(2)}</p>
            <p class="total-items">Total Items: ${this.cart.length}</p>
            <button class="checkout" ${this.cart.length === 0 ? 'disabled' : ''}>
                Checkout
            </button>
        `;

        // Update cart icon number.
        document.querySelector('.cart-number').textContent = this.cart.length;
    }

    renderCartContent() {
        const cartContent = document.querySelector('.cart-content');
        
        if (this.cart.length === 0) {
            cartContent.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartContent.innerHTML = this.cart.map(item => `
                <div class="product-card" data-product-id="${item.id}">
                    <div class="product-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="product-details">
                        <h2 class="product-title">${item.title}</h2>
                        <p class="product-price">R${item.price.toFixed(2)}</p>
                    </div>
                    <button class="remove-from-cart"><i class="fas fa-trash-alt"></i></button>
                </div>
            `).join('');
        }

        // Update the summary whenever cart content changes
        this.updateCartSummary();
    }

    async getHtml() {
        const productListHtml = `
            <div class="product-list">
                ${this.filteredProducts.map(product => `
                    <div class="product card" data-product-id="${product.id}">
                        <div class="image">
                            <img src="${product.image}" alt="${product.title}">
                            <div class="product-info">
                                
                            </div>
                        </div>
                        <div class="product-info content">
                            <h2 class="product-title">${product.title}</h2>
                            <p class="product-description">${product.description}</p>
                            <p id="product-price" class="product-price" style="position: absolute; top: 10px; left: 10px; color: #fff; padding: 5px 10px; border-radius: 10px;">R${product.price.toFixed(2)}</p>
                        </div>
                        <button class="cardLink add-to-cart button-to-cart">Add to Cart</button>
                    </div>
                `).join('')}
            </div>
        `;

        return `
            <div class="offers">
                <div class="banner">
                    <img src="https://img.freepik.com/premium-photo/black-white-photo-computer-desk-with-lamp-monitor-it_1304175-146270.jpg?w=740" alt="Offers">
                    <div class="banner-text">
                        <h1 class="text-white">Offers</h1>
                    </div>
                </div>
                <div class="offer-nav">
                    <div class="search-sort-filter">
                        <div class="search-bar">
                            <input type="text" placeholder="Search">
                            <button><i class="fas fa-search"></i></button>
                        </div>
                        <div class="sort">
                            <select name="sort">
                                <option value="" disabled selected>Sort by</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                                <option value="price-low-high">Price (Low to High)</option>
                                <option value="price-high-low">Price (High to Low)</option>
                            </select>
                        </div>
                        <div class="filter">
                            <select name="filter">
                                <option value="" disabled selected>Filter by</option>
                                <option value="all">All</option>
                                <option value="Computers">Computers</option>
                                <option value="Printers">Printers</option>
                                <option value="Copiers">Copiers</option>
                                <option value="Telecommunications">Telecommunications</option>
                                <option value="Solar Panels">Solar Panels</option>
                            </select>
                        </div>
                    </div>
                    <button class="cart-icon-with-number">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-number">0</span>
                    </button>
                </div>
                ${productListHtml}
                <!-- Full-screen pop-up -->
                <div id="product-popup" class="popup">
                    <div class="popup-content">
                        <span class="close">&times;</span>
                        <div class="popup-image">
                            <img src="${this.allProducts[0].image}" alt="${this.allProducts[0].title}">
                        </div>
                        <div class="popup-details">
                            <h2 class="popup-title">${this.allProducts[0].title}</h2>
                            <p class="popup-price">R${this.allProducts[0].price.toFixed(2)}</p>
                            <div class="popup-availability-category">
                                <p class="popup-availability">${this.allProducts[0].availability}</p>
                                <p class="popup-category">${this.allProducts[0].category}</p>
                            </div>
                            <h3>Description:</h3>
                            <p class="popup-description">${this.allProducts[0].description}</p>
                            <div class="popup-features">
                                <h3>Features:</h3>
                                <ul>
                                    ${this.allProducts[0].features.map(feature => `
                                        <li>${feature}</li>
                                    `).join('')}
                                </ul>
                            </div>
                            <a href="#" class="cardLink add-to-cart">Add to Cart</a>
                        </div>
                    </div>
                </div>

                <div class="cart-popup">
                    <span class="close">&times;</span>
                    <div class="cart-content">
                        <!-- Cart items will be dynamically inserted here -->
                    </div>
                    <div class="cart-summary">
                        <p class="total-price">Total: R0.00</p>
                        <p class="total-items">Total Items: 0</p>
                        <button class="checkout" disabled>Checkout</button>
                    </div>
                </div>

                <div class="checkout-form-popup">
                    <span class="close">&times;</span>
                    <div class="slider-of-product-images-that-was-in-cart">
                        <img src="https://via.placeholder.com/300x200" alt="Product Image">
                    </div>
                    <div class="checkout-form-content">
                        <h2>Checkout</h2>
                        <form>
                            <div class="form-group">                          
                                <input type="text" id="first-name" required placeholder="First Name">
                                <input type="text" id="last-name" required placeholder="Last Name">
                            </div>
                            <div class="form-group">
                                <input type="email" id="email" required placeholder="Email">
                            </div>
                            <div class="form-group">
                                <input type="text" id="address-1" required placeholder="Address 1">
                                <input type="text" id="address-2" required placeholder="Address 2">
                                <input type="text" id="city" required placeholder="City">
                                <input type="text" id="state" required placeholder="State">
                                <input type="text" id="zip" required placeholder="Zip">
                            </div>
                            <div class="form-group">
                                <select id="payment-method" required>
                                    <option value="payment-method" disabled selected>Payment Method</option>
                                    <option value="credit-card">Credit Card</option>
                                    <option value="debit-card">Debit Card</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="cash">Cash</option>
                                </select>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
                <div class="checkout-success-popup">
                    <div class="checkout-success-content">
                        <h2>Checkout Success!</h2>
                        <p>Your order has been placed successfully.</p>
                        <p>Order ID: <span class="order-id"></span></p>
                        <button class="close-popup">Close</button>
                    </div>
                </div>
            </div>
        `;
    }

    async render() {
        const html = await this.getHtml();
        document.querySelector('#app').innerHTML = html;
        await this.afterRender();
    }

    async afterRender() {
        const productCards = document.querySelectorAll('.product.card');
        const productPopup = document.getElementById('product-popup');
        const closeButtons = document.querySelectorAll('.close');
        
        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const productId = card.dataset.productId;
                const product = this.allProducts.find(p => p.id === parseInt(productId));
                
                if (product) {
                    const popupContent = productPopup.querySelector('.popup-content');
                    popupContent.querySelector('.popup-image img').src = product.image;
                    popupContent.querySelector('.popup-title').textContent = product.title;
                    popupContent.querySelector('.popup-price').textContent = `R${product.price.toFixed(2)}`;
                    popupContent.querySelector('.popup-availability').textContent = product.availability;
                    popupContent.querySelector('.popup-category').textContent = product.category;
                    popupContent.querySelector('.popup-description').textContent = product.description;
                    
                    const featuresList = popupContent.querySelector('.popup-features ul');
                    featuresList.innerHTML = product.features.map(feature => `
                        <li>${feature}</li>
                    `).join('');
                    
                    productPopup.style.display = 'block';
                }
            });
        });

        // Add to cart handler
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                
                let productId;
                if (button.closest('.product.card')) {
                    productId = button.closest('.product.card').dataset.productId;
                } else if (document.getElementById('product-popup').style.display === 'block') {
                    productId = document.querySelector('.popup-content').dataset.productId;
                }

                const product = this.allProducts.find(p => p.id === parseInt(productId));
                if (product) {
                    this.cart.push(product);
                    this.renderCartContent();
                }
            });
        });

        // Remove from cart handler
        document.querySelector('.cart-content').addEventListener('click', (e) => {
            if (e.target.closest('.remove-from-cart')) {
                const productCard = e.target.closest('.product-card');
                const productId = parseInt(productCard.dataset.productId);
                
                this.cart = this.cart.filter(item => item.id !== productId);
                this.renderCartContent();
            }
        });

        // Checkout button handler
        document.querySelector('.cart-summary').addEventListener('click', (e) => {
            if (e.target.classList.contains('checkout') && this.cart.length > 0) {
                const cartPopup = document.querySelector('.cart-popup');
                const checkoutForm = document.querySelector('.checkout-form-popup');
                
                cartPopup.style.display = 'none';
                checkoutForm.style.display = 'flex';
            }
        });

        // Update cart popup display
        const cartIcon = document.querySelector('.cart-icon-with-number');
        const cartPopup = document.querySelector('.cart-popup');

        cartIcon.addEventListener('click', () => {
            this.renderCartContent(); // Refresh cart content when opened
            cartPopup.style.display = 'flex';
        });

        // Checkout functionality
        const checkoutButton = document.querySelector('.checkout');
        const checkoutForm = document.querySelector('.checkout-form-popup');
        const checkoutSuccess = document.querySelector('.checkout-success-popup');

        checkoutButton.addEventListener('click', () => {
            cartPopup.style.display = 'none';
            checkoutForm.style.display = 'flex';
        });

        // Form submission
        const form = document.querySelector('.checkout-form-popup form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                firstName: document.getElementById('first-name').value,
                lastName: document.getElementById('last-name').value,
                email: document.getElementById('email').value,
                address1: document.getElementById('address-1').value,
                address2: document.getElementById('address-2').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                zip: document.getElementById('zip').value,
                paymentMethod: document.getElementById('payment-method').value
            };

            const success = await this.submitForm(formData);
            
            if (success) {
                form.reset();
            }
        });

        // Close buttons functionality
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                productPopup.style.display = 'none';
                cartPopup.style.display = 'none';
                checkoutForm.style.display = 'none';
                checkoutSuccess.style.display = 'none';
            });
        });

        // Close success popup
        const closeSuccessButton = document.querySelector('.close-popup');
        closeSuccessButton.addEventListener('click', () => {
            checkoutSuccess.style.display = 'none';
            this.cart = [];
            this.updateCartSummary();
            const cartNumber = document.querySelector('.cart-number');
            if (cartNumber) {
                cartNumber.textContent = '0';
            }
        });

        // Search Functionality
        const searchInput = document.querySelector('.search-bar input');
        const searchButton = document.querySelector('.search-bar button');

        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim().toLowerCase();
            this.currentQuery = query;
            this.applyFilters();
        });

        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim().toLowerCase();
                this.currentQuery = query;
                this.applyFilters();
            }
        });

        // Sort Functionality
        const sortSelect = document.querySelector('.sort select');
        sortSelect.addEventListener('change', (e) => {
            const sortOption = e.target.value;
            this.currentSort = sortOption;
            this.applyFilters();
        });

        // Filter Functionality
        const filterSelect = document.querySelector('.filter select');
        filterSelect.addEventListener('change', (e) => {
            const filterOption = e.target.value;
            this.currentFilter = filterOption;
            this.applyFilters();
        });
    }

    applyFilters() {
        // Filter based on search query and selected category
        this.filteredProducts = this.allProducts.filter(product => {
            const matchesQuery = product.title.toLowerCase().includes(this.currentQuery) || 
                                 product.description.toLowerCase().includes(this.currentQuery);
            const matchesFilter = this.currentFilter === 'all' || 
                                  product.category.toLowerCase() === this.currentFilter.toLowerCase();
            return matchesQuery && matchesFilter;
        });

        // Sort the filtered products
        switch(this.currentSort) {
            case 'newest':
                this.filteredProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            case 'oldest':
                this.filteredProducts.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
                break;
            case 'price-low-high':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-low':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            default:
                // No sorting applied
                break;
        }

        // Re-render the product list with the updated filteredProducts
        this.render();
    }

    async submitForm(formData) {
        try {
            const response = await fetch('/send-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ formData: formData, cart: this.cart })
            });
    
            const result = await response.json();
    
            if (result.Sent && result.Sent.length > 0) {
                // Clear the cart
                this.cart = [];
                this.updateCartSummary();
    
                // Clear all form fields
                const form = document.querySelector('.checkout-form-popup form');
                form.reset();
    
                // Hide checkout form
                const checkoutForm = document.querySelector('.checkout-form-popup');
                checkoutForm.style.display = 'none';
    
                // Display success popup with Order ID
                const checkoutSuccess = document.querySelector('.checkout-success-popup');
                const orderIdElement = checkoutSuccess.querySelector('.order-id');
                orderIdElement.textContent = result.Sent[0].MessageID;
                checkoutSuccess.style.display = 'flex';
    
                // Reset cart icon number
                const cartNumber = document.querySelector('.cart-number');
                if (cartNumber) {
                    cartNumber.textContent = '0';
                }
            } else {
                alert("There was an error processing your order. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting order:", error);
            alert("There was an error processing your order. Please try again.");
        }
    }
}

