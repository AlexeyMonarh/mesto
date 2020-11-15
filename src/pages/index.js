import './index.css';

import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Сard.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';

import { popupValid, itemTemplate, popupInputs, addElement, closeFormEdit, profileName, profileStatus, nameInput, jobInput, openFormEdit, openAddButton, submitButtonEdit, submitButtonAdd, elements, openAvatarEdit, submitButtonAvatar, editAvatar, linkInputAvatar, insertImgAvatar, buttonDeleteCard } from '../scripts/constants/constants.js';

const editValidation = new FormValidator(popupValid, popupInputs, submitButtonEdit);
const addValidation = new FormValidator(popupValid, addElement, submitButtonAdd);
const editAvatarValidation = new FormValidator(popupValid, editAvatar, submitButtonAvatar);
editValidation.enableValidation();
addValidation.enableValidation();
editAvatarValidation.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '6bae60df-6d32-40ec-9280-dea8e2f20679',
    'Content-Type': 'application/json'
  }
})

Promise.all([api.getUser(), api.getInitialCards() ])
  .then(([res, data]) => {
    itemTemplate.id = res._id;
    insertImgAvatar.src = res.avatar;
    editInfo.setUserInfo(res.name, res.about, res.avatar);
    const element = data.map(({ name, link, owner, _id, likes }) => ({ name, link, owner, _id, likes }));
    renderCard.renderItem(element);
  }).catch(() => {
    console.log(`Ошибка: ${res.status}`);
  })

const renderCard = new Section({
  renderer: (element) => {
    createCard(element);
  }
}, elements)

const createCard = (element) => {
  const item = new Card(element, itemTemplate, openImagePopup, api, deleteCardPopup, buttonDeleteCard);
  const items = item.renderCard();
  renderCard.addItem(items);
}

const editInfo = new UserInfo({
  nameUser: profileName,
  infoUser: profileStatus,
})

const deleteCardPopup = new PopupWithForm({ popupSelector: '.popup_remove-card' });
deleteCardPopup.setEventListener();

const editUserInfoPopup = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  handleFormSubmit: () => {
    api.setUserInfo(nameInput.value, jobInput.value)
      .then(thenRes);
    editInfo.setUserInfo(nameInput.value, jobInput.value);
    editUserInfoPopup.closes();
  }
})
editUserInfoPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm({
  popupSelector: '.popup_edit-avatar',
  handleFormSubmit: () => {
    api.setAvatar(linkInputAvatar.value)
      .then(thenRes);
    avatarEditPopup.closes();
    insertImgAvatar.src = linkInputAvatar.value;
  }
})
avatarEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_add-element',
  handleFormSubmit: (element) => {
    api.createNewCard(element)
      .then((newCard) => {
        createCard(newCard);
      })
    addCardPopup.closes();
  }
})
addCardPopup.setEventListeners();

const popupImageBig = new PopupWithImage('.popup_image');
popupImageBig.setEventListener();

const thenRes = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


const openImagePopup = (name, link) => {
  popupImageBig.open(name, link);
}

closeFormEdit.addEventListener('click', () => {
  editValidation.cleanPopup();
  editUserInfoPopup.closes();
})

openAddButton.addEventListener('click', () => {
  editValidation.cleanPopup();
  addValidation.submitButtonNotActive();
  addCardPopup.open();
  addCardPopup.uxButtonClear();
  addCardPopup.resetForm();
})

openFormEdit.addEventListener('click', () => {
  editValidation.submitButtonActive();
  editValidation.cleanPopup();
  editUserInfoPopup.open();
  editUserInfoPopup.uxButtonClear();
  nameInput.value = editInfo.getUserInfo().name;
  jobInput.value = editInfo.getUserInfo().info;
})

openAvatarEdit.addEventListener('click', () => {
  editValidation.cleanPopup();
  editAvatarValidation.submitButtonNotActive();
  avatarEditPopup.open();
  avatarEditPopup.uxButtonClear();
  avatarEditPopup.resetForm();
})