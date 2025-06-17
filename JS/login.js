document.querySelector(".login-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const email = document.querySelector('input[name="email"]').value.trim();
  const password = document.querySelector('input[name="password"]').value;

  // Retrieve user data from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Validate credentials
  if (user && user.email === email && user.password === password) {
    alert(`Welcome back, ${user.firstName} ${user.lastName}!`);
    window.location.href = "index.html"; // Redirect to homepage
  } else {
    alert("Invalid email or password. Please try again.");
  }
});