import React, { useState } from "react";
import "./ToDoForm.css";

export default function ToDoForm({
  selectedToDo,
  isEditMode,
  setSelectedToDo,
  setIsEditMode,
  setToDoList,
  setIsFormVisible,

  manager,
}) {
  const [error, setError] = useState("");

  function cancelHandlerFN() {
    setSelectedToDo(null);
    setIsEditMode(false);
    setIsFormVisible(false);
    setError(""); // Resetează eroarea
  }

  function saveHandlerFN() {
    if (!isValidToDo(selectedToDo)) {
      setError("Title and description cannot be empty!");
      return;
    }
    if (selectedToDo.id) {
      manager.updateItem(selectedToDo.id, {
        title: selectedToDo.title,
        description: selectedToDo.description,
      });
    } else {
      manager.addItem(selectedToDo.title, selectedToDo.description);
    }
    setToDoList(manager.getItems());
    cancelHandlerFN();
    setIsFormVisible(false);
  }

  function isValidToDo(toDo) {
    return toDo?.title?.trim() && toDo?.description?.trim();
  }

  return (
    <div className="todo-form">
      <input
        placeholder="Enter the title of your task"
        value={selectedToDo?.title || ""}
        onChange={(e) => {
          if (isEditMode) {
            setSelectedToDo({ ...selectedToDo, title: e.target.value });
          }
        }}
        readOnly={!isEditMode}
      />

      <textarea
        placeholder="Enter a detailed description of your task"
        value={selectedToDo?.description || ""}
        onChange={(e) => {
          setSelectedToDo({ ...selectedToDo, description: e.target.value });
        }}
        readOnly={!isEditMode}
      />

      {error && <p style={{ color: "red", fontSize: "0.9rem" }}>{error}</p>}
      <button onClick={saveHandlerFN} className="save">
        Save
      </button>
      <button onClick={cancelHandlerFN} className="cancel">
        Cancel
      </button>
    </div>
  );
}
