import React, { useState, useEffect, useRef } from "react";
import Card from "./Card";
import "./ToDo.css";

export default function ToDo() {
  const [selectedToDo, setSelectedToDo] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  let activityList = [
    {
      id: 0,
      title: "Scrie în jurnal",
      description:
        "Notează gândurile și emoțiile tale de azi pentru claritate mentală.",
    },
    {
      id: 1,
      title: "Citește 10 pagini dintr-o carte",
      description:
        "Alege o carte care te inspiră sau te ajută să înveți ceva nou.",
    },
    {
      id: 2,
      title: "Fă 20 minute de mișcare",
      description:
        "Plimbare, stretching sau antrenament scurt pentru mai multă energie.",
    },
    {
      id: 3,
      title: "Curăță un spațiu din casă",
      description: "Alege o zonă mică și fă ordine pentru o minte mai limpede.",
    },
    {
      id: 4,
      title: "Stabilește 3 obiective pentru mâine",
      description: "Gândește-te la 3 lucruri importante de realizat mâine.",
    },
  ];

  useEffect(() => {});

  const [toDoList2, setToDoList2] = useState(activityList);

  function createNewHandlerFN() {
    setIsEditMode(true);
  }

  function saveHandlerFN() {
    if (!selectedToDo.title || !selectedToDo.description) {
      alert("Title and description cannot be empty!");
      return;
    }
    const updatedList = toDoList2.some((elem) => elem.id === selectedToDo.id)
      ? toDoList2.map((elem) =>
          elem.id === selectedToDo.id
            ? {
                ...elem,
                title: selectedToDo.title,
                description: selectedToDo.description,
              }
            : elem
        )
      : [
          ...toDoList2,
          {
            id: toDoList2.length,
            title: selectedToDo.title,
            description: selectedToDo.description,
          },
        ];

    setToDoList2(updatedList);
    setSelectedToDo({ undefined }); // Resetează selecția
    setIsEditMode(false); // Ieși din modul de editare
  }
  function cancelHandlerFN() {
    setSelectedToDo({ undefined });
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
          <button onClick={createNewHandlerFN}>Create new</button>

          {toDoList2.map((elem, i) => (
            <Card
              key={i}
              title={elem.title}
              description={elem.description}
              deleteHandlerFN={() => {
                setToDoList2(toDoList2.filter((item) => item !== elem));
              }}
              editHandlerFN={() => {
                setSelectedToDo(elem);
                setIsEditMode(true);
              }}
              viewHandlerFN={() => {
                setSelectedToDo(elem);
                setIsEditMode(false);
              }}></Card>
          ))}
        </div>
        {/* right table */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
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
