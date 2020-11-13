export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItem(data) {
    data.map((item) => { this._renderer(item) });
  }

  addItem(card) {
    this._containerSelector.prepend(card);
  }
}