import React, {useState} from 'react';
import "./index.css"
function Navbar(){
    const [title,setTitle]= useState<string>("Face detection");
    return(
        <>
            <div className={"navbar"}>
                <h2>{title}</h2>
            </div>
        </>
    )
}
export default Navbar;