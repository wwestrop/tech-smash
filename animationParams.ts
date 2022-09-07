export interface IAnimationParams {
    baseImage: string,
    keyFrames: {x: number, y: number, scale: number}[]
}

export const WindowToss: IAnimationParams = {
    baseImage: "8ea06168f7219ede44c68dac8ed5cbef.gif",
    keyFrames: [
        {x: 260, y: 200, scale: 120},
        {x: 260, y: 190, scale: 120},
        {x: 255, y: 184, scale: 120},
        {x: 250, y: 170, scale: 120},
        {x: 245, y: 158, scale: 120},
        {x: 247, y: 146, scale: 120},
        {x: 259, y: 132, scale: 110},
        {x: 259, y: 132, scale: 110},
        {x: 254, y: 134, scale: 110},       // back face of computer
        {x: 248, y: 143, scale: 110},
        {x: 212, y: 138, scale: 110},      // 11
        {x: 192, y: 130, scale: 110},
        {x: 178, y: 127, scale: 110},
        {x: 160, y: 119, scale: 110},
        {x: 154, y: 114, scale: 110},     // far apex of the swing? (smaller scale??)
        {x: 149, y: 120, scale: 110},
        {x: 150, y: 131, scale: 110},
        {x: 167, y: 138, scale: 110},
        {x: 182, y: 144, scale: 110},       // powering up the swing (on the way out the window)
        {x: 209, y: 142, scale: 110},       // really smaller now?
        {x: 269, y: 132, scale: 100},  // 21       // just going out the window now (smaller)
        {x: 293, y: 128, scale: 100},
        {x: 116, y: 160, scale: 65},       // outside - intact window
        {x: 149, y: 147, scale: 75},        // outside - smashing window (scale up = burst through)
        {x: 227, y: 175, scale: 75},
        {x: 256, y: 191, scale: 75},
        {x: 318, y: 235, scale: 75},
        {x: 348, y: 264, scale: 75},
        {x: 211, y: 68,  scale: 35},     // wide shot of building
        {x: 231, y: 96,  scale: 35},
        {x: 248, y: 117, scale: 35},  // 31
        {x: 264, y: 145, scale: 35},
        {x: 273, y: 163, scale: 35},
        {x: -999, y: -999, scale: 35},           // CLOSE UP OF GROUND (computer not in shot)
        {x: 299, y: 117, scale: 100},
        {x: 327, y: 221, scale: 96},
        {x: 341, y: 217, scale: 94},
        {x: 366, y: 199, scale: 92},
        {x: 369, y: 201, scale: 88},
        {x: 357, y: 214, scale: 85},
        {x: 369, y: 210, scale: 80},
    ]
};