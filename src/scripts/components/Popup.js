export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_open');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_open');
    document.addEventListener('keyup', this._handleEscClose);
  }

  _closeOverlay() {
    const overlay = this._popupSelector.querySelector('.popup__overlay');
    overlay.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    });
  }

  _handleEscClose(evt) {
    const popupEsc = document.querySelector('.popup_open');
    if (evt.key === "Escape") {
      this.close(popupEsc);
    }
  }

  setEventListeners() {
    const popupCloseIcon = this._popupSelector.querySelector('.popup__close-icon');
    popupCloseIcon.addEventListener('click', () => { this.close() });
    this._closeOverlay();
  }
}