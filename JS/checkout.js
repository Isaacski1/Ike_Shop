// Function to load cart items into the checkout page
// Function to load cart items into the checkout page
function loadCartItemsForCheckout() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  let totalPrice = 0;

  // Clear the cart items container
  cartItemsContainer.innerHTML = "";

  // Loop through the cart items and display them
  cartItems.forEach((item) => {
    const quantity = item.product_quantity || 1; // Default to 1 if undefined
    const price = parseFloat(item.product_price.replace("GHS", "").trim()) || 0; // Remove "GHS" and parse as a number
    const subtotal = price * quantity;
    totalPrice += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.product_image}" alt="${item.product_name}" style="width: 50px; height: 50px;"></td>
      <td>${item.product_name}</td>
      <td>GHS ${price.toFixed(2)}</td>
      <td>${quantity}</td>
      <td>GHS ${subtotal.toFixed(2)}</td>
    `;
    cartItemsContainer.appendChild(row);
  });

  // Update the total price
  totalPriceElement.textContent = `GHS ${totalPrice.toFixed(2)}`;
}

// Call the function when the page loads
document.addEventListener("DOMContentLoaded", loadCartItemsForCheckout);

// Function to handle the "Place Order" button
function placeOrder() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add items to the cart before placing an order.");
    return;
  }

  // Simulate order placement
  alert("Order placed successfully!");

  // Clear the cart
  localStorage.removeItem("cartItems");

  // Redirect to a success page or reload the checkout page
  window.location.href = "index.html"; // Replace with your success page
}

// Attach the function to the "Place Order" button
document.getElementById('place-order').addEventListener('click', (event) => {
  // Prevent the default button action
  event.preventDefault();

  // Get the form element
  const form = document.querySelector('form');

  // Check if the form exists
  if (!form) {
    alert('Form not found. Please check your HTML structure.');
    return;
  }

  // Check if the form is valid
  if (!form.checkValidity()) {
    alert('Please fill out the address form.');
    form.reportValidity(); // Highlight the invalid fields
    return;
  }

  // Get the total price and email
  const email = document.querySelector('input[name="email"]').value;
  const amount = parseFloat(document.getElementById('total-price').textContent.replace("GHS", "").trim()) * 100;

  // Proceed with Paystack payment if the form is valid
  const handler = PaystackPop.setup({
    key: 'pk_test_daec5eba6470db795511d6c5b8b29469f938ea34', // Replace with your Paystack public key
    email: email, // Use the email from the form
    amount: amount, // Amount in kobo (multiply by 100)
    currency: 'GHS', // Replace with your preferred currency
    ref: 'PS_' + Math.floor(Math.random() * 1000000000 + 1), // Generate a unique reference
    callback: function (response) {
      // Payment successful
      alert('Payment successful! Transaction reference: ' + response.reference);
      localStorage.removeItem('cartItems'); // Clear the cart
      window.location.href = 'index.html'; // Redirect to the homepage
    },
    onClose: function () {
      // Payment canceled
      alert('Payment canceled.');
    },
  });

  handler.openIframe(); // Open the Paystack payment modal
});