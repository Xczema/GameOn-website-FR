// Récupération des éléments du DOM
const firstName = document.getElementById('first');
const lastName = document.getElementById('last');
const email = document.getElementById('email');
const quantity = document.getElementById('quantity');
const birthdate = document.getElementById('birthdate');
const allLocations = document.getElementById('allLocations');
const locations = document.querySelectorAll('#allLocations .checkbox-input');
const checkbox1 = document.getElementById('checkbox1');
const input = document.getElementsByClassName('text-control');
const form = document.getElementById('form');
const regex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/;

// ------ VALIDATION DES CHAMPS DU FORMULAIRE ------ //
// Verification Prénom
function checkFirstName() {
    if (firstName.value.trim().length < 2 || first.value.trim() === '' || !firstName.value.match(regex)) {
        firstName.parentElement.setAttribute('data-error-visible', 'true');
        firstName.style.border = '2px solid #e54858';
        return false;
    }
    first.parentElement.setAttribute('data-error-visible', 'false');
    first.style.border = 'solid #279e7a 0.19rem';
    return true;
}

// Verification Nom de famille
function checkLastName() {
    if (lastName.value.trim().length < 2 || last.value.trim() === "" || !lastName.value.match(regex)) {
        lastName.parentElement.setAttribute('data-error-visible', 'true');
        lastName.style.border = '2px solid #e54858';
        return false;
    }
    last.parentElement.setAttribute('data-error-visible', 'false');
    last.style.border = 'solid #279e7a 0.19rem';
    return true;
}

// Verification Adresse Email
function checkEmail() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.value.trim().match(re)) {
        email.parentElement.setAttribute('data-error-visible', 'false');
        email.style.border = 'solid #279e7a 0.19rem';
        return true;
    }
    email.parentElement.setAttribute('data-error-visible', 'true');
    email.style.border = '2px solid #e54858';
    return false;
}

// Vérification Date de naissance
function checkBirthdate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let array = birthdate.value.split('-');
    if(array[0] <= yyyy // Année (YYYY)
        && array[1] <= 12 && array[1] > 0 // Mois (MM)
        && array[2] <= 31) // Jours (DD)
        { 
            if(array[0] == yyyy && array[1] >= mm && array[2] >= dd) { // Check supp : Cas spécial pour les années en cours (MM et DD)
                birthdate.parentElement.setAttribute('data-error-visible', 'true');
                birthdate.style.border = '2px solid #e54858';
                return false;
            }
        birthdate.parentElement.setAttribute('data-error-visible', 'false');
        birthdate.style.border = 'solid #279e7a 0.19rem';
        return true;
        } else {
            birthdate.parentElement.setAttribute('data-error-visible', 'true');
            birthdate.style.border = '2px solid #e54858';
            return false;
        }
}

// Vérification du nombre de participation à un tournoi GameOn
function checkTournamentsQuantity() {
    if (quantity.value.trim().length === 0 || isNaN(quantity.value.trim()) === true || quantity.value.trim() < 0) {
        quantity.parentElement.setAttribute('data-error-visible', 'true');
        quantity.style.border = '2px solid #e54858';
        return false;
    }
    quantity.parentElement.setAttribute('data-error-visible', 'false');
    quantity.style.border = 'solid #279e7a 0.19rem';
    return true;
}

// Vérification du champ de la ville dans laquelle le joueur a participé à un tournoi
function checkLocations() {
    allLocations.setAttribute('data-error-visible', 'true');
    for (let i = 0; i < locations.length; i++) {
        if (locations[i].checked) {
            allLocations.setAttribute('data-error-visible', 'false');
            return true;
        }
    }
    return false;
}

// Vérifications que la checkbox des Conditions générales d'utilisation a bien été cochée
function checkCheckBox() {
    if (checkbox1.checked === false) {
        checkbox1.parentElement.setAttribute('data-error-visible', 'true');
        return false;
    }
    checkbox1.parentElement.setAttribute('data-error-visible', 'false');
    return true;
}

// Paramétrage de l'event qui delenche la function de validation de chaque champ du formulaire.
// Note: L'évènement focusout est déclenché lorsqu'un élément du DOM est sur le point de perdre le focus. La différence principale entre cet évènement et blur (en-US) est que ce dernier ne se propage pas.
function formFieldsValidation(element, method, event) {
    element.addEventListener(event, method);
}
formFieldsValidation(firstName, checkFirstName, 'focusout');
formFieldsValidation(lastName, checkLastName, 'focusout');
formFieldsValidation(email, checkEmail, 'focusout');
formFieldsValidation(birthdate, checkBirthdate, 'focusout');
formFieldsValidation(quantity, checkTournamentsQuantity, 'focusout');
formFieldsValidation(allLocations, checkLocations, 'change');
formFieldsValidation(checkbox1, checkCheckBox, 'change');

// 1 fonction pour toutes les regrouper et check en 1x fois tous les champs
function forAllFieldsValidation() {
    checkFirstName()
    checkLastName()
    checkEmail()
    checkBirthdate()
    checkTournamentsQuantity()
    checkLocations()
    checkCheckBox()
}

// 1 function pour s'assurer que le formulaire est valide avant envoi (chaque champ est OK).
function formValidation() {
    if (checkFirstName() === true &&
        checkLastName() === true &&
        checkEmail() === true &&
        checkBirthdate() === true &&
        checkTournamentsQuantity() === true &&
        checkLocations() === true &&
        checkCheckBox() === true) {
        return true;
    }
    return false;
}

// Envoi du formulaire
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (formValidation() == true) {
        displayModalSubmit(); // Affiche le message de confirmation de la soumission réussie
        document.querySelector('form').reset();
    } else {
        forAllFieldsValidation();
    }
});