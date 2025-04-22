import "./Card.css";
export default function Card({
  title,
  description,
  deleteHandlerFN,
  editHandlerFN,
  viewHandlerFN,
}) {
  return (
    <div
      style={{
        border: "3px solid black",
        width: "400px",
        marginLeft: "100px",
        marginBottom: "20px",
        fontSize: "32px",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
      }}>
      <div>
        <input type="text" value={title}></input>
        <input type="text" value={description}></input>
      </div>
      <div className="cardButtons">
        <button onClick={deleteHandlerFN}>Delete</button>
        <button onClick={editHandlerFN}>Edit</button>
        <button onClick={viewHandlerFN}>View</button>
      </div>
    </div>
  );
}
