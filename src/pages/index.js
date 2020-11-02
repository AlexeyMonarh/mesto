import './index.css';

import Card from '../scripts/components/Сard.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { initialCards, popupValid, itemTemplate, addElementModal, editProfileModal, popupInputs, addElement, closeFormEdit, profileName, profileStatus, nameInput, jobInput, placeInput, linkInput, openFormEdit, openAddButton, submitButtonEdit, submitButtonAdd, elements } from '../scripts/constants/constants.js';

const editValidation = new FormValidator(popupValid, popupInputs, submitButtonEdit);
const addValidation = new FormValidator(popupValid, addElement, submitButtonAdd);
editValidation.enableValidation();
addValidation.enableValidation();

const createCard = (element) => {
  const item = new Card(element, itemTemplate, openImagePopup);
  const items = item.renderCard();
  renderCard.addItem(items);
}

const editInfo = new UserInfo({
  nameUser: profileName,
  infoUser: profileStatus
})

const editUserInfoPopup = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  handleFormSubmit: () => {
    editInfo.setUserInfo(nameInput.value, jobInput.value);
    editUserInfoPopup.close();
  }
})
editUserInfoPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_add-element',
  handleFormSubmit: (element) => {
    createCard(element);
    addCardPopup.close();
  }

})
addCardPopup.setEventListeners();

const popupImageBig = new PopupWithImage('.popup_image');
popupImageBig.setEventListeners();

const openImagePopup = (name, link) => {
  popupImageBig.open(name, link);
};

const renderCard = new Section({
  items: initialCards,
  renderer: (element) => {
    createCard(element)
  }
}, elements)
renderCard.renderItem();

closeFormEdit.addEventListener('click', () => {
  editValidation.cleanPopup();
  editUserInfoPopup.close();
})

openAddButton.addEventListener('click', () => {
  editValidation.cleanPopup();
  addValidation.submitButtonNotActive();
  addCardPopup.open();
})

openFormEdit.addEventListener('click', () => {
  editValidation.submitButtonActive();
  editValidation.cleanPopup();
  editUserInfoPopup.open();
  nameInput.value = editInfo.getUserInfo().name;
  jobInput.value = editInfo.getUserInfo().info;
})