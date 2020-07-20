let openForm = document.querySelector('.profile__info-edit-button');
let closeForm = document.querySelector('.form__close-icon');
let form = document.querySelector('.form');

function toggleForm() {
  form.classList.toggle('form_open');
}

openForm.addEventListener('click', toggleForm)

closeForm.addEventListener('click', toggleForm)

let formElement = document.querySelector('.form');

function formSubmitHandler (evt) {
  evt.preventDefault(); 

  let nameInput = document.querySelector('.form__input-name');
  let jobInput = document.querySelector('');

  nameInput.hasAttribute('value');
}