import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Offers");
    }

    async getHtml() {
        return `
    <!-- Search, Filter and Sort Section -->
    <div class="">
        <div>
            <span id="cart-count">Cart (0)</span>
        </div>
        <!-- Search by Product Name -->
        <input type="text" id="search-bar" placeholder="Search for products..." onkeyup="filterProducts()">
        
        <!-- Filter by Category -->
        <label for="category-filter">Category:</label>
        <select id="category-filter" onchange="filterProducts()">
            <option value="all">All</option>
            <option value="Laptop">Laptops</option>
            <option value="Accessory">Accessories</option>
            <option value="Component">Components</option>
        </select>

        <!-- Filter by Price Range -->
        <label for="price-min">Min Price:</label>
        <input type="number" id="price-min" oninput="filterProducts()" placeholder="0">

        <label for="price-max">Max Price:</label>
        <input type="number" id="price-max" oninput="filterProducts()" placeholder="Any">

        <!-- Sorting Options -->
        <label for="sort-options">Sort by:</label>
        <select id="sort-options" onchange="sortProducts()">
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
        </select>
    </div>

    <!-- Product List -->
    <div id="product-list">
        <!-- Product items will be dynamically populated here by JavaScript -->
    </div>

    <!-- Cart Section is hidden, shows up when the cart button is clicked -->
    <div id="cart-section">
        <h2>Cart</h2>
        <div id="cart-items">
            <!-- Cart items will be dynamically populated here by JavaScript -->
        </div>
        <p>Total Items: <span id="total-items">0</span></p>
        <p>Total Amount: <span id="total-amount">0.00</span></p>
        <button id="order-button" onclick="showOrderForm()">Order</button>
    </div>

    <!-- Order Form, is hidden, shows up when the Order button is clicked  -->
    <div id="order-form" style="display: none;">
        <h2>Order Details</h2>
        <form id="orderForm" onsubmit="submitOrder(event)">
            <label for="name">Name:</label>
            <input type="text" id="name" required><br>
            <label for="email">Email:</label>
            <input type="email" id="email" required><br>
            <label for="address">Address:</label>
            <input type="text" id="address" required><br>
            <button type="submit">Request Order</button>
        </form>
    </div>

    <!-- Order Success/Failure Popup -->
    <div id="popup-message" style="display: none;">
        <p id="popup-text"></p>
    </div>

    <script src="app.js"></script>
        `;
    }
}