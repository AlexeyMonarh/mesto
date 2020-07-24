const form = document.querySelector('.popup');

const addElementModal = document.querySelector('.popup_add-element');
const editProfileModal  = document.querySelector('.popup_edit-profile');

const popupInputs = editProfileModal.querySelector('.popup__inputs');
const addElement = addElementModal.querySelector('.popup__inputs');

let openFormEdit = document.querySelector('.profile__info-edit-button');
const openAddButton = document.querySelector('.profile__add-button');

let closeFormAdd = addElementModal.querySelector('.popup__close-icon');
let closeFormEdit = editProfileModal.querySelector('.popup__close-icon');


let profileName = document.querySelector('.profile__info-name');
let profileStatus = document.querySelector('.profile__info-status');

let nameInput = popupInputs.querySelector('.popup__input-name');
let jobInput = popupInputs.querySelector('.popup__input-job');

let placeInput = addElement.querySelector('.popup__input-place');
let linkInput = addElement.querySelector('.popup__input-link');

const elementsTemplate = document.querySelector('.elements__template').content.querySelector('.elements__element');
const elements = document.querySelector('.elements');

nameInput.value = profileName.textContent;
jobInput.value = profileStatus.textContent;

function toggleForm(form) {
  form.classList.toggle('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}



function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;

  toggleForm(editProfileModal);
}

function addElementSubmitHandler(evt) {
  evt.preventDefault();

  renderElement({name: placeInput.value, link: linkInput.value});
  
  
  toggleForm(addElementModal);
  
}

popupInputs.addEventListener('submit', formSubmitHandler);
addElement.addEventListener('submit', addElementSubmitHandler);


openFormEdit.addEventListener('click', () => {
  toggleForm(editProfileModal);
}); 
closeFormEdit.addEventListener('click', () => {
  toggleForm(editProfileModal);
});

openAddButton.addEventListener('click', () => {
  toggleForm(addElementModal);
}); 

closeFormAdd.addEventListener('click', () => {
  toggleForm(addElementModal);
});





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

function handleLikeClick(a, b) {
  elementsLikeButton.classList.remove('.elements__element-like');
  elementsLikeButton.classList.add('.elements__element-like_active');
}

function renderElement(data) {
  elements.prepend(createElement(data));
}

function createElement(data) {
  const elementsElement = elementsTemplate.cloneNode(true);
  const elementsImage = elementsElement.querySelector('.elements__element-img');
  const elementsTitle = elementsElement.querySelector('.elements__element-title');
  const elementsLikeButton = elementsElement.querySelector('.elements__element-like');
  
  const elementsDeleteButton = elementsElement.querySelector('.elements__element-delete-button');

  elementsLikeButton.addEventListener('click', () => {
    handleLikeClick();
  });

  elementsDeleteButton.addEventListener('click', () => {
    handleDeleteClick();
  });

  elementsImage.addEventListener('click', () => {
    handleImageClick();
  });

  elementsTitle.textContent = data.name;
  elementsImage.src = data.link;

  return elementsElement;
}

initialCards.forEach((data) => {
  renderElement(data);
})








// function toggleForm2() {
//   addElementModal.classList.toggle('popup_open');
  
// }





// openAddButton.addEventListener('click', () => {
//   toggleForm2();
// })