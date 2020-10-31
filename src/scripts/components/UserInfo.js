export default class UserInfo {
  constructor({ nameUser, infoUser }) {
    this._nameUser = nameUser;
    this._infoUser = infoUser;
  }

  getUserInfo() {
    const userName = this._nameUser.textContent;
    const userInfo = this._infoUser.textContent;
    const editProfile = {
      name: userName,
      info: userInfo,
    }

    return editProfile;
  }

  setUserInfo(name, info) {
    this._nameUser.textContent = name;
    this._infoUser.textContent = info;
  }
}