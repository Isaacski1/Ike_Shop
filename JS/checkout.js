document.addEventListener("DOMContentLoaded", function () {
  loadCartItemsForCheckout(); // Load the cart items when the page is ready
});

function loadCartItemsForCheckout() {
  let storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const checkoutTableBody = document.querySelector(".checkout-box-1 table");
  const checkoutTotal = document.querySelector(".total-amount");

  if (storedItems.length === 0) {
    checkoutTableBody.innerHTML =
      "<tr><td colspan='3' class='checkout-empty'>Your cart is empty.</td></tr>";
    checkoutTotal.textContent = "$0.00";
    return;
  }

  checkoutTableBody.innerHTML = `
    <tr>
      <th class="checkout-product-image">Pro. Image</th>
      <th class="checkout-product-price">Pro. Price</th>
      <th class="checkout-product-quantity">Pro. Qty</th>
    </tr>
  `;

  let totalAmount = 0;
  storedItems.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="checkout-img border">
        <img src="${item.product_image}" alt="Checkout Image" class="checkout-item-image" />
      </td>
      <td class="checkout-price border">${item.product_price}</td>
      <td class="checkout-qty border">1</td>
    `;

    checkoutTableBody.appendChild(row);

    const itemPrice = parseFloat(item.product_price.replace("$", ""));
    totalAmount += itemPrice;
  });

  checkoutTotal.textContent = "$" + totalAmount.toFixed(2);
}
