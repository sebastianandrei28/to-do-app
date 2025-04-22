import { useState } from "react";
import Card from "./Card";
import ToDoItem from "./ToDoItem";
import "./ToDo.css";
import CardManager from "./CardManager";

export default function ToDo() {
  const [selectedToDo, setSelectedToDo] = useState();
  const [toDoList, setToDoList] = useState([
    "Plimba cainele",
    "Spala cainele",
    "Spala pisica",
  ]);

  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const cardManager = new CardManager();

  const handleAddItem = () => {
    if (title.trim()) {
      cardManager.addItem(title, description);
      setItems(cardManager.getItems());
      // Resetează câmpurile după adăugare
      setTitle("");
      setDescription("");
    }
  };

  cardManager.addItem("plimbare in Parc", "plimbare in parc cu elena");
  cardManager.addItem("plimbare in Parc", "plimbare in parc cu sebi");
  console.log(cardManager.getItems());
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
        <div>
          {toDoList.map((elem, i) => (
            <Card
              key={i}
              title={elem}
              description={elem}
              deleteHandlerFN={() => {
                setToDoList(toDoList.filter((item) => item !== elem));
              }}
              viewHandlerFN={() => {
                setSelectedToDo(elem);
              }}></Card>
          ))}
        </div>
        <div className="ClaudeCode">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titlu"
            />
          </div>
          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descriere"
              rows="3"
            />
            <button onClick={handleAddItem}>Adaugă Element</button>
          </div>
          <div>
            <h3>Elemente adăugate:</h3>
            {items.length === 0 ? (
              <p>Nu există elemente.</p>
            ) : (
              <ul>
                {items.map((item) => (
                  <li key={item.id}>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div
          style={{
            border: "3px solid",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}>
          <input
            style={{ height: "50px" }}
            type="text"
            placeholder="Titlu"
            value={selectedToDo}></input>

          <textarea style={{ width: "600px", height: "200px" }}>
            To be done
          </textarea>

          <button>Save</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  );
}
