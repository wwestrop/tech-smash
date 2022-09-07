//import { Image, Frame, GIF } from "./node_modules/imagescript/ImageScript.js";
//import * as Imagescript from "imagescript";
//import { Image, GIF, Frame } from "https://cdn.jsdelivr.net/gh/matmen/imagescript@browser/browser/ImageScript.js";
import { Image, GIF, Frame } from "imagescript";
// import { Image, GIF } from "https://cdn.skypack.dev/imagescript";
import * as fs from 'fs/promises';
import { IAnimationParams, WindowToss } from './animationParams.js';

// const imagescript = typeof window === 'undefined'
//     ? await import("imagescript")
//     : await import("https://cdn.skypack.dev/imagescript");

// const Image = imagescript.Image;
// const GIF = imagescript.GIF;
// const Frame = imagescript.Frame;

type Point = {x: number, y: number};
type UserParams = { scale: number, xAdjust: number; yAdjust: number };



async function browserMock() {

    let x: Uint8Array | undefined;

    function loadOverlay(file: Blob) {
        var fr = new FileReader();

        fr.onload = (e) => {
            var r = fr.result;
    
            if (r instanceof ArrayBuffer) {
                x = new Uint8Array(r);
            }
            else {
                alert("Couldn't load file");
            }
        };  
    
        fr.readAsArrayBuffer(file);
        
    }

    async function smashySmashyClick() {
        if (!x) {
            alert("Please specify an image file to overlay");
            return;
        }
    
        let resultImg: any;
        const result = await create(x, null!, WindowToss);
        resultImg.src = dataHref(result);
    }
}


export async function create(overlayImage: Uint8Array, userParams: UserParams, animParams: IAnimationParams): Promise<Uint8Array> {
    
    const baseImage = await loadGif(animParams.baseImage);

    let scaledOverlayImage: Image = undefined!; //| undefined;
    let desiredScale: number | undefined; 
    
    for (let i = 0; i < baseImage.length; i++) {
        const frame: Frame = baseImage[i];
    
        desiredScale = animParams.keyFrames[i]?.scale * userParams.scale ?? desiredScale;
        if (scaledOverlayImage?.width !== desiredScale) {
            scaledOverlayImage = (await GIF.decode(overlayImage))[0];
            scaledOverlayImage.resize(desiredScale, Image.RESIZE_AUTO);
        }
    
        const sampleFrame = baseImage[0] as Image;
    
        const overlayOffset = getOffset(scaledOverlayImage, userParams, animParams, i);
        if (!overlayOffset) {
            console.log("(skip the overlay on this frame)");
            continue;
        }
    
        console.log(`${i}::  ${JSON.stringify(overlayOffset)}`);
    
        for (let j = 1; j <= scaledOverlayImage.width; j++) {
            for (let k = 1; k <= scaledOverlayImage.height; k++) {
    
                const candidatePixel = {x: overlayOffset.x + j - 1, y: overlayOffset.y + k - 1};
    
                if (candidatePixel.x < 1 || candidatePixel.x > sampleFrame.width) {
                    continue;
                }
            
                if (candidatePixel.y < 1 || candidatePixel.y > sampleFrame.height) {
                    continue;
                }
    
                const overlayPixel = scaledOverlayImage.getRGBAAt(j, k);
                if (overlayPixel[3] > 150) {
                    // TODO proper alpha blending
                    var newColour = Image.rgbToColor(overlayPixel[0], overlayPixel[1], overlayPixel[2]);
                    frame.setPixelAt(candidatePixel.x, candidatePixel.y, newColour);
                }
            }
        }
    }
    
    var encodedBuffer = await baseImage.encode(100);

    return encodedBuffer;
}






function getOffset(overlay: Image, userParams: UserParams, animParams: IAnimationParams, frame: number): Point | undefined {

    const cX = overlay.width / 2;
    const cY = overlay.height / 2;

    let oyy = animParams.keyFrames[frame];
    if (!oyy) { 
        return;     // Don't render this, or rather, leave the overlay in its last position
    }

    return {
        x: oyy.x - cX + userParams.xAdjust,
        y: oyy.y - cY + userParams.yAdjust,
    };
}

async function loadGif(filename: string) {

    var buffer = await fs.readFile(filename);
    return await GIF.decode(buffer);

    // let fileContent: Uint8Array = null!;

    // if (typeof window === 'undefined') {
    //     const fs = await import("fs/promises");
    //     fileContent = await fs.readFile(filename);
    // }
    // else {
    //     fileContent = new Uint8Array(await (await fetch(filename)).arrayBuffer());
    // }

    // // /new FileReader().readAsArrayBuffer()
    
    // return await GIF.decode(new Uint8Array(fileContent));
    // // var fr = new FileReader();

    // //     fr.onload = (e) => {
    // //         var r = fr.result;
    
    // //         if (r instanceof ArrayBuffer) {
    // //             x = new Uint8Array(r);
    // //         }
    // //         else {
    // //             alert("Couldn't load file");
    // //         }
    // //     };
    
    // //     fr.readAsArrayBuffer(file);

    // // return new Promise<GIF>((resolve, reject) => 
    // // {
    // //     try {
    // //         var fr = new FileReader();

    // //         fr.onload = (e) => {
    // //             var r = fr.result;
        
    // //             if (r instanceof ArrayBuffer) {
    // //                 x = new Uint8Array(r);
    // //             }
    // //             else {
    // //                 alert("Couldn't load file");
    // //             }
    // //         };
        
    // //         fr.readAsArrayBuffer(file);
    // //     }
    // //     catch (ex) {
    // //         reject(ex);
    // //     }
    // // });

    // // var buffer2 = await fs.readFile(filename);
    // // return await GIF.decode(buffer2);
}



function dataHref(gif: Uint8Array) {
    return "data:image/gif;base64," + Buffer.from(gif).toString('base64');
}

