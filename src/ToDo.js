import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import "./ToDo.css";
import CardManager from "./CardManager";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const activityList = [
  {
    title: "Scrie în jurnal",
    description:
      "Notează gândurile și emoțiile tale de azi pentru claritate mentală.",
  },
  {
    title: "Citește 10 pagini dintr-o carte",
    description:
      "Alege o carte care te inspiră sau te ajută să înveți ceva nou.",
  },
  {
    title: "Fă 20 minute de mișcare",
    description:
      "Plimbare, stretching sau antrenament scurt pentru mai multă energie.",
  },
  {
    title: "Curăță un spațiu din casă",
    description: "Alege o zonă mică și fă ordine pentru o minte mai limpede.",
  },
  {
    title: "Stabilește 3 obiective pentru mâine",
    description: "Gândește-te la 3 lucruri importante de realizat mâine.",
  },
];
const manager = new CardManager();

(function () {
  // Adaugă elemente
  activityList.map((item) => {
    manager.addItem(item.title, item.description);
  });
})();

export default function ToDo() {
  const [selectedToDo, setSelectedToDo] = useState(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const [toDoList, setToDoList] = useState(manager.getItems());

  useEffect(() => {
    console.log("Lista actualizată:", toDoList);
  }, [toDoList]);

  function createNewHandlerFN() {
    setSelectedToDo({ undefined });
    setIsEditMode(true);
  }

  function cancelHandlerFN() {
    setSelectedToDo({ undefined });
  }
  function handleDelete(id) {
    // setToDoList(toDoList.filter((item) => item.id !== id));

    manager.deleteItem(id);
    setToDoList(manager.getItems());
    setSelectedToDo(undefined); // Resetează selecția
  }

  function handleEdit(elem) {
    setSelectedToDo(elem);
    setIsEditMode(true); // Activează modul de editare
  }

  function handleView(elem) {
    setSelectedToDo(elem);
    setIsEditMode(false); // Activează modul de vizualizare
  }

  function saveHandlerFN() {
    if (!selectedToDo.title || !selectedToDo.description) {
      alert("Title and description cannot be empty!");
      return;
    }
    const updatedList = toDoList.some((elem) => elem.id === selectedToDo.id)
      ? toDoList.map((elem) =>
          elem.id === selectedToDo.id
            ? {
                ...elem,
                title: selectedToDo.title,
                description: selectedToDo.description,
              }
            : elem
        )
      : [
          ...toDoList,
          {
            id: toDoList.length,
            title: selectedToDo.title,
            description: selectedToDo.description,
          },
        ];

    setToDoList(updatedList);
    setSelectedToDo({ undefined }); // Resetează selecția
    setIsEditMode(false); // Ieși din modul de editare
  }

  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>To Do's</h1>
      </div>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Aranjează elementele pe verticală
            alignItems: "center", // Centrează elementele pe orizontală
            gap: "20px", // Spațiere între buton și card-uri
          }}>
          {toDoList.map((elem) => (
            <Card
              key={elem.id}
              title={elem.title}
              description={elem.description}
              deleteHandlerFN={() => handleDelete(elem.id)}
              editHandlerFN={() => handleEdit(elem)}
              viewHandlerFN={() => handleView(elem)}></Card>
          ))}
        </div>
        {/* right table */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          <button onClick={createNewHandlerFN}>Create new</button>

          <input
            style={{
              height: "50px",
              backgroundColor: isEditMode ? "white" : "#f0f0f0",
              color: isEditMode ? "black" : "#888",
            }}
            type="text"
            placeholder="Title"
            value={selectedToDo?.title || ""}
            onChange={(e) => {
              if (isEditMode) {
                setSelectedToDo({ ...selectedToDo, title: e.target.value });
              }
            }}
            readOnly={!isEditMode}></input>

          <textarea
            style={{
              width: "600px",
              height: "200px",
              backgroundColor: isEditMode ? "white" : "#f0f0f0",
              color: isEditMode ? "black" : "#888",
            }}
            type="text"
            placeholder="Description"
            value={selectedToDo?.description || ""}
            onChange={(e) => {
              if (isEditMode) {
                setSelectedToDo({
                  ...selectedToDo,
                  description: e.target.value,
                });
              }
            }}
            readOnly={!isEditMode} //
          ></textarea>

          <button onClick={saveHandlerFN}>Save</button>
          <button onClick={cancelHandlerFN}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
