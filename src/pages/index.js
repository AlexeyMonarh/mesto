import './index.css';

import Card from '../scripts/components/Сard.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Popup from '../scripts/components/Popup.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { initialCards, popupValid, itemTemplate, addElementModal, editProfileModal, popupInputs, addElement, closeFormEdit, profileName, profileStatus, nameInput, jobInput, placeInput, linkInput, openFormEdit, openAddButton, submitButtonEdit, submitButtonAdd, elements } from '../scripts/constants/constants.js';

const editValidation = new FormValidator(popupValid, popupInputs, submitButtonEdit);
const addValidation = new FormValidator(popupValid, addElement, submitButtonAdd);
editValidation.enableValidation();
addValidation.enableValidation();

const editInfo = new UserInfo({
  nameUser: profileName,
  infoUser: profileStatus
});

function formSubmitHandler(evt) {
  evt.preventDefault();
  editInfo.setUserInfo(nameInput.value, jobInput.value);
  popups.close(editProfileModal);
}
popupInputs.addEventListener('submit', formSubmitHandler)

openFormEdit.addEventListener('click', () => {
  editValidation.submitButtonActive();
  editValidation.cleanPopup();
  popups.open(editProfileModal);
  nameInput.value = editInfo.getUserInfo().name;
  jobInput.value = editInfo.getUserInfo().info;
})

const addPopupForm = new PopupWithForm({
  popupSelector: '.popup_add-element',
  handleFormSubmit: (element) => {
    const card = new Card(element, itemTemplate, openImagePopup);
    const cardElement = card.renderCard();
    elements.prepend(cardElement);
    addPopupForm.close();
  }
})
addPopupForm.setEventListeners();

const popups = new Popup('.popup');
popups.setEventListeners();

const openImagePopup = (name, link) => {
  const popupImageBig = new PopupWithImage('.popup_image');
  popupImageBig.open(name, link);
  popupImageBig.setEventListeners();
};

const addCard = new Section({
  items: initialCards,
  renderer: (element) => {
    const item = new Card(element, itemTemplate, openImagePopup);
    const items = item.renderCard();
    addCard.addItem(items);
  }
}, elements)
addCard.renderItem();

closeFormEdit.addEventListener('click', () => {
  editValidation.cleanPopup();
  popups.close(editProfileModal);
  popups.setEventListeners(editProfileModal);
})

openAddButton.addEventListener('click', () => {
  editValidation.cleanPopup();
  addValidation.submitButtonNotActive();
  addPopupForm.open(addElementModal);
  placeInput.value = '';
  linkInput.value = '';
})
