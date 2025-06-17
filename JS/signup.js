document.getElementById("signup-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const firstName = document.getElementById("contact-first_name").value.trim();
  const lastName = document.getElementById("contact-last_name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const phone = document.getElementById("contact-phone").value.trim();
  const password = document.getElementById("contact-password").value;
  const repeatPassword = document.getElementById("contact-repeat-password").value;

  // Validate form fields
  if (!firstName || !lastName || !email || !phone || !password || !repeatPassword) {
    alert("Please fill out all fields.");
    return;
  }

  if (password !== repeatPassword) {
    alert("Passwords do not match.");
    return;
  }

  // Save user data to localStorage
  const user = {
    firstName,
    lastName,
    email,
    phone,
    password,
  };

  localStorage.setItem("user", JSON.stringify(user));

  alert("Sign up successful!");
  window.location.href = "login.html"; // Redirect to login page
});