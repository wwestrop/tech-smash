import * as fs from "fs/promises";
import { WindowToss } from './animationParams.js';
import { create } from "./smash.js";


type UserParams = { scale: number, xAdjust: number; yAdjust: number };


await main();

async function main() {
    const overlayImage = await fs.readFile("netsuite.gif");

    const u: UserParams = {
        scale: 1.1,
        xAdjust: 0,
        yAdjust: 0,
    };

    const encodedBuffer = await create(overlayImage, u, WindowToss);

    await fs.writeFile("dist/out.gif", encodedBuffer);
    await fs.writeFile("dist/out.html", htmlFile(encodedBuffer));

    progBar(12, 34);
    console.log("done");
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


function htmlFile(gif: Uint8Array) {
    return "<html><body><img src='data:image/gif;base64,"
        + Buffer.from(gif).toString('base64')
        + "' /></body></html>"
}