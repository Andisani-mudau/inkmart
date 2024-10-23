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
                            <h2 class="popup-title">HP Laptop 343</h2>
                            <p class="popup-price">$3097,98</p>
                            <div class="popup-availability-category">
                                <p class="popup-availability">In Stock</p>
                                <p class="popup-category">Computer</p>
                            </div>
                            <h3>Description:</h3>
                            <p class="popup-description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis ducimus eum hic. Iusto id recusandae illo maiores, perspiciatis ut illum quod vero temporibus. Eum ratione quis explicabo commodi itaque. Ratione. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis ducimus eum hic. Iusto id recusandae illo maiores, perspiciatis ut illum quod vero temporibus. Eum ratione quis explicabo commodi itaque. Ratione.</p>
                            <div class="popup-features">
                                <h3>Features:</h3>
                                <ul>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</ul>
                                <ul>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</ul>
                                <ul>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</ul>
                                <ul>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</ul>
                                <ul>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</ul>
                                <ul>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</ul>
                            </div>
                            
                            <a href="#" class="cardLink add-to-cart">Add to Cart</a>
                        </div>
                    </div>
                </div>

                <div class="cart-popup">
                    <span class="close">&times;</span>
                    <div class="cart-content">
                        <div class="product-card">
                            <div class="product-image">
                                <img src="https://via.placeholder.com/300x200" alt="Product Image">
                            </div>
                            <div class="product-details">
                                <h2 class="product-title">Laptop 6558</h2>
                                <p class="product-price">$367.97</p>
                            </div>
                            <button class="remove-from-cart"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    </div>
                    <div class="cart-summary">
                        <p class="total-price">Total: $0</p>
                        <p class="total-items">Total Items: 0</p>
                        <button class="checkout">Checkout</button>
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

}
