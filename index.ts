import { GIF } from "imagescript";
import * as fs from "fs/promises";
import { Dat } from './data.js';

// function fo() {
//     return;
//     console.log("he");
// }

var buffer = await fs.readFile(Dat.baseImage);
const baseImage = await GIF.decode(buffer);

console.log(`loaded: ${baseImage.width}×${baseImage.height}`);
console.log(`l: ${baseImage.length}`);

console.log("done");