class Card {
  constructor(element, formElement) {
    this._name = element.name;
    this._link = element.link;
    this._formElement = formElement;

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
  }

  _closeImageEscape = (evt) => {
    if (evt.key === "Escape") {
      document.querySelector('.popup_image').classList.remove('popup_open');
    }
  }

  renderCard = () => {
    const itemTemplate = document.querySelector('.elements__template').content.children[0];
    this._view = itemTemplate.cloneNode('true');
    this._view.querySelector('.elements__element-title').textContent = this._name;
    this._view.querySelector('.elements__element-img').src = this._link;
    this._setEventListeners();

    return this._view;
  }

  _setEventListeners = () => {
    this._view.querySelector('.elements__element-delete-button').addEventListener('click', this._removeCard);
    this._view.querySelector('.elements__element-like').addEventListener('click', this._likeCard);
    this._view.querySelector('.elements__element-img').addEventListener('click', () => { this._handleImageClick() });

    document.addEventListener('keydown', this._closeImageEscape);
  }
}

export default Card;