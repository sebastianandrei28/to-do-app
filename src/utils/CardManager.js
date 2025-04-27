// import { type } from "@testing-library/user-event/dist/type";

import PersistanceAPI from "./PersistanceAPI";

class CardManager {
  constructor() {
    this.items = [];
    this.lastId = 0;
  }
  addItem(title, description, shouldPersist = true) {
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
    if (shouldPersist) {
      this.persist();
    }
    return newItem;
  }
  getItems() {
    return [...this.items];
  }
  deleteItem(id) {
    this.items = this.items.filter((item) => item.id !== id);
    this.persist();
  }

  updateItem(id, updatedData) {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      //do nothing
    } else {
      this.items[itemIndex] = {
        ...this.items[itemIndex],
        ...updatedData,
        updatedAt: new Date(),
      };
      this.persist();
      return this.items[itemIndex];
    }
  }

  persist() {
    PersistanceAPI.upsert(this.items);
  }
}

export default CardManager;
