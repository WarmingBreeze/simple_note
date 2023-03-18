import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note, {NoteInEditMode} from "./Note";
import CreateArea from "./CreateArea";

function App() {
  //note related
  const [notes, setNotes] = useState([]);
  const [isUpdated, setUpdated] = useState(false);

  //dark mode
  const [isDark, setDark] = useState(false);

  //edit mode
  const [editID, setEditID] = useState(null);

  useEffect(() => {
      fetch('https://weak-ruby-haddock-toga.cyclic.app/allNotes')
      .then((response) => response.json())
      .then((data) => setNotes(data));
  }, [isUpdated]);    

  function darkModeSwitch(){
    setDark((preValue) => !preValue);
    if (isDark) {
      document.getElementsByTagName('body')[0].style.backgroundColor='#eee';
    } else {
      document.getElementsByTagName('body')[0].style.backgroundColor='#3F4E4F';
    }
  }

  function editNote(id){
    setEditID(id);
  }

  async function updateNote(updatedNote, noteID){
    await fetch('https://weak-ruby-haddock-toga.cyclic.app/updateNote',{
      method: 'POST',
      mode:'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: noteID, updatedNote})
    })
    .then((res) => res.text())
    .then((data) => console.log(data));
    setEditID(null);
    setUpdated((preValue) => !preValue);
  }

  async function addNote(newNote) {
    await fetch('https://weak-ruby-haddock-toga.cyclic.app/writeNote', {
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
      <Header  
        bgColor={isDark? {backgroundColor: '#2C3639'}:{backgroundColor: '#f5ba13'}}
        darkMode={darkModeSwitch}
        isDark={isDark}
      />
      <CreateArea onAdd={addNote} />
      <div className='note-section'>
      {notes.map((noteItem) => {
        if (noteItem._id === editID) {
          return <NoteInEditMode
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onEdit={editNote}
            onUpdate={updateNote}
          />;
        } else {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
            onEdit={editNote}
          />
        );}
      })}
      </div>
      <Footer />
    </div>
  );
}

export default App;
