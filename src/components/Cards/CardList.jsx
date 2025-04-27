import React from "react";
import Card from "./Card";
import "./CardList.css";

export default function CardList({
  toDoList,
  setToDoList,
  setSelectedToDo,
  setIsEditMode,
  setIsFormVisible,
  manager,
}) {
  function createNewHandlerFN() {
    setSelectedToDo({ id: null, title: "", description: "" });
    setIsEditMode(true);
    setIsFormVisible(true);
  }

  function handleDelete(id) {
    manager.deleteItem(id);
    setToDoList(manager.getItems());
  }

  function handleEdit(toDo) {
    setSelectedToDo(toDo);
    setIsEditMode(true);
    setIsFormVisible(true);
  }

  function handleView(toDo) {
    setSelectedToDo(toDo);
    setIsEditMode(false);
    setIsFormVisible(true);
  }

  function updateCardTitle(id, newTitle) {
    setToDoList((prevList) =>
      prevList.map((card) =>
        card.id === id ? { ...card, title: newTitle } : card
      )
    );
  }

  function updateCardDescription(id, newDescription) {
    setToDoList((prevList) =>
      prevList.map((card) =>
        card.id === id ? { ...card, description: newDescription } : card
      )
    );
  }

  return (
    <div className="card-container">
      {/* Card special pentru "Create New" */}
      <div className="card create-new-card" onClick={createNewHandlerFN}>
        <h3>Create New</h3>
      </div>

      {/* Lista de carduri */}
      {toDoList.map((elem) => (
        <Card
          key={elem.id}
          title={elem.title}
          description={elem.description}
          deleteHandlerFN={() => handleDelete(elem.id)}
          editHandlerFN={() => handleEdit(elem)}
          viewHandlerFN={() => handleView(elem)}
          onTitleChange={(newTitle) => updateCardTitle(elem.id, newTitle)}
          onDescriptionChange={(newDescription) =>
            updateCardDescription(elem.id, newDescription)
          }
        />
      ))}
    </div>
  );
}
