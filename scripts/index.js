// import  Card from './Сard.js';
import FormValidator from './FormValidator';

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



const form = document.querySelector('.popup');

const addElementModal = document.querySelector('.popup_add-element');
const editProfileModal  = document.querySelector('.popup_edit-profile');
const imageModal = document.querySelector('.popup_image');

const popupInputs = editProfileModal.querySelector('.popup__inputs');
const addElement = addElementModal.querySelector('.popup__inputs');

const editProfileSubmitButton = editProfileModal.querySelector('.popup__submit-button');
const addElementSubmitButton = addElementModal.querySelector('.popup__submit-button');

const closeFormAdd = addElementModal.querySelector('.popup__close-icon');
const closeFormEdit = editProfileModal.querySelector('.popup__close-icon');
const closeFormImage = imageModal.querySelector('.popup__close-icon');

const profileName = document.querySelector('.profile__info-name');
const profileStatus = document.querySelector('.profile__info-status');

const nameInput = popupInputs.querySelector('.popup__input-name');
const jobInput = popupInputs.querySelector('.popup__input-job');

const placeInput = addElement.querySelector('.popup__input-place');
const linkInput = addElement.querySelector('.popup__input-link');

const popupOpenImage = imageModal.querySelector('.popup__image');
const popupOpenTitle = imageModal.querySelector('.popup__title');

const openFormEdit = document.querySelector('.profile__info-edit-button');
const openAddButton = document.querySelector('.profile__add-button');

const elementsTemplate = document.querySelector('.elements__template').content.querySelector('.elements__element');
const elements = document.querySelector('.elements');

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
  if(evt.key === "Escape") {
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
  renderElement({name: placeInput.value, link: linkInput.value});
  togglePopup(addElementModal);
}

function handleLikeClick(elementsLikeButton) {
  elementsLikeButton.classList.toggle('elements__element-like_active');
}

function handleDeleteClick(elementsDeleteButton) {
  const listElement = elementsDeleteButton.closest('.elements__element');
  listElement.remove();
}

function handleImageClick(data) {
  popupOpenTitle.textContent = data.name;
  popupOpenImage.src = data.link;
  togglePopup(imageModal);
}

function renderElement(data) {
  elements.prepend(createElement(data));
}

function createElement(data) {
  const card = elementsTemplate.cloneNode(true);
  const elementsImage = card.querySelector('.elements__element-img');
  const elementsTitle = card.querySelector('.elements__element-title');
  const elementsLikeButton = card.querySelector('.elements__element-like');
  const elementsDeleteButton = card.querySelector('.elements__element-delete-button');

  elementsLikeButton.addEventListener('click', () => {
    handleLikeClick(elementsLikeButton);
  });

  elementsDeleteButton.addEventListener('click', () => {
    handleDeleteClick(elementsDeleteButton);
  });

  elementsImage.addEventListener('click', () => {
    handleImageClick(data);
  });
  
  elementsTitle.textContent = data.name;
  elementsImage.src = data.link;
  elementsImage.alt = data.name;
  return card;
}

popupInputs.addEventListener('submit', formSubmitHandler);
addElement.addEventListener('submit', addElementSubmitHandler);

openFormEdit.addEventListener('click', () => {
  SubmitButtonActive(editProfileSubmitButton);
  togglePopup(editProfileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}); 

closeFormEdit.addEventListener('click', () => {
  cleanPopup();
  togglePopup(editProfileModal);
});

openAddButton.addEventListener('click', () => {
  SubmitButtonNotActive(addElementSubmitButton);
  togglePopup(addElementModal);
  cleanPopup();
  placeInput.value = '';
  linkInput.value = '';
});

closeFormAdd.addEventListener('click', () => {
  togglePopup(addElementModal);
});

closeFormImage.addEventListener('click', () => {
  togglePopup(imageModal);
});

initialCards.forEach((data) => {
  renderElement(data);
});
