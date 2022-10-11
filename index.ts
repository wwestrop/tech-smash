import yargs from "yargs";
import * as fs from 'fs/promises';
import { WindowToss } from "./animationParams.js";
import { create, UserParams } from "./smash.js";
import path from "path";


await main();

async function main() {

    const args = await getArgs();

    const overlayImage = await fs.readFile(args.input);

    const u: UserParams = {
        scale: args.scale,
        xAdjust: args.x,
        yAdjust: args.y,
        speed: args.speed
    };

    const encodedBuffer = await create(overlayImage, u, WindowToss);

    const outName = args.output ?? `chuck-${path.parse(args.input).name}.gif`;
    await fs.writeFile(outName, encodedBuffer);

    console.log(`\n  ===> Wrote ${outName}`);
}

async function getArgs(): Promise<MyArgs> {
    return await yargs(process.argv.slice(2))
        .options({
            input: { type: 'string', demandOption: true, alias: "i", describe: "File containing an image to be overlaid. Supported types: GIF" },
            scale: { type: 'string', alias: "s", default: 1.0, describe: "Factor to scale the overlaid image, if fine-tuning is required" },
            x: { type: 'number', default: 0, describe: "X offset for the overlaid image, if fine-tuning is required" },
            y: { type: 'number', default: 0, describe: "Y offset for the overlaid image, if fine-tuning is required" },
            output: { type: 'string', alias: "o", describe: "File to write the output" },
            speed: { type: 'number', default: 1, describe: "Speed of the output, where 1.0 is the same speed as the input" },
        })
        .parseAsync();
}

type MyArgs = {
    input: string,
    scale: number,
    x: number,
    y: number;
    output: string | undefined,
    speed: number,
};