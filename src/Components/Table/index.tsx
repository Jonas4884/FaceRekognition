import React from "react";
import {Emotions, FaceDetail, Landmarks} from "aws-sdk/clients/rekognition";
import './table.css'
import Item from "../TableItem";

const Faceresponse : React.FC<{Detail?:FaceDetail,className?:string,bold?:boolean,id?:number}> = (props)=>{
    const {Detail,className,bold,id} = props;
    const themes = Object.keys(Detail||{});
    return(
    <>
        {
            themes.length>0 &&
            <>
                <h3 id={`title`}>{id !== undefined ? `Face : ${id}` : ""}</h3>
                <table className={className}>
                    <tbody>
                        {Object.values(Detail || {}).map((detail:{}, index) => (
                        <Item
                            key={`${themes[index]}`}
                            title={themes[index]}
                            body={detail}
                            bold={bold || false}
                        />
                        ))}
                    </tbody>
                </table>
            </>
        }
    </>
    )
}
export const Description:React.FC<{data:Emotions|Landmarks,className?:string}> = (props)=>{
    let {data,className} = props;
    return(
        <table className={className}>
            <thead>
            <tr>
                {
                    Object.keys(data[0]).map((title)=>(
                        <td key={title}>{title}</td>
                    ))
                }
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.Type}>
                    {Object.values(item).map((value)=>(
                        <td key={value as string}>{value as string}</td>
                    ))
                    }
                </tr>
            ))}
            </tbody>
        </table>
    )
}
export default Faceresponse;