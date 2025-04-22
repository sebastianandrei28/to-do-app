class CardManager {
  constructor() {
    this.items = [];
    this.lastId = 0;
  }

  // Adaugă un element nou
  addItem(title, description) {
    if (!title || !description) {
      throw new Error("Title and description are required.");
    }
    const newItem = {
      id: ++this.lastId,
      title: title,
      description: description,
      createdAt: new Date(),
    };
    this.items.push(newItem);
    return newItem;
  }

  // Returnează o copie a listei de elemente
  getItems() {
    return [...this.items]; // Evită modificarea directă a listei
  }

  // Găsește un element după ID
  getItemById(id) {
    return this.items.find((item) => item.id === id);
  }

  // Actualizează un element existent
  updateItem(id, updatedData) {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new Error(`Item with id ${id} not found.`);
    }
    this.items[itemIndex] = {
      ...this.items[itemIndex],
      ...updatedData,
      updatedAt: new Date(), // Adaugă un timestamp pentru actualizare
    };
    return this.items[itemIndex];
  }

  // Șterge un element după ID
  deleteItem(id) {
    const initialLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length !== initialLength; // Returnează true dacă s-a șters ceva
  }
}

export default CardManager;
