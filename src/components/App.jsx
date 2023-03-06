import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [isUpdated, setUpdated] = useState(false);

  useEffect(() => {
      fetch('http://127.0.0.1:9000/allNotes')
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, [isUpdated]);    

  
  async function addNote(newNote) {
    await fetch('http://127.0.0.1:9000/writeNote', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({newNote})
    })
    .then((res) => res.text())
    .then((data) => console.log(data));
    setUpdated((preValue) => !preValue);
  }

  async function deleteNote(id) {
    await fetch('http://127.0.0.1:9000/delete',{
      method: 'POST',
      body: JSON.stringify({sn:id}),
    })
    .then((res) => res.text())
    .then((data) => console.log(data));
    setUpdated((preValue) => !preValue);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
