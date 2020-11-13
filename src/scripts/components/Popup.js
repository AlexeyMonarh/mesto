export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_open');
    document.addEventListener('keyup', this._handleEscClose);
  }

  closes() {
    this._popupSelector.classList.remove('popup_open');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _closeOverlay() {
    const overlay = this._popupSelector.querySelector('.popup__overlay');
    overlay.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) {
        this.closes();
      }
    });
  }

  _handleEscClose(evt) {
    const popupEsc = document.querySelector('.popup_open');
    if (evt.key === "Escape") {
      this.closes(popupEsc);
    }
  }

  setEventListener() {
    const popupCloseIcon = this._popupSelector.querySelector('.popup__close-icon');
    popupCloseIcon.addEventListener('click', () => { this.closes() });
    this._closeOverlay();
  }
}