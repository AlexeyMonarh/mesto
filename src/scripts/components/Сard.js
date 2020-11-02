class Card {
  constructor(element, itemTemp, openImagePopup) {
    this._name = element.name;
    this._link = element.link;
    this._itemTemp = itemTemp;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    const itemTemplate = this._itemTemp.content.children[0];
    this._view = itemTemplate.cloneNode(true);

    return this._view;
  }

  renderCard() {
    this._getTemplate();
    this._view.querySelector('.elements__element-title').textContent = this._name
    const elementImg = this._view.querySelector('.elements__element-img');
    elementImg.src = this._link;
    elementImg.alt = this._name;
    this._setEventListeners();

    return this._view;
  }

  _removeCard() {
    this._view.remove();
    this._view = null;
  }

  _likeCard() {
    this._view.querySelector('.elements__element-like').classList.toggle('elements__element-like_active');
  }

  _setEventListeners() {
    this._view.querySelector('.elements__element-delete-button').addEventListener('click', () => { this._removeCard() });
    this._view.querySelector('.elements__element-like').addEventListener('click', () => { this._likeCard() });
    this._view.querySelector('.elements__element-img').addEventListener('click', () => { this._openImagePopup(this._name, this._link) });
  }
}

export default Card;