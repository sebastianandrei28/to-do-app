import React, { useEffect, useMemo, useState } from "react";
import "./ToDo.css";
import CardManager from "../utils/CardManager";
import ToDoForm from "../components/ToDoForm/ToDoForm";
import Header from "../components/Header/Header";
import CardList from "../components/Cards/CardList";
import PersistanceAPI from "../utils/PersistanceAPI";

let manager = null;

export default function ToDo() {
  const [toDoList, setToDoList] = useState([]);
  useEffect(() => {
    manager = new CardManager();
    PersistanceAPI.retrieve().map((item) =>
      manager.addItem(item.title, item.description, false)
    );
    setToDoList(manager.getItems());
  }, []);
  const [selectedToDo, setSelectedToDo] = useState(undefined);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <>
      <Header />

      {isFormVisible && (
        <div className="form-overlay">
          <ToDoForm
            selectedToDo={selectedToDo}
            isEditMode={isEditMode}
            setSelectedToDo={setSelectedToDo}
            setIsEditMode={setIsEditMode}
            setToDoList={setToDoList}
            setIsFormVisible={setIsFormVisible}
            manager={manager}
          />
        </div>
      )}

      <div className={`todo-container ${isFormVisible ? "blurred" : ""}`}>
        <CardList
          toDoList={toDoList}
          setToDoList={setToDoList}
          setSelectedToDo={setSelectedToDo}
          setIsEditMode={setIsEditMode}
          setIsFormVisible={setIsFormVisible}
          manager={manager}
        />
      </div>
    </>
  );
}
