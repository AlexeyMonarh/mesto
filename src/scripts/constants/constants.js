export const popupValid = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input',
  inputInvalidClass: 'popup__input-invalid',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  errorClass: 'popup__error',
  errorClassActive: 'popup__error_active'
};

export const itemTemplate = document.querySelector('.elements__template');

export const addElementModal = document.querySelector('.popup_add-element');
export const editProfileModal = document.querySelector('.popup_edit-profile');
export const editAvatarModal = document.querySelector('.popup_edit-avatar');

export const imageModal = document.querySelector('.popup_image');

export const popupInputs = editProfileModal.querySelector('.popup__inputs');
export const addElement = addElementModal.querySelector('.popup__inputs');
export const editAvatar = editAvatarModal.querySelector('.popup__inputs');

export const closeFormAdd = addElementModal.querySelector('.popup__close-icon');
export const closeFormEdit = editProfileModal.querySelector('.popup__close-icon');
export const closeFormImage = imageModal.querySelector('.popup__close-icon');

export const profileName = document.querySelector('.profile__info-name');
export const profileStatus = document.querySelector('.profile__info-status');

export const nameInput = popupInputs.querySelector('.popup__input-name');
export const jobInput = popupInputs.querySelector('.popup__input-job');
export const placeInput = addElement.querySelector('.popup__input-place');
export const linkInput = addElement.querySelector('.popup__input-link');
export const linkInputAvatar = editAvatar.querySelector('.popup__input-link');

export const openFormEdit = document.querySelector('.profile__info-edit-button');
export const openAddButton = document.querySelector('.profile__add-button');

export const submitButtonEdit = editProfileModal.querySelector('.popup__submit-button');
export const submitButtonAdd = addElementModal.querySelector('.popup__submit-button');
export const submitButtonAvatar = editAvatarModal.querySelector('.popup__submit-button');

export const elements = document.querySelector('.elements');

export const openAvatarEdit = document.querySelector('.profile__avatar-hover');
export const insertImgAvatar = openAvatarEdit.querySelector('.profile__avatar');
