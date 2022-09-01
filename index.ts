import { Image, Frame, GIF } from "imagescript";
import * as fs from "fs/promises";
import { AnimationParams } from './animationParams.js';
import { IAnimationParams } from './animationParams.js';


const baseImage = await loadGif(OverlayParams.baseImage);


let overlayImage: GIF | undefined;
let desiredScale: number | undefined;



for (let i = 0; i < baseImage.length; i++) {
    const frame: Frame = baseImage[i];

    desiredScale = OverlayParams.keyFrames[i]?.scale ?? desiredScale;
    if (overlayImage?.width !== desiredScale) {
        overlayImage = await loadGif("netsuite.gif")
        overlayImage.resize(desiredScale, Image.RESIZE_AUTO);
    }

    const sampleFrame = baseImage[0] as Image;

    // TODO none of this [0] stuff
    const overlayOffset = getOffset(overlayImage[0] as Image, i);
    if (!overlayOffset) {
        console.log("(skip the overlay on this frame)");
        continue;
    }

    //console.log(`frame ${i}`);
    console.log(`${i}::  ${JSON.stringify(overlayOffset)}`);

    for (let j = 1; j <= overlayImage.width; j++) {
        for (let k = 1; k <= overlayImage.height; k++) {

            const candidatePixel = {x: overlayOffset.x + j - 1, y: overlayOffset.y + k - 1};

            if (candidatePixel.x < 1 || candidatePixel.x > sampleFrame.width) {
                continue;
            }
        
            if (candidatePixel.y < 1 || candidatePixel.y > sampleFrame.height) {
                continue;
            }

            // TODO the overlay might not be a gif
            const overlayPixel = (overlayImage[0] as Frame).getPixelAt(j, k);

            //frame.setPixelAt(overlayPos.x, overlayPos.y, overlayPixel);
            frame.setPixelAt(candidatePixel.x, candidatePixel.y, overlayPixel);
        }
    }
    //frame.setPixelAt
}

var encodedBuffer = await baseImage.encode(100);
await fs.writeFile("dist/out.gif", encodedBuffer);
await fs.writeFile("dist/out.html", dataHref(encodedBuffer));


progBar(12, 34);

console.log("done");



/*export*/ function getOffset(/*base: Image,*/ overlay: Image, frame: number): {x: number, y: number} | undefined {
// export function getOffset(base: Image, overlay: Image, frame: number): {x: number, y: number} | undefined {

    const cX = overlay.width / 2;
    const cY = overlay.height / 2;

    let oyy = OverlayParams.keyFrames[frame];
    if (!oyy) { 
        return;// {x: 40, y: 40}; // TODO really we just won't render this
    }

    return {
        x: oyy.x - cX,
        y: oyy.y - cY,
    };
}

async function loadGif(filename: string) {
    var buffer2 = await fs.readFile(filename);
    return await GIF.decode(buffer2);
}

function progBar(value: number, max: number) {

    let str = "[";

    // ▒▓█

    for (let i = 0; i < max; i++) {
        //str += i <= value ? "██" : " ░";
         str += i <= value ? "█" : "░";
        //str += i <= value ? "#" : ".";
    }

    str += "]";

    console.log(str);
}

function dataHref(gif: Uint8Array) {


    return "<html><body><img src='data:image/gif;base64,"
        + Buffer.from(gif).toString('base64')
        + "' /></body></html>" 
}