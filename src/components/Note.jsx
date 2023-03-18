import React from "react";
import Popover from '@mui/material/Popover';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export default function Note(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  function editNote(){
    props.onEdit(props.id);
  }

  function deleteNote(){
    props.onDelete(props.id);
  }
  
  function handlePopover(event){
    //console.log('hover in');
    setAnchorEl(event.target);
  }

  function handlePopoverClose(){
    //console.log('hover out');
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <div onClick={handlePopover}>
        <MoreHorizIcon/>
      </div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        //disableRestoreFocus
      >
        <div className='pop-munu' onClick={editNote}>
          <DriveFileRenameOutlineIcon
            sx={{
              color:'#f5ba13',
              fontSize: '2.3rem',
            }}
          />
        </div>
        <div className='pop-munu' onClick={deleteNote}>
          <DeleteIcon
            sx={{
              color:'#f5ba13',
              fontSize: '2.3rem',
            }}
          />
        </div>
      </Popover>
    </div>
  );
}

export function NoteInEditMode (props){
  const [updatedNote, setUpdatedNote] = React.useState({
    title: props.title,
    content: props.content
  });
  
  function cancelEdit(){
    props.onEdit(null);
  }

  function handleChange(event){
    const {name, value} = event.target;
    setUpdatedNote((preValue) => {
      return {
        ...preValue,
        [name]: value
      };
    });
  }

  function saveEdit(){
    props.onUpdate(updatedNote, props.id);
  }

  return (
    <div className="note">
      <input
        name="title"
        onChange={handleChange} 
        type='text'
        value={updatedNote.title}>
      </input>
      <textarea
        name="content"
        onChange={handleChange}
        rows='5'
        cols='8'
        autoFocus>
        {updatedNote.content}
      </textarea>
      <div onClick={cancelEdit}>  
        <CancelOutlinedIcon/>
      </div>
      <div onClick={saveEdit}>
        <CheckCircleOutlineIcon/>
      </div>
    </div>
  )
}
