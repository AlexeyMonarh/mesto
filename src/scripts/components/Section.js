export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItem() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(card) {
    this._containerSelector.append(card);
  }
}