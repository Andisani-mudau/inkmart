import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Offers");
        this.products = [
            {
                id: 1,
                title: "HP Laptop 343",
                description: "High-performance laptop with latest specifications",
                price: 999.99,
                image: "https://via.placeholder.com/300x200",
                availability: "In Stock",
                category: "Laptops",
                features: [
                    "8GB RAM",
                    "512GB SSD",
                    "Intel Core i5 Processor",
                    "15.6-inch FHD Display",
                    "Windows 11",
                    "Backlit Keyboard"
                ]
            },
            {
                id: 2,
                title: "Dell XPS 15",
                description: "Premium ultrabook with 4K display and exceptional build quality",
                price: 1499.99,
                image: "https://via.placeholder.com/300x200",
                availability: "In Stock",
                category: "Laptops",
                features: [
                    "16GB RAM",
                    "1TB NVMe SSD",
                    "Intel Core i7 Processor",
                    "15.6-inch 4K OLED Display",
                    "NVIDIA RTX 3050 Ti",
                    "Thunderbolt 4 Ports"
                ]
            },
            {
                id: 3,
                title: "MacBook Pro",
                description: "Powerful laptop for creative professionals with M2 chip",
                price: 1999.99,
                image: "https://via.placeholder.com/300x200",
                availability: "Limited Stock",
                category: "Laptops",
                features: [
                    "32GB Unified Memory",
                    "1TB SSD Storage",
                    "Apple M2 Pro Chip",
                    "14-inch Liquid Retina XDR Display",
                    "ProMotion Technology",
                    "Studio-quality Mic Array"
                ]
            },
            {
                id: 4,
                title: "ThinkPad X1",
                description: "Business laptop with excellent build quality and security features",
                price: 1299.99,
                image: "https://via.placeholder.com/300x200",
                availability: "In Stock",
                category: "Laptops",
                features: [
                    "16GB DDR4 RAM",
                    "512GB PCIe SSD",
                    "Intel Core i7 vPro",
                    "14-inch QHD Display",
                    "Fingerprint Reader",
                    "Military-grade Durability"
                ]
            }
        ];
        this.cart = [];
    }

    updateCartSummary() {
        const totalPrice = this.cart.reduce((sum, item) => sum + item.price, 0);
        const cartSummary = document.querySelector('.cart-summary');
        
        cartSummary.innerHTML = `
            <p class="total-price">Total: $${totalPrice.toFixed(2)}</p>
            <p class="total-items">Total Items: ${this.cart.length}</p>
            <button class="checkout" ${this.cart.length === 0 ? 'disabled' : ''}>
                Checkout
            </button>
        `;

        // Update cart icon number
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
                        <p class="product-price">$${item.price.toFixed(2)}</p>
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
                ${this.products.map(product => `
                    <div class="product card" data-product-id="${product.id}">
                        <div class="image">
                            <img src="${product.image}" alt="${product.title}">
                            <div class="product-info">
                                <p class="product-availability">${product.availability}</p>
                            </div>
                        </div>
                        <div class="product-info content">
                            <h2 class="product-title">${product.title}</h2>
                            <p class="product-description">${product.description}</p>
                            <p class="product-price">$${product.price}</p>
                        </div>
                        <button class="cardLink add-to-cart button-to-cart">Add to Cart</button>
                    </div>
                `).join('')}
            </div>
        `;

        return `
            <div class="offers">
                <div class="banner">
                    <img src="https://via.placeholder.com/300x200" alt="Offers">
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
                                <option value="category1">Category 1</option>
                                <option value="category2">Category 2</option>
                                <option value="category3">Category 3</option>
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
                            <img src="${this.products[0].image}" alt="${this.products[0].title}">
                        </div>
                        <div class="popup-details">
                            <h2 class="popup-title">${this.products[0].title}</h2>
                            <p class="popup-price">$${this.products[0].price}</p>
                            <div class="popup-availability-category">
                                <p class="popup-availability">${this.products[0].availability}</p>
                                <p class="popup-category">${this.products[0].category}</p>
                            </div>
                            <h3>Description:</h3>
                            <p class="popup-description">${this.products[0].description}</p>
                            <div class="popup-features">
                                <h3>Features:</h3>
                                <ul>
                                    ${this.products[0].features.map(feature => `
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
                        <p class="total-price">Total: $0.00</p>
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

    async afterRender() {
        const productCards = document.querySelectorAll('.product.card');
        const productPopup = document.getElementById('product-popup');
        const closeButtons = document.querySelectorAll('.close');
        
        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const productId = card.dataset.productId;
                const product = this.products.find(p => p.id === parseInt(productId));
                
                if (product) {
                    const popupContent = productPopup.querySelector('.popup-content');
                    popupContent.querySelector('.popup-image img').src = product.image;
                    popupContent.querySelector('.popup-title').textContent = product.title;
                    popupContent.querySelector('.popup-price').textContent = `$${product.price}`;
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

                const product = this.products.find(p => p.id === parseInt(productId));
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
            cartItems = 0;
            cartNumber.textContent = cartItems;
            // Add logic here to clear cart
        });
    }

    async submitForm(formData) {
        try {
            // Generate a unique order ID
            const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();

            // Construct the email body using form data
            const emailBody = `
                <div style="font-family: Arial, sans-serif;">
                    <h2>New Order Submission</h2>
                    <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
                    <p><strong>Email:</strong> ${formData.email}</p>
                    <p><strong>Address 1:</strong> ${formData.address1}</p>
                    <p><strong>Address 2:</strong> ${formData.address2}</p>
                    <p><strong>City:</strong> ${formData.city}</p>
                    <p><strong>State:</strong> ${formData.state}</p>
                    <p><strong>ZIP:</strong> ${formData.zip}</p>
                    <p><strong>Payment Method:</strong> ${formData.paymentMethod}</p>
                    <h3>Order Details:</h3>
                    <ul>
                        ${this.cart.map(item => `<li>${item.title} - $${item.price.toFixed(2)}</li>`).join('')}
                    </ul>
                    <p><strong>Total:</strong> $${this.cart.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</p>
                </div>
            `;

            // Send email to the company using the provided credentials
            await Email.send({
                SecureToken: "955149455BCB206F0C68232016929E1BF4ED1E3BD31FF2CB4C6A972B1A9E71608B90E494649EA473FA727F115A02752C",
                To: 'info@businessdev.co.za',
                From: 'andisanimudau101@gmail.com',
                Subject: `New Order Submission #${orderId}`,
                Body: emailBody
            });

            // Optionally, send a confirmation email to the customer
            const customerEmailBody = `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Order Confirmation #${orderId}</h2>
                    <p>Thank you for your order! Here are your order details:</p>
                    ${emailBody}
                    <p>We will contact you shortly with further information.</p>
                </div>
            `;

            await Email.send({
                SecureToken: "955149455BCB206F0C68232016929E1BF4ED1E3BD31FF2CB4C6A972B1A9E71608B90E494649EA473FA727F115A02752C",
                To: formData.email,
                From: 'andisanimudau101@gmail.com',
                Subject: `Order Confirmation #${orderId}`,
                Body: customerEmailBody
            });

            // Clear the cart and update the UI
            this.cart = [];
            this.updateCartSummary();

            // Display a success popup or message
            const checkoutSuccess = document.querySelector('.checkout-success-popup');
            const orderIdElement = checkoutSuccess.querySelector('.order-id');
            orderIdElement.textContent = orderId;
            checkoutSuccess.style.display = 'flex';

            return true;

        } catch (error) {
            console.error("Error submitting order:", error);
            alert("There was an error processing your order. Please try again.");
            return false;
        }
    }
}
