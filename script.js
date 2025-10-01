// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

function setupCartButtons() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id);
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
	const cart = sessionStorage.getItem("cart");
	if(!cart) return;

	const cartItems = JSON.parse(cart);
	cartList.innerHTML = "";
		
	cartItems.forEach((item) => {
		const li = document.createElement("li");
	    li.textContent = `${item.name} - $${item.price}`;

		const removeBtn = document.createElement("button");
	    removeBtn.textContent = "Remove";

		removeBtn.addEventListener("click", () => {
	      removeFromCart(item.id);
	    });

		li.appendChild(removeBtn);
		cartList.appendChild(li);
	})	
}



// Add item to cart
function addToCart(productId) {
	const product = products.find((p) => p.id === productId); 
	if(!product) return;

	const cartItems = sessionStorage.getItem("cart");
	const cartArray = cartItems ? JSON.parse(cartItems) : [];
	cartArray.push(product);

	sessionStorage.setItem("cart", JSON.stringify(cartArray));
	
	renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
	const cart = sessionStorage.getItem("cart");
	const items = JSON.parse(cart);

	const index = items.findIndex((item) => item.id === productId);
	if(index !== -1){
		items.splice(index, 1);
		sessionStorage.setItem("cart", JSON.stringify(items));
	}

	renderCart()
}

// Clear cart
function clearCart() {
	sessionStorage.removeItem("cart");
	cartList.innerHTML = "";
	renderCart();
}

// Initial render
renderProducts();
setupCartButtons();
renderCart();

clearCartBtn.addEventListener("click", clearCart);