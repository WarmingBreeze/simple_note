import React from "react";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

function Note(props) {
  function deleteClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={deleteClick}>
        <HighlightOffIcon/>
      </button>
    </div>
  );
}

export default Note;
