//import { Image, GIF, Frame } from "imagescript/v2";
import { Image, decode, Frame, GIF } from "imagescript";
import * as fs from 'fs/promises';
import { IAnimationParams } from './animationParams.js';


type Point = {x: number, y: number};
export type UserParams = { scale: number, xAdjust: number; yAdjust: number, speed: number };


export async function create(overlayImage: Uint8Array, userParams: UserParams, animParams: IAnimationParams): Promise<Uint8Array> {

    console.log("Working....");

    const baseImage = await loadGif(animParams.baseImage);

    let scaledOverlayImage: Image = undefined!; //| undefined;
    let desiredScale: number | undefined;

    for (let i = 0; i < baseImage.length; i++) {
        const frame: Frame = baseImage[i];
        (<any>frame).duration = getFrameDuration(frame, userParams);

        desiredScale = animParams.keyFrames[i]?.scale * userParams.scale ?? desiredScale;
        if (scaledOverlayImage?.width !== desiredScale) {
            scaledOverlayImage = await decodeImage(overlayImage);
            scaledOverlayImage.resize(desiredScale, Image.RESIZE_AUTO);
        }

        const sampleFrame = baseImage[0] as Image;

        const overlayOffset = getOffset(scaledOverlayImage, userParams, animParams, i);
        if (!overlayOffset) {
            // skip the overlay on this frame
            continue;
        }

        progBar(i, baseImage.length);

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
                    const newColour = Image.rgbToColor(overlayPixel[0], overlayPixel[1], overlayPixel[2]);
                    frame.setPixelAt(candidatePixel.x, candidatePixel.y, newColour);
                }
            }
        }
    }

    return await baseImage.encode(100);
}


function getFrameDuration(frame: Frame, userParams: UserParams): number {
    const speed = userParams.speed === 0 ? 1 : userParams.speed;
    const frameTime = (<any>frame).duration / speed;

    // most browsers only support 50fps GIFs (frame time = 20ms)
    return Math.max(20, frameTime);
}


async function decodeImage(imageData: Uint8Array): Promise<Image> {
    var result = await decode(imageData, true);
    if (result instanceof GIF) {
        return result[0];
    }
    else {
        return result;
    }
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

async function loadGif(filename: string): Promise<GIF> {

    const buffer = await fs.readFile(filename);
    return await GIF.decode(buffer);
}


let i: number = 0;
function spinnySuffix() {
    const chars = ["/", "-", "\\", "|"];
    i = i >= chars.length ? 0 : i;

    return " " + chars[i++];
}


let isOne = true;
function progBar(value: number, max: number) {

    let str = "[";
    for (let i = 0; i < max; i++) {
        str += i <= value ? "???" : "???";
    }
    str += "]" + spinnySuffix();

    if (!isOne) {
        for (let i = 0; i < str.length; i++) {
            process.stdout.write("\b");
        }
    }

    isOne = false;

    process.stdout.write(str);
}