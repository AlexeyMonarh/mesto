import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupSelector.querySelector('.popup__inputs');
    this._buttonDefault = this._popupSelector.querySelector('.popup__submit-button').textContent;
  }
  _uxButton() {
    this._popupSelector.querySelector('.popup__submit-button').textContent = 'Сохранение...';
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  uxButtonClear() {
    this._popupSelector.querySelector('.popup__submit-button').textContent = this._buttonDefault;
  }

  resetForm() {
    this._popupForm.reset();
  }

  setEventListeners() {
    super.setEventListener();
    const setAddCard = this._popupSelector.querySelector('.popup__inputs');
    setAddCard.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._uxButton();
    });
  }
}