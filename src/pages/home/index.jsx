import React, { useState } from "react";
import styles from "./index.module.css";
import Wrapper from "../../components/UI/wrapper";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditNote, setCurrentEditNote] = useState(null);
  const [editInputValue, setEditInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleEditInputChange = (event) => {
    setEditInputValue(event.target.value);
  };

  const handleClickFunction = () => {
    setNotes([...notes, { id: Date.now(), content: inputValue }]);
    setInputValue("");
  };

  const handleEditFunction = (note) => {
    setIsEditing(true);
    setCurrentEditNote(note);
    setEditInputValue(note.content);
  };

  const handleSaveEditFunction = () => {
    const updatedNotes = notes.map((note) =>
      note.id === currentEditNote.id ? { ...note, content: editInputValue } : note
    );
    setNotes(updatedNotes);
    setIsEditing(false);
    setCurrentEditNote(null);
    setEditInputValue("");
  };

  const handleRemoveFunction = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  return (
    <Wrapper>
      <div className={styles.background}>
        <div className={styles.flexs}>
          <input onChange={handleInputChange} placeholder="Note name" type="text" value={inputValue} />
          <button onClick={handleClickFunction}>Add Note</button>
        </div>
        <div className={styles.notes}>
          {notes.map((note) => (
            <div key={note.id} className={styles.notesmap}>
              {isEditing && currentEditNote && currentEditNote.id === note.id ? (
                <div className={styles.editingdiv}>
                  <textarea
                    onChange={handleEditInputChange}
                    type="text"
                    value={editInputValue}
                    rows="4"
                    cols="50"
                    className={styles.textareatrue}
                  />
                  <button className={styles.button3} onClick={handleSaveEditFunction}>
                    Save
                  </button>
                </div>
              ) : (
                <div className={styles.normaldiv}>
                  <textarea value={note.content} readOnly rows="4" cols="30" />
                  <div className={styles.normaldivflexs}>

                  <button className={styles.button1} onClick={() => handleEditFunction(note)}>
                    Edit
                  </button>
                  <button className={styles.button2} onClick={() => handleRemoveFunction(note.id)}>
                    Remove
                  </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Home;
