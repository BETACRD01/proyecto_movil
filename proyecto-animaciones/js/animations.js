// scripts.js
document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const cart = [];
  const cartDisplay = document.createElement("div");

  cartDisplay.id = "cart-display";
  document.body.appendChild(cartDisplay);

  fetch("data/products.json")
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <p><strong>${product.price} USD</strong></p>
          <button class="btn add-to-cart">Agregar al Carrito</button>
        `;

        productCard.querySelector(".add-to-cart").addEventListener("click", () => {
          cart.push(product);
          updateCartDisplay();
        });

        productGrid.appendChild(productCard);
      });
    });

  const updateCartDisplay = () => {
    cartDisplay.innerHTML = `
      <h2>Carrito</h2>
      <ul>
        ${cart
          .map(
            (item, index) =>
              `<li>${item.name} - $${item.price} <button data-index="${index}">Eliminar</button></li>`
          )
          .join("")}
      </ul>
      <p>Total: $${cart.reduce((total, item) => total + item.price, 0)}</p>
    `;

    cartDisplay.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        updateCartDisplay();
      });
    });
  };
});
