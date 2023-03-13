import React, { useState } from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [expand, setExpand] = useState(false);

  function expandForm(){
    setExpand((preValue) => !preValue);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
    setExpand(false);
  }

  return (
    <div>
      <form className="create-note">
        <input
          onClick={expandForm}
          id="title"
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Write a title"
        />
        {expand && <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={3}
        />}
        <Zoom in={expand}>
          <Fab onClick={submitNote}>
            <AddCircleOutlineIcon/>
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
