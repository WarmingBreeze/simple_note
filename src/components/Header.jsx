import React from "react";
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Header(props) {
  return (
    <header style={props.bgColor}>
      <h1>
        <CreateRoundedIcon/>
        Simple Note
      </h1>
      <div 
        className="darkmode-icon"
        onClick={()=>{props.darkMode()}}  
      >
        {props.isDark? <WbSunnyIcon
          sx={{
            fontSize: '2rem'
          }}
        />: <DarkModeIcon
          sx={{
            fontSize: '2rem'
          }}
        />}
      </div>
      
    </header>
  );
}

export default Header;
