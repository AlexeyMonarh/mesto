class Card {
  constructor(element, itemTemp) {
    this._name = element.name;
    this._link = element.link;  
    this._itemTemp = itemTemp;
  }

  renderCard = () => {
    const itemTemplate = this._itemTemp.content.children[0];
    this._view = itemTemplate.cloneNode(true);
    this._view.querySelector('.elements__element-title').textContent = this._name;
    this._view.querySelector('.elements__element-img').src = this._link;
    this._setEventListeners();
  
    return this._view;
  }
  
  _removeCard = () => {
    this._view.remove();
  }

  _likeCard = () => {
    this._view.querySelector('.elements__element-like').classList.toggle('elements__element-like_active');
  }

  _handleImageClick = () => {
    document.querySelector('.popup_image').classList.add('popup_open');
    document.querySelector('.popup__title').textContent = this._name;
    document.querySelector('.popup__image').src = this._link;
    document.addEventListener('keydown', this._closeImageEscape);
  }

  _closeImageEscape = (evt) => {
    if (evt.key === "Escape") {
      document.querySelector('.popup_image').classList.remove('popup_open');
    }
  }

  _setEventListeners = () => {
    this._view.querySelector('.elements__element-delete-button').addEventListener('click', this._removeCard);
    this._view.querySelector('.elements__element-like').addEventListener('click', this._likeCard);
    this._view.querySelector('.elements__element-img').addEventListener('click', () => { this._handleImageClick() });
  }
}

export default Card;