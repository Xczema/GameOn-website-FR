// DOM Elements MODAL
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.getElementsByClassName('close');

// ---------- DISPLAY MODAL ----------
// Déclenchement de l'event Modal
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Affichage du formulaire Modal
function launchModal() {
  modalbg.style.display = "block";
}

// Fermer le formulaire Modal
function closeModal() {
  modalbg.style.display = "none";
}
closeBtn[0].addEventListener('click', closeModal);

// ---------- DISPLAY NAV RESPONSIVE ---------- //
// Edit nav
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}