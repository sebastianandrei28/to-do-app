import "./Card.css";
export default function Card({
  title,
  description,
  isEditMode,
  deleteHandlerFN,
  editHandlerFN,
  viewHandlerFN,
  onTitleChange,
  onDescriptionChange,
}) {
  return (
    <div className="card">
      <div>
        <>
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </>
      </div>
      <div className="cardButtons">
        {isEditMode ? (
          <button onClick={viewHandlerFN}>Save</button>
        ) : (
          <>
            <button onClick={editHandlerFN}>Edit</button>
            <button onClick={viewHandlerFN}>View</button>
          </>
        )}
        <button onClick={deleteHandlerFN}>Delete</button>
      </div>
    </div>
  );
}
