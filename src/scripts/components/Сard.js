class Card {
  constructor(element, itemTemp, openImagePopup, api, deleteCardPopup, buttonDeleteCard, profileId) {
    this._name = element.name;
    this._link = element.link;
    this._element = element;
    this._itemTemp = itemTemp;
    this._openImagePopup = openImagePopup;
    this._api = api;
    this._myId = profileId.id;
    this._deleteCardPopup = deleteCardPopup;
    this._buttonDeleteCard = buttonDeleteCard;
    this._likes = element.likes;
  }

  _getTemplate() {
    const itemTemplate = this._itemTemp.content.children[0];
    this._view = itemTemplate.cloneNode(true);

    return this._view;
  }

  renderCard() {
    this._getTemplate();
    this._view.querySelector('.elements__element-title').textContent = this._name;
    const elementImg = this._view.querySelector('.elements__element-img');
    this._view.querySelector('.elements__element-likes').innerHTML = this._likes.length;
    elementImg.src = this._link;
    elementImg.alt = this._name;
    this._setEventListeners();
    this._filterCardId();
    this._likeCard();

    return this._view;
  }

  _removeCard() {
    this._api.deleteCard(this._element._id);
    this._view.remove();
    // this._view = null;
  }

  _likeCard() {
    const btn = this._view.querySelector('.elements__element-like');
    let like = true,
      likeCount = this._view.querySelector('.elements__element-likes').innerHTML;
    btn.addEventListener('click', () => {
      likeCount = like ? ++likeCount : --likeCount;
      like = !like;
      this._view.querySelector('.elements__element-likes').innerHTML = likeCount;
      if (like) {
        this._view.querySelector('.elements__element-like').classList.remove('elements__element-like_active');
        this._api.deleteLike(this._element._id);
      } else {
        this._view.querySelector('.elements__element-like').classList.add('elements__element-like_active');
        this._api.plusLike(this._element._id);
      }
    });
  }

  _filterCardId() {
    if (this._element.owner._id !== this._myId) {
      this._view.querySelector('.elements__element-delete-button').remove();
    }

    return this._view;
  }

  _setEventListeners() {
    this._view.querySelector('.elements__element-delete-button').addEventListener('click', () => {
      this._deleteCardPopup.open(
        this._buttonDeleteCard.addEventListener('click', () => { this._removeCard(); this._deleteCardPopup.closes() })   
        )
    });
    this._view.querySelector('.elements__element-img').addEventListener('click', () => { this._openImagePopup(this._name, this._link) });
  }
}

export default Card;