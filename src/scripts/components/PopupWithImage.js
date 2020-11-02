import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupBigImageTitle = this._popupSelector.querySelector('.popup__title');
    this._popupBigImageSrc = this._popupSelector.querySelector('.popup__image');
  }

  open (name, link) {
    this._popupBigImageTitle.textContent = name;
    this._popupBigImageSrc.src = link;
    super.open();
  }
}