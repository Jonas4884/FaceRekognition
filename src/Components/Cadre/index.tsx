import CSS from 'csstype';
import React, {Dispatch, SetStateAction} from "react";
import "./cadre.css";

const cadre : React.FC<{
    left:number,
    top:number,
    width:number,
    height:number,
    image:{
        height:number,
        width:number
    },
    color:string,
    id:number,
    setFace:Dispatch<SetStateAction<number>>,
    Face:number
}>=(props)=>{
    let {height, image, left, top, width,color,id,setFace,Face} = props;
    let {height: imageHeight, width: imageWidth} = image;
    const box : CSS.Properties= {
        position:'absolute',
        top:`${(top * imageHeight)}px`,
        left: `${(left * imageWidth)}px`,
        border:`5px solid ${color}`,
        width:`${(width*imageWidth)}px`,
        height:`${(height * imageHeight)}px`

    }
    return(
        <div style={box}
             className={`cadre ${Face===id?"Facing":""} ${id}`}
             onClick={()=>setFace(id)}>
            <span className="get_person">Person number:{id}</span>
        </div>
    )
}
export default cadre;