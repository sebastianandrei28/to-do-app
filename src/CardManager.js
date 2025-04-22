class CardManager {
  constructor() {
    this.items = [];
    this.lastId = 0;
  }
  addItem(title, description) {
    const newItem = {
      id: ++this.lastId,
      title: title,
      description: description,
      createdAt: new Date(),
    };
    this.items.push(newItem);
    return newItem;
  }
  getItems() {
    return [...this.items]; //returneaza o copie pentru a evita modificarea directa
  }
  getItemById(id) {
    return this.items.find((item) => item.id === id);
  }
  updateItem(id) {
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length !== initialLength;
  }
}

export default CardManager;
