import { Image, Frame, GIF } from "imagescript";
import * as fs from "fs/promises";
import { Dat } from './data.js';
import { countReset } from "console";

// function fo() {
//     return;
//     console.log("he");
// }

var buffer = await fs.readFile(Dat.baseImage);
const baseImage = await GIF.decode(buffer);

var buffer2 = await fs.readFile("netsuite.gif");
const overlayImage = await GIF.decode(buffer2);
overlayImage.resize(120, Image.RESIZE_AUTO);

console.log(`loaded: ${baseImage.width}×${baseImage.height}`);
console.log(`l: ${baseImage.length}`);

for (let i = 0; i < baseImage.length; i++) {
    const frame: Frame = baseImage[i];

    // if (i === 35) {
    //     console.log("this frame is iffy");
    //     continue;
    // }

    const sampleFrame = baseImage[0] as Image;

    const overlayOffset = getOffset(
        //sampleFrame,          // TODO none of this [0] stuff
        overlayImage[0] as Image,
        i);

    //console.log(`frame ${i}`);
    console.log(`${i}::  ${JSON.stringify(overlayOffset)}`);

    //frame.invert();

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

console.log("done");



/*export*/ function getOffset(/*base: Image,*/ overlay: Image, frame: number): {x: number, y: number} {
// export function getOffset(base: Image, overlay: Image, frame: number): {x: number, y: number} | undefined {

    const cX = overlay.width / 2;
    const cY = overlay.height / 2;

    let oyy = Dat.keyFrames[frame];
    if (!oyy) { 
        return {x: 40, y: 40}; // TODO really we just won't render this
    }

    return {
        x: oyy.x - cX,
        y: oyy.y - cY,
    };
}

function cap(base: Image, x: number, y: number) {

}