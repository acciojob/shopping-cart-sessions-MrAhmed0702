// ----------------- PRODUCT DATA -----------------
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// ----------------- DOM ELEMENTS -----------------
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// ----------------- CART HELPERS -----------------
function getCart() {
  return JSON.parse(sessionStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// ----------------- RENDER PRODUCTS -----------------
function renderProducts() {
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
    `;
    productList.appendChild(li);
  });

  // Add event listeners for "Add to Cart"
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

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price} 
      <button class="remove-btn" data-id="${index}">Remove</button>
    `;
    cartList.appendChild(li);
  });

  // Attach remove button listeners
  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-id"));
      removeFromCart(index);
    });
  });
}

// ----------------- ADD TO CART -----------------
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cart = getCart();
  cart.push(product); // allow duplicates
  saveCart(cart);
  renderCart();
}

// ----------------- REMOVE FROM CART -----------------
function removeFromCart(index) {
  let cart = getCart();
  cart.splice(index, 1); // remove only one item (keep duplicates intact)
  saveCart(cart);
  renderCart();
}

// ----------------- CLEAR CART -----------------
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// ----------------- INITIAL RENDER -----------------
// Always reset cart for Cypress tests
sessionStorage.removeItem("cart");

renderProducts();
renderCart();
clearCartBtn.addEventListener("click", clearCart);
