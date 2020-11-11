import './index.css';

import Card from '../scripts/components/Сard.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

import { popupValid, itemTemplate, popupInputs, addElement, closeFormEdit, profileName, profileStatus, nameInput, jobInput, openFormEdit, openAddButton, submitButtonEdit, submitButtonAdd, elements, openAvatarEdit, submitButtonAvatar, editAvatar, linkInputAvatar, insertImgAvatar } from '../scripts/constants/constants.js';

const editValidation = new FormValidator(popupValid, popupInputs, submitButtonEdit);
const addValidation = new FormValidator(popupValid, addElement, submitButtonAdd);
const editAvatarValidation = new FormValidator(popupValid, editAvatar, submitButtonAvatar);
editValidation.enableValidation();
addValidation.enableValidation();
editAvatarValidation.enableValidation();



const createCard = (element) => {
  const item = new Card(element, itemTemplate, openImagePopup);
  const items = item.renderCard();
  renderCard.addItem(items);
  openDeletePopup();
  item.likeCard();
  // buttonDeleteCard.addEventListener('click', ()=>{item.removeCard()})
}

// const popupDeleteCard = document.querySelector('.popup_remove-card')
// const buttonDeleteCard = popupDeleteCard.querySelector('.popup__submit-button');

const editUserInfoPopup = new PopupWithForm({
  popupSelector: '.popup_edit-profile',
  handleFormSubmit: () => {
    api.setUserInfo(nameInput.value, jobInput.value);
    editInfo.setUserInfo(nameInput.value, jobInput.value);
    editUserInfoPopup.close();
  }
})
editUserInfoPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm({
  popupSelector: '.popup_edit-avatar',
  handleFormSubmit: () => {
    api.setAvatar(linkInputAvatar.value);
    avatarEditPopup.close();
  }
})
avatarEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: '.popup_add-element',
  handleFormSubmit: (element) => {
    createCard(element);
    api.createNewCard(element);
    addCardPopup.close();
  }
})
addCardPopup.setEventListeners();

const popupImageBig = new PopupWithImage('.popup_image');
popupImageBig.setEventListener();

const openImagePopup = (name, link) => {
  popupImageBig.open(name, link);
};

const renderCard = new Section({
  renderer: (element) => {
    createCard(element)
  }
}, elements)

const editInfo = new UserInfo({
  nameUser: profileName,
  infoUser: profileStatus,
})

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: '6bae60df-6d32-40ec-9280-dea8e2f20679',
    'Content-Type': 'application/json'
  }
})

api.getInitialCards()
  .then((data) => {
    const element = data.map(({ name, link }) => ({ name, link }));
    renderCard.renderItem(element);
  }).catch((res) => {
    console.log(`Ошибка: ${res.status}`);
  })

api.getUser()
  .then((res) => {
    insertImgAvatar.src = res.avatar;
    editInfo.setUserInfo(res.name, res.about);
  }).catch((res) => {
    console.log(`Ошибка: ${res.status}`);
  })

const deleteCardPopup = new PopupWithForm({ popupSelector: '.popup_remove-card' });
deleteCardPopup.setEventListener();

const openDeletePopup = () => {
  elements.querySelectorAll('.elements__element-delete-button').forEach(data =>
    data.addEventListener('click', () => {
      deleteCardPopup.open();
    })
  )
}

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

openAvatarEdit.addEventListener('click', () => {
  editValidation.cleanPopup();
  editAvatarValidation.submitButtonNotActive();
  avatarEditPopup.open();
})

