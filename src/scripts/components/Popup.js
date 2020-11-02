export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }

  open() {
    this._popupSelector.classList.add('popup_open');
    document.addEventListener('keyup', (event) => { this._handleEscClose(event) });
  }

  close() {
    this._popupSelector.classList.remove('popup_open');
    document.removeEventListener('keyup', this._handleEscClose.bind());
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