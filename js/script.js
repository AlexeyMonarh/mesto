
let openForm = document.querySelector('.profile__info-edit-button');
let closeForm = document.querySelector('.popup__close-icon');
let form = document.querySelector('.popup');

let formElement = document.querySelector('.popup');
let profileName = document.querySelector('.profile__info-name');
let profileStatus = document.querySelector('.profile__info-status');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');

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

initialCards.forEach((data) => {
  const elementsTemplate = document.querySelector('.elements__template').content.querySelector('.elements__element');
  const elementsElement = elementsTemplate.cloneNode(true);

  const elementsImage = elementsElement.querySelector('.elements__element-img');
  const elementsTitle = elementsElement.querySelector('.elements__element-title');
  const elementsLikeButton = elementsElement.querySelector('.elements__element-like');
  const elementsDeleteButton = elementsElement.querySelector('.elements__element-delete-button');

  elementsTitle.textContent = data.name;
  elementsImage.src = data.link;

  const elements = document.querySelector('.elements');
  elements.prepend(elementsElement);

})

nameInput.value = profileName.textContent;
jobInput.value = profileStatus.textContent;

function toggleForm() {
  form.classList.toggle('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileStatus.textContent;
}

openForm.addEventListener('click', toggleForm);

closeForm.addEventListener('click', toggleForm);

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;

  toggleForm();
}

formElement.addEventListener('submit', formSubmitHandler);