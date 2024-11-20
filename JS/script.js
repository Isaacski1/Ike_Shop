$("document").ready(function () {
  $(".hero-carousel").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: true,
    dotData: true,
    nav: true,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  });
});

$("document").ready(function () {
  $(".brand-carousel").owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    dots: false,
    dotData: true,
    nav: false,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 5,
      },
    },
  });
});

// ----------------------- Navigation Bar Sticky Start ----------------------
window.addEventListener("scroll", function () {
  const second_navbar = document.querySelector(".second-nav_menu");
  second_navbar.classList.toggle("sticky", window.scrollY > 300);
});
// ----------------------- Navigation Bar Sticky End ----------------------

// ---------------- Offer Date Section Start ------------------- //
const hours = document.getElementById("hrs");
const minutes = document.getElementById("min");
const seconds = document.getElementById("sec");

// Setting intervals between the time
setInterval(() => {
  let currentTime = new Date();

  hours.innerHTML =
    (currentTime.getHours() < 10 ? "0" : "") + currentTime.getHours();
  minutes.innerHTML =
    (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes();
  seconds.innerHTML =
    (currentTime.getSeconds() < 10 ? "0" : "") + currentTime.getSeconds();
}, 1000);
// ---------------- Offer Date Section End ------------------- //

// ======================= Cart Section Start ===================== //
const cart = document.querySelector(".cart");
const cart_icon = document.querySelector(".cart-icon");

cart_icon.addEventListener("click", () => {
  cart.classList.toggle("active");
});

// ---------------- Start when document is ready -------------------
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

// ----------------- Start -----------------------
function start() {
  loadCartItems(); // Load items from local storage
  addEvent();
}

// ----------------- Load Cart Items -------------------
function loadCartItems() {
  const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  itemsAdded = storedItems; // Load items into the itemsAdded array
  itemsAdded.forEach((item) => {
    const new_div = document.createElement("div");
    new_div.innerHTML = contentDocument(
      item.product_name,
      item.product_price,
      item.product_image
    );
    const cart_content = document.querySelector(".cart-content");
    cart_content.appendChild(new_div);
  });
  update(); // Update the cart UI
}

// ----------------- Update Rendering -------------------
function update() {
  addEvent();
  updateTotal();
  updateQuantity();
}

// ---------------- Update Quantity -------------------
function updateQuantity() {
  const quantitySpan = document.querySelector(".quantity");
  let totalItems = 0;

  // Calculate total items in the cart
  itemsAdded.forEach((item) => {
    totalItems += 1; // Each item is counted as 1 for simplicity
  });

  // Update the quantity in the nav menu
  quantitySpan.textContent = totalItems;
}

// ---------------- Add Event ------------------
function addEvent() {
  const remove_cart = document.querySelectorAll(".remove-cart");
  remove_cart.forEach((remove_cart_item) => {
    remove_cart_item.addEventListener("click", handle_remove_cart_item);
  });

  // Cart Quantity
  let cart_quantity = document.querySelectorAll(".cart-quantity");
  cart_quantity.forEach((cart_quantity_input) => {
    cart_quantity_input.addEventListener("change", handle_cart_quantity);
  });

  // Add product to your cart
  let add_cart = document.querySelectorAll(".add-cart");
  add_cart.forEach((add_cart_btn) => {
    add_cart_btn.addEventListener("click", handle_add_cart);
  });
}

// ---------------- Handler Remove Cart Item ------------------
function handle_remove_cart_item() {
  const itemName =
    this.parentElement.querySelector(".cart-item-name").innerHTML;
  itemsAdded = itemsAdded.filter((el) => el.product_name !== itemName);
  localStorage.setItem("cartItems", JSON.stringify(itemsAdded)); // Save updated cart to local storage
  this.parentElement.remove();
  update();
}

// ---------------- Handler Cart Quantity ------------------
function handle_cart_quantity() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  update();
}

// --------------- Handler Add Cart -------------------
let itemsAdded = [];
function handle_add_cart() {
  let product = this.closest(".trending-cont");
  let product_name = product.querySelector(".product-name").innerHTML;
  let product_price = product.querySelector(".product-price").innerHTML;
  let product_image = product.querySelector(".product-image").src;

  let add_cart_new = { product_name, product_price, product_image };

  // When object is already in the cart, alert message should appear
  if (itemsAdded.find((el) => el.product_name === add_cart_new.product_name)) {
    alert("This item is already in your cart!");
    return;
  } else {
    itemsAdded.push(add_cart_new);
  }

  let add_cart_content = contentDocument(
    product_name,
    product_price,
    product_image
  );
  let new_div = document.createElement("div");
  new_div.innerHTML = add_cart_content;
  let cart_content = document.querySelector(".cart-content");
  cart_content.appendChild(new_div);
  localStorage.setItem("cartItems", JSON.stringify(itemsAdded)); // Save to local storage
  update();
}

// -------------- Update Total ----------------
function updateTotal() {
  let cart_items = document.querySelectorAll(".cart-items");
  let total_price = document.querySelector(".total-price");
  let total = 0;

  cart_items.forEach((cart_item) => {
    let cart_price = cart_item.querySelector(".cart-price");
    let price = parseFloat(cart_price.innerHTML.replace("$", "")) || 0;
    let total_quantity = cart_item.querySelector(".cart-quantity").value;
    total += price * total_quantity;
  });
  total = total.toFixed(2); // The total price should be in two decimal place
  total_price.innerHTML = "$" + total;
}

// Add product to cart //
function contentDocument(product_name, product_price, product_image) {
  return `<div class="cart-items">
          <img src=${product_image} class="cart-image" />
          <div class="cart-details">
            <h2 class="cart-item-name">${product_name}</h2>
            <p class="cart-price">${product_price}</p>
            <input type="number" value="1" class="cart-quantity" />
          </div>
          <!-- Remove Cart -->
          <i class="bx bx-x remove-cart"></i>
        </div>`;
}
// ======================= Cart Section End ===================== //

// ======================= Go Top Button Start ======================//
const go_to_top = document.querySelector("[data-go-top]");
window.addEventListener("scroll", function () {
  window.scrollY >= 500
    ? go_to_top.classList.add("active")
    : go_to_top.classList.remove("active");
});

// ======================= Go Top Button End ======================//

// ======================= Validation Error Messages Start ========================== //
const fullNameError = document.getElementById("full_name-error");
const firstNameError = document.getElementById("first-name-error");
const lastNameError = document.getElementById("last-name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const passwordError = document.getElementById("password-error");
const passwordAgainError = document.getElementById("password_again-error");
const subjectError = document.getElementById("subject-error");
const messageError = document.getElementById("message-error");
const SubmitError = document.getElementById("submit-error");
const SubmitError_1 = document.getElementById("submit-error");

// ------------------ Validate First Name Message Start ----------------------
function validateFirstName() {
  let firstName = document.getElementById("contact-first_name").value;
  // ----------- Conditional Statement ----------------- //
  if (firstName.length == 0) {
    firstNameError.innerHTML = "First name is required";
    return false;
  }

  if (!firstName.match(/^[A-Za-z]*$/)) {
    firstNameError.innerHTML = '<i class="wrong bi bi-x-circle-fill"></i>';
    return false;
  }
  // ----------------- Remove Error Message -------------------
  firstNameError.innerHTML = "<i class='correct bi bi-check-circle-fill'></i>";
  return true;
}
// ------------------ Validate First Name Message End ----------------------

// ------------------ Validate First Name Message Start ----------------------
function validateLastName() {
  let lastName = document.getElementById("contact-last_name").value;
  // ----------- Conditional Statement ----------------- //
  if (lastName.length == 0) {
    lastNameError.innerHTML = "Last name is required";
    return false;
  }

  if (!lastName.match(/^[A-Za-z]*$/)) {
    lastNameError.innerHTML = '<i class="wrong bi bi-x-circle-fill"></i>';
    return false;
  }
  // ----------------- Remove Error Message -------------------
  lastNameError.innerHTML = "<i class='correct bi bi-check-circle-fill'></i>";
  return true;
}
// ------------------ Validate First Name Message End ----------------------

// ------------------ Validate Email Message Start ------------------------- //
function validateEmail() {
  let email = document.getElementById("contact-email").value;
  // ----------- Conditional Statement ----------------- //
  if (email.length == 0) {
    emailError.innerHTML = "Email id is required";
    return false;
  }

  if (!email.match(/^[A-Za-z\_\-[0-9]*[@][A-Za-z]*[\.][a-z]{3}$/)) {
    emailError.innerHTML = '<i class="wrong bi bi-x-circle-fill"></i>';
    return false;
  }
  // ------------------ Remove Error Message ----------------
  emailError.innerHTML = "<i class='correct bi bi-check-circle-fill'></i>";
  return true;
}
// ------------------ Validate Email Message End ------------------------- //

// ----------------- Validate Phone Message Start -------------------- //
function validatePhone() {
  let phone = document.getElementById("contact-phone").value;
  // --------------- Conditional Statement -----------------
  if (phone.length == 0) {
    phoneError.innerHTML = "Phone no is required";
    return false;
  }

  if (phone.length !== 10) {
    phoneError.innerHTML = '<i class="wrong bi bi-x-circle-fill"></i>';
    return false;
  }

  if (!phone.match(/^[0-9]{10}$/)) {
    phoneError.innerHTML = "Only digits";
    return false;
  }

  phoneError.innerHTML = "<i class='correct bi bi-check-circle-fill'></i>";
  return true;
}
// ----------------- Validate Phone Message End -------------------- //

// ----------------- Validate Password Message Start --------------- //
function validatePassword() {
  let password = document.getElementById("contact-password").value;
  document
    .getElementById("contact-password")
    .addEventListener("input", validatePassword);
  let repeatPassword = document.getElementById("contact-repeat-password").value;
  document
    .getElementById("contact-repeat-password")
    .addEventListener("input", validatePassword);

  // Clear previous error messages
  passwordError.innerHTML = "";
  passwordAgainError.innerHTML = "";

  // ----------------- Conditional Statements ---------------------
  if (password.length === 0) {
    passwordError.innerHTML = "Password is required";
    return false;
  }

  if (password.length < 6) {
    passwordError.innerHTML = "Password is too short";
    return false;
  }
  // --------------- If everything is valid --------------
  passwordError.innerHTML = "<i class='correct bi bi-check-circle-fill'></i>";

  // Checks if repeat password matches the original password
  if (password !== repeatPassword) {
    passwordAgainError.innerHTML = "Passwords do not match";
    return false;
  }

  // If everything is valid
  passwordAgainError.innerHTML =
    "<i class='correct bi bi-check-circle-fill'></i>";
  return true;
}
// ----------------- Validate Password Message End --------------- //

// ----------------- Validate Full Name Message Start ---------------- //
function validateName() {
  const fullName = document.getElementById("contact-fullName").value;

  // ---------- Conditional Statement --------------
  if (fullName.length == 0) {
    fullNameError.innerHTML = "name is required";
    return false;
  }

  if (!fullName.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    fullNameError.innerHTML = '<i class="wrong bi bi-x-circle-fill"></i>';
    return false;
  }

  fullNameError.innerHTML = "<i class='correct bi bi-check-circle-fill'></i>";
  return true;
}
// ----------------- Validate Full Name Message End ------------------ //

// ----------------- Validate Subject Messgae Start ----------------- //
function validateSubject() {
  const subject = document.getElementById("contact-subject").value;

  // ------------- Conditional Statement --------------//
  if (subject.length == 0) {
    subjectError.innerHTML = "subject is required";
    return false;
  }

  subjectError.innerHTML = "<i class='correct bi bi-check-circle-fill'></i>";
  return true;
}
// ----------------- Validate Subject Messgae End ------------------ //

// ----------------- Validate Messgae Start --------------- //
function validateMessage() {
  const message = document.getElementById("contact-message").value;
  const required = 30;
  const remaining = required - message.length;

  // ----------- Conditional Statement ---------------
  if (message.length == 0) {
    messageError.innerHTML = "review is required";
    return false;
  }

  if (remaining > 0) {
    messageError.innerHTML = remaining + " more character(s) required";
    return false;
  }

  messageError.innerHTML = "<i class='correct bi bi-check-circle-fill'></i>";
  return true;
}
// ----------------- Validate Messgae End --------------- //

// ----------------- Validate Submit Message Start ----------------- //
function validateSubmit() {
  // Conditional Statement
  if (
    !validateFirstName() ||
    !validateLastName() ||
    !validateEmail() ||
    !validatePhone() ||
    !validatePassword()
  ) {
    SubmitError.style.display = "block";
    SubmitError.innerHTML = "Please fix all error(s)";
    setTimeout(function () {
      SubmitError.style.display = "none";
    }, 3000);
    return false;
  }
}
// ----------------- Validate Submit Message End ----------------- //

// ----------------- Validate Submit Message Start ----------------- //
function validateSubmit_1() {
  // Conditional Statement
  if (
    !validateName() ||
    !validateEmail() ||
    !validateSubject() ||
    !validateMessage()
  ) {
    SubmitError_1.style.display = "block";
    SubmitError_1.innerHTML = "Please fix all error(s)";
    setTimeout(function () {
      SubmitError_1.style.display = "none";
    }, 3000);
    return false;
  }
}
// ----------------- Validate Submit Message End ----------------- //

// ======================= Validation Error Messages End ========================== //

// ======================= Price Range Section Section Start ======================= //
// const priceRange = document.getElementById("price-range");
// const minPrice = document.getElementById("min-price");
// const maxPrice = document.getElementById("max-price");
// const priceRangeFill = document.getElementById("price-range-fill");

// priceRange.addEventListener("input", () => {
//   const value = priceRange.value;
//   const min = priceRange.min;
//   const max = priceRange.max;

//   priceRangeFill.style.width = ((value - min) / (max - min)) * 100 + "%";
//   minPrice.innerHTML = `$${value}`;
// });

// Filter by price
// const priceCheckBoxes = document.querySelectorAll(".checkbox[type='radio']");

// priceCheckBoxes.forEach((checkbox) => {
//   checkbox.addEventListener("change", (e) => {
//     const priceRange = e.target.value.split("-");
//     const minPrice = parseInt(priceRange[0]);
//     const maxPrice = parseInt(priceRange[1]);
//     console.log(minPrice, maxPrice);
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const priceCheckBoxes = document.querySelectorAll(".checkbox[type='radio']");

//   priceCheckBoxes.forEach((checkbox) => {
//     checkbox.addEventListener("change", (e) => {
//       const priceRange = e.target.value.split("-");
//       const minPrice = parseInt(priceRange[0]);
//       const maxPrice = parseInt(priceRange[1]);
//       console.log(minPrice, maxPrice);
//     });
//   });
// });

// ======================= Price Range Section Section Start ======================= //
const priceRange = document.getElementById("price-range");
const minPriceDisplay = document.getElementById("min-price");
const maxPriceDisplay = document.getElementById("max-price");
const priceRangeFill = document.getElementById("price-range-fill");

// Event listener for the price range slider
priceRange.addEventListener("input", () => {
  const value = priceRange.value;
  const min = priceRange.min;
  const max = priceRange.max;

  priceRangeFill.style.width = ((value - min) / (max - min)) * 100 + "%";
  minPriceDisplay.innerHTML = `$${value}`;
});

// Filter by price
const priceCheckBoxes = document.querySelectorAll(".checkbox[type='radio']");

priceCheckBoxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (e) => {
    const priceRangeValues = e.target.value.split("-");
    const minPrice = parseInt(priceRangeValues[0]);
    const maxPrice = parseInt(priceRangeValues[1]);

    // Update the price range slider to the selected minimum price
    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = minPrice; // Set the slider to the minimum price

    // Update the displayed prices
    minPriceDisplay.innerHTML = `$${minPrice}`;
    maxPriceDisplay.innerHTML = `$${maxPrice}`;

    // Update the fill of the price range slider
    priceRangeFill.style.width =
      ((priceRange.value - priceRange.min) /
        (priceRange.max - priceRange.min)) *
        100 +
      "%";
  });
});

// ======================= Price Range Section Section End ======================= //

// ======================= Image Gallery Section Start ======================== //
function changeImage(imageSrc) {
  const bigImage = document.getElementById("big-image");
  bigImage.src = imageSrc;
}
// ======================= Image Gallery Section End ======================== //
