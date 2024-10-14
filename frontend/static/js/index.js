import Home from "./views/Home.js";
import Offers from "./views/Offers.js";
import Blog from "./views/Blog.js";
import BlogView from "./views/BlogView.js";
import About from "./views/About.js";
import Contact from "./views/Contact.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    // Define the routes for the single-page application
    // Each route object contains a path and its corresponding view component
    const routes = [
        { path: "/", view: Home },
        { path: "/blog", view: Blog },
        { path: "/blog/:id", view: BlogView },
        { path: "/offers", view: Offers },
        { path: "/contact", view: Contact },
        { path: "/about", view: About }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    document.querySelector("#app").innerHTML = await view.getHtml();

    if (match.route.path == "/offers") {
        //...
        // Sample product data with categories
        let products = [
            { id: 1, name: 'Laptop', price: 1200, category: 'Laptop' },
            { id: 2, name: 'Monitor', price: 300, category: 'Accessory' },
            { id: 3, name: 'Keyboard', price: 50, category: 'Accessory' },
            { id: 4, name: 'Mouse', price: 25, category: 'Accessory' },
            { id: 5, name: 'Graphics Card', price: 700, category: 'Component' }
        ];

        let cart = [];

        // Function to populate product list
        function loadProducts(productListToDisplay = products) {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            productListToDisplay.forEach(product => {
                productList.innerHTML += `
                    <div>
                        <p>${product.name} - $${product.price} (${product.category})</p>
                        <button onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                `;
            });
        }

        // Function to filter products based on search, category, and price range
        function filterProducts() {
            const searchTerm = document.getElementById('search-bar').value.toLowerCase();
            const selectedCategory = document.getElementById('category-filter').value;
            const minPrice = parseFloat(document.getElementById('price-min').value) || 0;
            const maxPrice = parseFloat(document.getElementById('price-max').value) || Infinity;

            const filteredProducts = products.filter(product => {
                const isNameMatch = product.name.toLowerCase().includes(searchTerm);
                const isCategoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
                const isPriceMatch = product.price >= minPrice && product.price <= maxPrice;
                return isNameMatch && isCategoryMatch && isPriceMatch;
            });
            
            loadProducts(filteredProducts);
        }

        // Function to sort products by price or name
        function sortProducts() {
            const sortOption = document.getElementById('sort-options').value;

            if (sortOption === 'price-asc') {
                products.sort((a, b) => a.price - b.price);
            } else if (sortOption === 'price-desc') {
                products.sort((a, b) => b.price - a.price);
            } else if (sortOption === 'name-asc') {
                products.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOption === 'name-desc') {
                products.sort((a, b) => b.name.localeCompare(a.name));
            }

            loadProducts();
        }

        // Function to add product to the cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            cart.push(product);
            updateCart();
        }

        // Function to update cart details
        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const totalItems = document.getElementById('total-items');
            const totalAmount = document.getElementById('total-amount');
            const cartCount = document.getElementById('cart-count');

            cartItems.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                total += item.price;
                cartItems.innerHTML += `
                    <div>
                        <p>${item.name} - $${item.price}</p>
                        <button onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
            });
            totalItems.textContent = cart.length;
            totalAmount.textContent = total.toFixed(2);
            cartCount.textContent = `Cart (${cart.length})`;
        }

        // Function to remove item from cart
        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }

        // Function to show the order form
        function showOrderForm() {
            document.getElementById('order-form').style.display = 'block';
        }
        
        // Function to submit order
        function submitOrder(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;

            // Email simulation for confirmation
            if (cart.length > 0) {
                sendOrderEmail(email, name, address);
            } else {
                showPopup('Your cart is empty!', false);
            }
        }

        // Simulated email function (for both user and company)
        function sendOrderEmail(userEmail, name, address) {
            // Simulate email sending
            console.log('Order email sent to:', userEmail);
            console.log('Order details sent to company:', { name, address, cart });

            // Show success message
            showPopup('Order submitted successfully!', true);

            // Clear the cart
            cart = [];
            updateCart();
        }

        // Function to show success/failure popup
        function showPopup(message, success) {
            const popupMessage = document.getElementById('popup-message');
            const popupText = document.getElementById('popup-text');

            popupText.textContent = message;
            popupMessage.style.display = 'block';

            // Hide popup after 3 seconds
            setTimeout(() => {
                popupMessage.style.display = 'none';
            }, 3000);
        }

        // Load products on page load
        loadProducts();

        // END OF FILE: app.js
    } else {
        //...
    }
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});