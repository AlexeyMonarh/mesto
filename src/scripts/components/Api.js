const thenApi = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;

  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    }).then(thenApi)
  }

  getUser() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    }).then(thenApi)
  }

  setUserInfo(name, about) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
  }

  setAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
  }

  createNewCard(element) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: element.name,
        link: element.link,
      })
    }).then(thenApi)
  }

  deleteCard(userId) {
    return fetch(`${this._baseUrl}/cards/${userId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: userId,
      })
    }).then(thenApi)
  }

  plusLike(userId) {
    return fetch(`${this._baseUrl}/cards/likes/${userId}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        _id: userId,
      })
    }).then(thenApi)
  }

  deleteLike(userId) {
    return fetch(`${this._baseUrl}/cards/likes/${userId}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: userId,
      })
    }).then(thenApi)
  }

}