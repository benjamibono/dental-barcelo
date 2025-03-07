document.addEventListener("DOMContentLoaded", function () {
  const cookieConsent = document.getElementById("cookie-consent");
  const acceptButton = document.getElementById("accept-cookies");

  // Verificar si ya se aceptaron las cookies
  if (!localStorage.getItem("cookiesAccepted")) {
    cookieConsent.classList.remove("hidden");
  }

  // Manejar la aceptación de cookies
  acceptButton.addEventListener("click", function () {
    localStorage.setItem("cookiesAccepted", "true");
    cookieConsent.classList.add("hidden");
  });
});
