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

function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ----------------- RENDER PRODUCTS -----------------
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Event listeners for all buttons
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.getAttribute("data-id"));
      addToCart(productId);
    });
  });
}

// ----------------- RENDER CART -----------------
function renderCart() {
  cartList.innerHTML = "";
  const cart = getCart();

  if (cart.length === 0) {
    cartList.innerHTML = "<li>Cart is empty</li>";
    return;
  }

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} 
      <button class="remove-btn" data-id="${item.id}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Attach remove button listeners
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const productId = parseInt(btn.getAttribute("data-id"));
      removeFromCart(productId);
    });
  });
}

// ----------------- ADD TO CART -----------------
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cart = getCart();

  cart.push(product); // Add new product
  saveCart(cart);     // Save to sessionStorage
  renderCart();       // Update UI
}

// ----------------- REMOVE FROM CART -----------------
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  renderCart();
}

// ----------------- CLEAR CART -----------------
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// ----------------- INITIAL RENDER -----------------
renderProducts();
renderCart();

//
