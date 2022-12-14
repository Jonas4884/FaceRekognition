import AWS, {AWSError, Rekognition} from "aws-sdk";



const awsprocess : (imageData: ArrayBuffer,
                    file: File, callback: (err: AWSError, data: Rekognition.DetectFacesResponse) => void)
    => void = (imageData,
               file,
               callback) =>
{
    let rekognition = new AWS.Rekognition();
    let params = {
        Image: {
            Bytes: imageData
        },
        Attributes: [
            'ALL',
        ]
    };
    rekognition.detectFaces(params, callback);
}
export default awsprocess;