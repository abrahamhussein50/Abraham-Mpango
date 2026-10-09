// ===== Feature 1 (compulsory): contact form validation and preview =====
const form = document.getElementById("contact-form");
const preview = document.getElementById("preview");

// Writes (or clears) the error message beside one field
function setError(id, message) {
  document.getElementById(id + "-error").textContent = message;
}

// Checks all fields; returns true only when every field is valid
function validateForm(name, email, message) {
  let valid = true;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  setError("name", ""); setError("email", ""); setError("message", "");
  if (name.trim() === "") { setError("name", "Enter your name; spaces alone are not accepted."); valid = false; }
  if (!emailPattern.test(email.trim())) { setError("email", "Enter an email like name@example.com."); valid = false; }
  if (message.trim() === "") { setError("message", "Enter a message; spaces alone are not accepted."); valid = false; }
  return valid;
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // keep everything local, nothing is sent
  const name = form.elements.name.value;
  const email = form.elements.email.value;
  const message = form.elements.message.value;
  preview.textContent = "";
  if (!validateForm(name, email, message)) return;

  const box = document.createElement("div");
  box.className = "summary";
  const title = document.createElement("h3");
  title.textContent = "Form data validated (not sent)";
  box.appendChild(title);
  [["Name", name.trim()], ["Email", email.trim()], ["Message", message.trim()]].forEach(function (pair) {
    const p = document.createElement("p");
    p.textContent = pair[0] + ": " + pair[1]; // textContent keeps user input safe
    box.appendChild(p);
  });
  preview.appendChild(box);
});

// ===== Feature 2: expandable project details =====
// Shows or hides one project's details and updates its button state
document.querySelectorAll(".toggle").forEach(function (button) {
  button.addEventListener("click", function () {
    const details = document.getElementById(button.getAttribute("aria-controls"));
    const open = button.getAttribute("aria-expanded") === "true";
    details.hidden = open;
    button.setAttribute("aria-expanded", String(!open));
    button.textContent = open ? "Show details" : "Hide details";
  });
});

// ===== Feature 3: gallery viewer with Previous and Next =====
const photos = [
  { src: "images/photo1.jpg", alt: "TODO: describe photo 1", caption: "TODO: caption 1" },
  { src: "images/photo2.jpg", alt: "TODO: describe photo 2", caption: "TODO: caption 2" },
  { src: "images/photo3.jpg", alt: "TODO: describe photo 3", caption: "TODO: caption 3" }
];
let current = 0;
const img = document.getElementById("gallery-img");
const caption = document.getElementById("gallery-caption");
const count = document.getElementById("gallery-count");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

// Displays the photo at the current index and disables buttons at either end
function showPhoto() {
  img.src = photos[current].src;
  img.alt = photos[current].alt;
  caption.textContent = photos[current].caption;
  count.textContent = "Photo " + (current + 1) + " of " + photos.length;
  prev.disabled = current === 0;
  next.disabled = current === photos.length - 1;
}
prev.addEventListener("click", function () { if (current > 0) { current--; showPhoto(); } });
next.addEventListener("click", function () { if (current < photos.length - 1) { current++; showPhoto(); } });
showPhoto();

// ===== Feature 4: light and dark theme switch =====
const themeButton = document.getElementById("theme-toggle");

// Applies a theme, updates the button label and remembers the choice
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeButton.textContent = theme === "dark" ? "Light theme" : "Dark theme";
  themeButton.setAttribute("aria-pressed", String(theme === "dark"));
  try { localStorage.setItem("theme", theme); } catch (e) { /* storage unavailable */ }
}
themeButton.addEventListener("click", function () {
  applyTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
});
let saved = "light";
try { saved = localStorage.getItem("theme") || "light"; } catch (e) { /* ignore */ }
applyTheme(saved);