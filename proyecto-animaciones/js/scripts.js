document.addEventListener("DOMContentLoaded", () => {
  const cart = [];
  const cartDisplay = document.createElement("div");

  // Establecemos un contenedor para el carrito dentro de un área específica
  cartDisplay.id = "cart-display";
  document.querySelector('footer').insertAdjacentElement('beforebegin', cartDisplay); // Añadimos antes del footer

  const updateCartDisplay = () => {
    // Actualizamos el carrito en pantalla
    cartDisplay.innerHTML = `
      <h2>Carrito</h2>
      <ul>
        ${cart
          .map(
            (item, index) =>
              `<li>${item.name} - $${item.price.toFixed(2)} <button data-index="${index}">Eliminar</button></li>`
          )
          .join("")}
      </ul>
      <p><strong>Total: $${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</strong></p>
      <button id="checkout-btn">Pagar</button>
    `;

    // Event listener para los botones de eliminación
    cartDisplay.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        cart.splice(index, 1);
        updateCartDisplay();
      });
    });

    // Evento para el botón de pagar
    const checkoutButton = document.getElementById("checkout-btn");
    checkoutButton?.addEventListener("click", () => {
      alert("Gracias por tu compra. ¡Pronto recibirás un correo!");
      cart.length = 0; // Limpiar carrito
      updateCartDisplay();
    });
  };

  // Evento para agregar productos al carrito
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productCard = e.target.closest(".product-card");
      const product = {
        name: productCard.querySelector("h3").textContent,
        price: parseFloat(
          productCard.querySelector("p strong").textContent.replace("$", "")
        ),
      };
      cart.push(product);
      updateCartDisplay();
    });
  });
});
