import React from 'react'
import { IconContext } from 'react-icons';
import { Link,useLocation} from 'react-router-dom'
import './sidebarbutton.css'

export default function SidebarButton(props) {
    const location =useLocation();
    // console.log(location);
    const isActive=location.pathname===props.to;
    const btnClass=isActive ? "btn-body active":"btn-body";
  return (
    <Link to={props.to}>
        <div className={btnClass}>
            <IconContext.Provider value={{size: "24px" ,className:"btn-icon"}}>
                {props.icons}
                <p className='btn-tittle'>{props.tittle}</p>
            </IconContext.Provider>
            
        </div>
    </Link>
    
  );
}
