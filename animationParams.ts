export interface IAnimationParams {
    baseImage: string,
    keyFrames: {x: number, y: number, scale: number}[]
}

export const WindowToss: IAnimationParams = {
    baseImage: "8ea06168f7219ede44c68dac8ed5cbef.gif",
    keyFrames: [
        {x: 260, y: 211, scale: 84},
        {x: 260, y: 201, scale: 84},
        {x: 255, y: 195, scale: 84},
        {x: 250, y: 181, scale: 84},
        {x: 245, y: 169, scale: 84},
        {x: 247, y: 157, scale: 84},
        {x: 259, y: 143, scale: 77},
        {x: 259, y: 143, scale: 77},
        {x: 254, y: 145, scale: 77},       // back face of computer
        {x: 248, y: 154, scale: 77},
        {x: 212, y: 149, scale: 77},      // 11
        {x: 192, y: 141, scale: 77},
        {x: 178, y: 138, scale: 77},
        {x: 160, y: 130, scale: 77},
        {x: 154, y: 125, scale: 77},     // far apex of the swing? (smaller scale??)
        {x: 149, y: 131, scale: 77},
        {x: 150, y: 142, scale: 77},
        {x: 167, y: 149, scale: 77},
        {x: 182, y: 155, scale: 77},       // powering up the swing (on the way out the window)
        {x: 209, y: 153, scale: 77},       // really smaller now?
        {x: 269, y: 143, scale: 70},  // 21       // just going out the window now (smaller)
        {x: 293, y: 139, scale: 70},
        {x: 116, y: 171, scale: 45},       // outside - intact window
        {x: 149, y: 158, scale: 52},        // outside - smashing window (scale up = burst through)
        {x: 227, y: 186, scale: 52},
        {x: 256, y: 202, scale: 52},
        {x: 318, y: 246, scale: 52},
        {x: 348, y: 275, scale: 52},
        {x: 211, y: 79,  scale: 25},     // wide shot of building
        {x: 231, y: 107,  scale: 25},
        {x: 248, y: 128, scale: 25},  // 31
        {x: 264, y: 156, scale: 25},
        {x: 273, y: 174, scale: 25},
        {x: -999, y: -999, scale: 25},           // CLOSE UP OF GROUND (computer not in shot)
        {x: 299, y: 128, scale: 70},
        {x: 327, y: 232, scale: 67},
        {x: 341, y: 228, scale: 65},
        {x: 366, y: 210, scale: 65},
        {x: 369, y: 212, scale: 62},
        {x: 357, y: 225, scale: 60},
        {x: 369, y: 221, scale: 56},
    ]
};