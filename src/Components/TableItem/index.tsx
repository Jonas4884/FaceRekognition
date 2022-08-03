import React from "react";
import Table, {Description} from "../Table";
import {Emotions, FaceDetail, Landmarks} from "aws-sdk/clients/rekognition";

const Item : React.FC<{title?:string, body:any,bold:boolean}> = (props)=>{
    let {body, title,bold} = props;
    return(
        <tr>
            {!bold ? <td className={"title"}>{title}</td> : <th>{title}</th>}
            <td>{renderData(body)}</td>
        </tr>
    );
}

function renderData(data:Emotions|Landmarks|FaceDetail|number|string|boolean){
    if(data instanceof Array){
        return (
            <div className={"container"}>
                <Description data={data} className={"verticalTable"}/>
            </div>
        );
    }
    else if(typeof data !== "object"){
        return data.toString();
    }
    else{
        return (<Table Detail={data} className={"sideTable"}/>);
    }
}

export default Item;