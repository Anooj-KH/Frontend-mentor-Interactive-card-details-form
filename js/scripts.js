//TARJETA INTERACTIVA | DANIEL JIMÉNEZ

const nameInCardElement = document.getElementById("nameCard");
const monthInCardElement = document.getElementById("monthCard");
const yearInCardElement = document.getElementById("yearCard");
const cardNumberInCardElement = document.getElementById("numberCard");
const cvcInCardElement = document.getElementById("cvcCard");

const nameInputElement = document.getElementById("name");
const monthInputElement = document.getElementById("monthDate");
const yearInputElement = document.getElementById("yearDate");
const cardNumberInputElement = document.getElementById("cardNumber");
const cvcInputElement = document.getElementById("cvc");

const nameDefault = new String(nameInCardElement.textContent);
const monthDefault = new String(monthInCardElement.textContent);
const yearDefault = new String(yearInCardElement.textContent);
const cardNumberDefault = new String(cardNumberInCardElement.textContent);
const cvcDefault = new String(cvcInCardElement.textContent);

nameInputElement.addEventListener("input", e => {
  e.target.value === "" ? (nameInCardElement.textContent = nameDefault.toString()) : (nameInCardElement.textContent = e.target.value.toUpperCase());
});
monthInputElement.addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g, "");
  e.target.value === "" ? (monthInCardElement.textContent = monthDefault.toString()) : (monthInCardElement.textContent = e.target.value);
  if (e.target.value > 12) {
    monthInCardElement.textContent = "12";
    e.target.value = "12";
  }
});
yearInputElement.addEventListener("input", e => {
  e.target.value = e.target.value.replace(/\D/g, "");
  e.target.value === "" ? (yearInCardElement.textContent = yearDefault.toString()) : (yearInCardElement.textContent = e.target.value);
});
cvcInputElement.addEventListener("input", e => {
  e.target.value === "" ? (cvcInCardElement.textContent = cvcDefault.toString()) : (cvcInCardElement.textContent = e.target.value);
});
cardNumberInputElement.addEventListener("input", e => {
  const cardNumber = e.target.value;
  if (cardNumberInputElement.value.length > 19) return;
  if (cardNumber === "") {
    cardNumberInCardElement.textContent = cardNumberDefault.toString();
    return;
  }
  const removeSpaces = cardNumber.replaceAll(/\s/g, "");
  const separateNumbers = removeSpaces.match(/.{1,4}/g).join(" ");
  cardNumberInputElement.value = separateNumbers;
  cardNumberInCardElement.textContent = separateNumbers;
});

//! Validación de formulario
const formElement = document.getElementById("dateForm");
const nameError = document.querySelector("#name + span.error");
const cardNumberError = document.querySelector("#cardNumber + span.error");
const monthError = document.querySelector("div + span.error");
const cvcError = document.querySelector("#cvc + span.error");
const buttonElement = document.getElementById("buttonConfirm");
const thankMessageElement = document.getElementById("thankMessage");
const thankFormElement = document.getElementById("thankForm");
const backgroundAsideElement = document.querySelector(".backgroundAside");
// nameInputElement.addEventListener("input", e => {
//   if (nameInputElement.validity.valid) {
//     nameError.innerHTML = "";
//     nameError.className = "error";
//   } else {
//     showError();
//   }
// });
formElement.addEventListener("submit", e => {
  if (!nameInputElement.validity.valid || !cardNumberInputElement.validity.valid || !monthInputElement.validity.valid || !yearInputElement.validity.valid || !cvcInputElement.validity.valid) {
    showError();
    buttonElement.className = "errorButton";
    e.preventDefault();
  } else {
    thankMessageElement.classList.replace("hidden", "show");
    e.target.classList.replace("show", "hidden");
    backgroundAsideElement.classList.toggle("grow");
    e.preventDefault();
  }
});

const setInvalid = element => (element.className = "invalid");
const addErrorClass = error => (error.className = "error active");
const removeInvalid = element => element.classList.remove("invalid");
const removeActive = error => error.classList.remove("active");
const errorBlank = error => (error.textContent = "Can´t be blank");

function showError() {
  if (nameInputElement.validity.valueMissing) {
    errorBlank(nameError);
    setInvalid(nameInputElement);
    addErrorClass(nameError);
  } else {
    removeInvalid(nameInputElement);
    removeActive(nameError);
  }
  if (cardNumberInputElement.validity.valueMissing) {
    errorBlank(cardNumberError);
    setInvalid(cardNumberInputElement);
    addErrorClass(cardNumberError);
  } else if (cardNumberInputElement.validity.patternMismatch) {
    cardNumberError.textContent = "Wrong format, numbers only";
    setInvalid(cardNumberInputElement);
    addErrorClass(cardNumberError);
  } else if (cardNumberInputElement.value.length < 19) {
    // else if (cardNumberInputElement.validity.tooShort) {
    cardNumberError.textContent = "Number is too short";
    setInvalid(cardNumberInputElement);
    addErrorClass(cardNumberError);
  } else {
    removeInvalid(cardNumberInputElement);
    removeActive(cardNumberError);
  }
  if (monthInputElement.validity.valueMissing || yearInputElement.validity.valueMissing) {
    errorBlank(monthError);
    addErrorClass(monthError);
    if (monthInputElement.validity.valueMissing && yearInputElement.validity.valueMissing) {
      setInvalid(monthInputElement);
      setInvalid(yearInputElement);
    } else if (yearInputElement.validity.valueMissing) {
      setInvalid(yearInputElement);
      removeInvalid(monthInputElement);
    } else {
      setInvalid(monthInputElement);
      removeInvalid(yearInputElement);
    }
  } else {
    removeInvalid(monthInputElement);
    removeInvalid(yearInputElement);
    removeActive(monthError);
  }
  if (cvcInputElement.validity.valueMissing) {
    errorBlank(cvcError);
    setInvalid(cvcInputElement);
    addErrorClass(cvcError);
  } else {
    removeInvalid(cvcInputElement);
    removeActive(cvcError);
  }
}

backgroundAsideElement.addEventListener("animationend", e => {
  e.target.classList.remove("grow");
});

thankFormElement.addEventListener("submit", e => {
  thankMessageElement.classList.replace("show", "hidden");
  formElement.classList.replace("hidden", "show");
  backgroundAsideElement.classList.toggle("grow");
  e.preventDefault();
  nameInputElement.value = "";
  cardNumberInputElement.value = "";
  monthInputElement.value = "";
  yearInputElement.value = "";
  cvcInputElement.value = "";
  removeInvalid(nameInputElement);
  removeActive(nameError);
  removeInvalid(cardNumberInputElement);
  removeActive(cardNumberError);
  removeInvalid(monthInputElement);
  removeInvalid(yearInputElement);
  removeActive(monthError);
  removeInvalid(cvcInputElement);
  removeActive(cvcError);
});

buttonElement.addEventListener("animationend", e => {
  e.target.classList.remove("errorButton");
});
