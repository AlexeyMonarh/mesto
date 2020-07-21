// Form(close/open)
let openForm = document.querySelector('.profile__info-edit-button');
let closeForm = document.querySelector('.form__close-icon');
let form = document.querySelector('.form');

function toggleForm() {
  form.classList.toggle('form_open');
}

openForm.addEventListener('click', toggleForm);

closeForm.addEventListener('click', toggleForm);

// Form(edit)
let formElement = document.querySelector('.form');
let profileName = document.querySelector('.profile__info-name');
let profileStatus = document.querySelector('.profile__info-status');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.form__input-name');
  let jobInput = document.querySelector('.form__input-job');

  profileName.textContent = nameInput.value;
  profileStatus.textContent = jobInput.value;

  toggleForm();
}

formElement.addEventListener('submit', formSubmitHandler);