const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



const elements = document.querySelector('.elements');

// const initialCards = [
//   {
//       name: 'Архыз',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//     },
//   {
//       name: 'Челябинская область',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//   {
//       name: 'Иваново',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//   {
//       name: 'Камчатка',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//   {
//       name: 'Холмогорский район',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//   {
//       name: 'Байкал',
//       link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//     }
// ];

// function handleImageClick(data) {
//     popupOpenTitle.textContent = data.name;
//     popupOpenImage.src = data.link;
//     togglePopup(imageModal);
//   }

// function togglePopup(form) {
//   form.classList.toggle('popup_open');
//   if (form.classList.contains('popup_open')) {
//     addEventListener('keydown', formEsc);
//   } else {
//     removeEventListener('keydown', formEsc);
//   }
// }


class Card {
  constructor(element, cardSelector) {
    this._name = element.name;
    this._link = element.link;
    this._cardSelector = cardSelector;
  }

  _removeCard = () => {
    this._view.remove();
  }

  _likeCard = () => {
    this._view.querySelector('.elements__element-like').classList.toggle('elements__element-like_active');
  }

  // _addCard = (element) => {
    
  // }

  _renderCard() {
    const itemTemplate = document.querySelector('.elements__template').content.children[0];
    this._view = itemTemplate.cloneNode('true');
    this._view.querySelector('.elements__element-title').textContent = this._name;
    this._view.querySelector('.elements__element-img').src = this._link;
    this._setEventListeners();

    return this._view;
  }

  _setEventListeners() {
    this._view.querySelector('.elements__element-delete-button').addEventListener('click', this._removeCard);
    this._view.querySelector('.elements__element-like').addEventListener('click', this._likeCard);
  }
}

initialCards.forEach(element => {
  const item = new Card(element);
  elements.append(item._renderCard());
})

// const createCard = (...arg) => new Card(...arg);
// const list = getView();
// document.querySelector('.elements').append(list)



// initialCards.forEach(element => {
//   const item = new Card(element);
//   elements.append(item.returnCard());
// })

