class FormValidator {
  constructor(data, formElement) {
    this._data = data;
    this._formElement = formElement;
  }

  enableValidation = (inputElement) => {
    const forms = Array.from(document.querySelectorAll(this._data.formSelector));
    forms.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      })
      this._inputsEvent(inputElement, formElement);
    })
  }

  _inputsEvent = () => {
    const inputs = Array.from(this._formElement.querySelectorAll(this._data.inputSelector));
    inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', (evt) => {
        this._toggleError(evt.target);
        this._toggleButton(inputs);
      });
    });
  }

  _addError = (inputElement, validationMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._data.inputInvalidClass);
    errorElement.textContent = validationMessage;
    errorElement.classList.add(this._data.errorClass);
    errorElement.classList.add(this._data.errorClassActive);
  }

  _deleteError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(this._data.inputInvalidClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._data.errorClass);
  }

  _toggleButton = (inputs) => {
    const isFormValid = inputs.some((inputElement) => !inputElement.validity.valid);
    const buttonSubmit = this._formElement.querySelector(this._data.submitButtonSelector);
    if (!isFormValid) {
      this._submitButtonActive(buttonSubmit);
    } else {
      this._submitButtonNotActive(buttonSubmit);
    }
  }

  _toggleError = (inputElement) => {
    if (inputElement.validity.valid) {
      this._deleteError(inputElement);
    } else {
      this._addError(inputElement, inputElement.validationMessage);
    }
  }

  _submitButtonActive = (btn) => {
    btn.removeAttribute('disabled');
    btn.classList.remove('popup__submit-button_disabled');
  }

  _submitButtonNotActive = (btn) => {
    btn.setAttribute('disabled', true);
    btn.classList.add('popup__submit-button_disabled');
  }
}

export default FormValidator;