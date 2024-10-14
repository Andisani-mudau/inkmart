import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Offers");
    }

    async getHtml() {
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
                        <details>
                            <summary>Sort by</summary>
                            <div class="dropdown-content">
                                <a href="#">Newest</a>
                                <a href="#">Oldest</a>
                                <a href="#">Price (Low to High)</a>
                                <a href="#">Price (High to Low)</a>
                            </div>
                        </details>
                        <details>
                            <summary>Filter by</summary>
                            <div class="dropdown-content">
                                <a href="#">All</a>
                                <a href="#">Category 1</a>
                                <a href="#">Category 2</a>
                                <a href="#">Category 3</a>
                            </div>
                        </details>
                    </div>
                    <button class="cart-icon-with-number">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-number">0</span>
                    </button>
                </div>
                <div class="product-list">
                    <div class="product card" data-product-id="1">
                        <div class="image">
                            <img src="https://via.placeholder.com/300x200" alt="Product placeholder">
                            <div class="product-info">
                                <p class="product-availability">In Stock</p>
                            </div>
                        </div>
                        <div class="product-info content">
                            <h2 class="product-title">Product 2</h2>
                            <p class="product-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                            <p class="product-price">$100</p>
                        </div>
                        <a href="#" class="cardLink add-to-cart">Add to Cart</a>
                    </div>
                </div>
                    <!-- Full-screen pop-up -->
                <div id="product-popup" class="popup">
                    <div class="popup-content">
                        <span class="close">&times;</span>
                        <div class="popup-image">
                            <img src="https://via.placeholder.com/300x200"" alt="Product Image">
                        </div>
                        <div class="popup-details">
                            <h2 class="popup-title"></h2>
                            <p class="popup-price"></p>
                            <p class="popup-availability"></p>
                            <p class="popup-description"></p>
                            <div class="popup-features">
                                <h3>Features:</h3>
                                <ul></ul>
                            </div>
                            <p class="popup-category"></p>
                            <a href="#" class="cardLink add-to-cart">Add to Cart</a>
                        </div>
                    </div>
                </div>

                <div class="cart-popup">
                    <div class="cart-content">
                        <div class="product-card">
                            <div class="product-image">
                                <img src="">
                            </div>
                            <div class="product-details">
                                <h2 class="product-title"></h2>
                                <p class="product-price"></p>
                            </div>
                            <button class="remove-from-cart">Remove</button>
                        </div>
                    </div>
                    <div class="cart-summary">
                        <p class="total-price">Total: $0</p>
                        <p class="total-items">Total Items: 0</p>
                        <button class="checkout">Checkout</button>
                    </div>
                </div>

                <div class="checkout-form-popup">
                    <div class="slider-of-product-images-that-was-in-cart">
                        <img src="https://via.placeholder.com/300x200" alt="Product Image">
                    </div>
                    <div class="checkout-form-content">
                        <h2>Checkout</h2>
                        <form>
                            <div class="form-group">
                                <label for="first-name">First Name</label>
                                <input type="text" id="first-name" required>
                                <label for="last-name">Last Name</label>
                                <input type="text" id="last-name" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" required>
                            </div>
                            <div class="form-group">
                                <label for="address-1">Address 1</label>
                                <input type="text" id="address-1" required>
                                <label for="address-2">Address 2</label>
                                <input type="text" id="address-2" required>
                                <label for="city">City</label>
                                <input type="text" id="city" required>
                                <label for="state">State</label>
                                <input type="text" id="state" required>
                                <label for="zip">Zip</label>
                                <input type="text" id="zip" required>
                            </div>
                            <div class="form-group">
                                <label for="payment-method">Payment Method</label>
                                <select id="payment-method" required>
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
                        <h2>Checkout Success</h2>
                        <p>Your order has been placed successfully.</p>
                        <p>Order ID: <span class="order-id"></span></p>
                        <button class="close-popup">Close</button>
                    </div>
                </div>
            </div>
        `;
    }

    async after_render() {
        
    }
}
