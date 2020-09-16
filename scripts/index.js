import Card from '../scripts/Сard.js';
import FormValidator from '../scripts/FormValidator.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const addElementModal = document.querySelector('.popup_add-element');
const editProfileModal = document.querySelector('.popup_edit-profile');
const imageModal = document.querySelector('.popup_image');

const popupInputs = editProfileModal.querySelector('.popup__inputs');
const addElement = addElementModal.querySelector('.popup__inputs');

const closeFormAdd = addElementModal.querySelector('.popup__close-icon');
const closeFormEdit = editProfileModal.querySelector('.popup__close-icon');
const closeFormImage = imageModal.querySelector('.popup__close-icon');

const profileName = document.querySelector('.profile__info-name');
const profileStatus = document.querySelector('.profile__info-status');

const nameInput = popupInputs.querySelector('.popup__input-name');
const jobInput = popupInputs.querySelector('.popup__input-job');

const placeInput = addElement.querySelector('.popup__input-place');
const linkInput = addElement.querySelector('.popup__input-link');

const openFormEdit = document.querySelector('.profile__info-edit-button');
const openAddButton = document.querySelector('.profile__add-button');

const elements = document.querySelector('.elements');

const editProfileSubmitButton = editProfileModal.querySelector('.popup__submit-button');
const addElementSubmitButton = addElementModal.querySelector('.popup__submit-button');

initialCards.forEach(element => {
  const item = new Card(element);
  elements.append(item.renderCard());
})

const popupValid = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input',
  inputInvalidClass: 'popup__input-invalid',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  errorClass: 'popup__error',
  errorClassActive: 'popup__error_active'
};

const editValidation = new FormValidator(popupValid, popupInputs);
const addValidation = new FormValidator(popupValid, addElement);

editValidation.enableValidation();
addValidation.enableValidation();

const closeOverlay = () => {
  const overlay = document.querySelectorAll('.popup__overlay');
  overlay.forEach((form) => {
    form.addEventListener('click', (evt) => {
      togglePopup(evt.target.parentElement);
    });
  });
}
closeOverlay();

function formEsc(evt) {
  if (evt.key === "Escape") {
    togglePopup(document.querySelector('.popup_open'));
  }
}

function togglePopup(form) {
  form.classList.toggle('popup_open');
  if (form.classList.contains('popup_open')) {
    addEventListener('keydown', formEsc);
  } else {
    removeEventListener('keydown', formEsc);
  }
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;
  togglePopup(editProfileModal);
}

function addElementSubmitHandler(evt) {
  evt.preventDefault();
  const item = new Card(evt);
  item._name = placeInput.value;
  item._link = linkInput.value;
  elements.append(item.renderCard());
  togglePopup(addElementModal);
}

popupInputs.addEventListener('submit', formSubmitHandler);
addElement.addEventListener('submit', addElementSubmitHandler);

function cleanPopup() {
  const popupError = document.querySelectorAll('.popup__error');
  popupError.forEach((error) => {
    error.classList.remove('popup__error_active');
    error.classList.remove('popup__input-invalid');
  });
  const inputError = document.querySelectorAll('.popup__input');
  inputError.forEach((error) => {
    error.classList.remove('popup__input-invalid');
  });
}

openFormEdit.addEventListener('click', () => {
  submitButtonActive(editProfileSubmitButton);
  togglePopup(editProfileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
})

closeFormEdit.addEventListener('click', () => {
  cleanPopup();
  togglePopup(editProfileModal);
})

openAddButton.addEventListener('click', () => {
  submitButtonNotActive(addElementSubmitButton);
  togglePopup(addElementModal);
  cleanPopup();
  placeInput.value = '';
  linkInput.value = '';
})

closeFormAdd.addEventListener('click', () => {
  togglePopup(addElementModal);
  cleanPopup();
})

closeFormImage.addEventListener('click', () => {
  togglePopup(imageModal);
})

function submitButtonActive(btn) {
  btn.removeAttribute('disabled');
  btn.classList.remove('popup__submit-button_disabled');
}

function submitButtonNotActive(btn) {
  btn.setAttribute('disabled', true);
  btn.classList.add('popup__submit-button_disabled');
}