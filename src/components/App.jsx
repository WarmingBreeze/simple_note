import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [isUpdated, setUpdated] = useState(false);

  useEffect(() => {
      fetch('https://weak-ruby-haddock-toga.cyclic.app/allNotes')
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, [isUpdated]);    

  
  async function addNote(newNote) {
    await fetch('https://weak-ruby-haddock-toga.cyclic.app//writeNote', {
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
    await fetch('https://weak-ruby-haddock-toga.cyclic.app/delete',{
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
