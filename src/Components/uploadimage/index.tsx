import React, {Dispatch, SetStateAction, useState} from "react";
import processImage from "../Process";
import DetectFaces from "../Awsprocess";
import {AWSError} from "aws-sdk";
import {DetectFacesResponse} from "aws-sdk/clients/rekognition";
import './input.css'

const Home: React.FC<{
    setSource: Dispatch<SetStateAction<string>>,
    setResult: Dispatch<SetStateAction<DetectFacesResponse|undefined>>,
    logoSrc:string
}>=(props)=>{
    const {setResult, setSource,logoSrc} = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [title,setTitle] = useState<string>("Click above the icon to load an image");
    const [responded,setResponded] = useState<boolean>(false);
    let Style = {
        width:responded?"40px":"150px",
        height:responded?"40px":"150px"
    }
    let processAndDetect : (event:React.ChangeEvent<HTMLInputElement>)=>void = (event)=>{
        setIsLoading(true);
        processImage(event, (result)=> {
            let file = event.target.files?.item(0);
            DetectFaces(result,file as File,(err:AWSError, data:DetectFacesResponse)=> {
                if (err) {
                    alert("Input image corrupted");
                    console.log(err,err.stack);
                    window.location.reload();
                }
                else {
                    setTitle("Your result face. Click to explore more");
                    setIsLoading(false);
                    setResponded(true);
                    setSource(URL.createObjectURL(file as File));
                    setResult(data);
                }
            });
        })
    }
    let newvalue : (event : React.MouseEvent<HTMLInputElement,MouseEvent>)=>void =()=>{
        setSource("");
        setResult(undefined);
        setTitle("Load more Picture for rekognition");
        setResponded(false);
    }
    return (
        <>
            <div className={"home"}>
            <span id={`image_container`} className={`${responded}`}>
            <label htmlFor={"app__image__input"} hidden={isLoading} className={responded?"flex":""}>
                    <img src={logoSrc} alt={"scanner icon"} id={"scanner_image"} style={Style}/>
                {!isLoading && <p id={"logo_text"}>{title}</p>}
            </label>
                {isLoading &&
                    <>
                        <img src={logoSrc} alt={"logo"} id={"logo_image"}/>
                        <p id={"loading_text"}>{title}</p>
                        <input
                            id={"cancel"}
                            type={"button"}
                            value={"Stop scanning"}
                            onClick={()=>{
                                setTitle("Load Picture for Face rekognition");
                                window.location.reload();
                            }}
                        />
                    </>
                }
            </span>
               <label htmlFor={"photo_area"}>
                   <input
                       type={"file"}
                       onClick={newvalue}
                       onChange={processAndDetect}
                       id={"photo_area"}
                       accept={"image/png, image/jpeg"}
                   />
               </label>
            </div>
        </>

    )
}

export default Home;