export default function processImage(event:any,callback:(arrayBuffer:ArrayBuffer)=>void) {
    new Response(event.target.files.item(0)).arrayBuffer().then(callback)
}