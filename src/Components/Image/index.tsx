import BoundingBox from "../Cadre";
import React, {Dispatch, SetStateAction} from "react";
import {FaceDetailList} from "aws-sdk/clients/rekognition";
import './image.css';
const Image : React.FC<{
    width:number,
    height:number,
    current:number,
    src:string,
    FaceDetails?:FaceDetailList,
    image:{
        height:number,
        width:number
    },
    setCurrent:Dispatch<SetStateAction<number>>,
}> = (props)=>{
    const {FaceDetails, current, height, image, setCurrent, width,src} = props;
        return(
        <div className={`table`}>
            {src.length > 0 &&
                <div className={"Face"}>
                    {
                        <img
                            src={src}
                            alt={"Human's faces"}
                            width={width}
                            height={height}
                            id={"Faces"}
                        />
                    }
                    {FaceDetails?.map((descri, id) =>
                        <BoundingBox
                            key={`${descri.BoundingBox?.Left}~${descri.BoundingBox?.Top}`}
                            left={descri?.BoundingBox?.Left || 0}
                            top={descri?.BoundingBox?.Top || 0}
                            width={descri?.BoundingBox?.Width || 0}
                            height={descri?.BoundingBox?.Height || 0}
                            image={image}
                            color={"transparent"}
                            id={id}
                            setFace={setCurrent}
                            Face={current}
                        />
                    )}
                </div>
            }
        </div>
    )
}
export default Image;
