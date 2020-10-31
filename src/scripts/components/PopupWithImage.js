import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open (name, link) {
    const popupBigImageTitle = this._popupSelector.querySelector('.popup__title');
    const popupBigImageSrc = this._popupSelector.querySelector('.popup__image');
    popupBigImageTitle.textContent = name;
    popupBigImageSrc.src = link;
    super.open();
  }
}