import React, {Dispatch, SetStateAction} from "react";
import './face.css'
const Nextface : React.FC<{
    maxPage:number,
    setCurrent:Dispatch<SetStateAction<number>>,
    current:number
}>=(props)=>{
    let {maxPage,setCurrent, current} = props;
    return(
        <div className={"pagination"}>
            <input
                type="button"
                value="Previous Face"
                onClick={()=>setCurrent((Face)=>Face-1)}
                hidden={(current-1) < 0}
                className={"paginate"}
            />
            <input
                type="button"
                value="Next"
                onClick={()=>setCurrent(Face => Face +1)}
                hidden={(current+1) >= maxPage}
                className={"paginate"}
            />
        </div>
    )
}
export default Nextface;