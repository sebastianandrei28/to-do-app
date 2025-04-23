import { type } from "@testing-library/user-event/dist/type";

class CardManager {
  constructor() {
    this.items = [];
    this.lastId = 0;
  }
  addItem(title, description) {
    if (!title || !description) {
      throw new Error("Title and description are required.");
    }
    const newItem = {
      id: ++this.lastId,
      title: title,
      description: description,
      createAt: new Date(),
    };
    this.items.push(newItem);
    return newItem;
  }
  getItems() {
    return [...this.items];
  }
  deleteItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
  }
}

export default CardManager;
