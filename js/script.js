
let openForm = document.querySelector('.profile__info-edit-button');
let closeForm = document.querySelector('.popup__close-icon');
let form = document.querySelector('.popup');

let formElement = document.querySelector('.popup');
let profileName = document.querySelector('.profile__info-name');
let profileStatus = document.querySelector('.profile__info-status');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');

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