const object = {
  formSelector: '.popup__inputs',
  inputSelector: '.popup__input',
  inputInvalidClass: 'popup__input-invalid',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  errorClass: 'popup__error',
  errorClassActive: 'popup__error_active'
}

const enableValidation = ({ formSelector, inputSelector, inputInvalidClass, submitButtonSelector, inactiveButtonClass, errorClass, errorClassActive }) => {
  
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    const inputs = Array.from(formElement.querySelectorAll(inputSelector));

    inputs.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {

        function deleteError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
          inputElement.classList.remove(inputInvalidClass);
          errorElement.textContent = '';
          errorElement.classList.remove(errorClass);
        };

        function addError(formElement, inputElement) {
          const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
          inputElement.classList.add(inputInvalidClass);
          errorElement.textContent = inputElement.validationMessage;
          errorElement.classList.add(errorClass);
          errorElement.classList.add(errorClassActive);
          };
     
      function toggleError (formElement, inputElement) {
        if (inputElement.validity.valid) {
          deleteError(formElement, inputElement);
        } else {
          addError(formElement, inputElement);
        }
      };

      toggleError(formElement, inputElement);

      const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);
      
      function toggleButton(formElement, isFormValid) {
      const buttonSubmit = formElement.querySelector(submitButtonSelector);
        if (!isFormValid) {
          buttonSubmit.classList.remove(inactiveButtonClass);
          buttonSubmit.removeAttribute('disabled');
        } else {
          buttonSubmit.classList.add(inactiveButtonClass);
          buttonSubmit.setAttribute('disabled', true);
        }
      };

      toggleButton(formElement, isFormValid);
      });
    });
  });
};
enableValidation(object);