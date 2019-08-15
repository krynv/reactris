export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => // create new array based on stage height
    Array.from(Array(STAGE_HEIGHT), () => // for each row of the array, create a new array with our cells
        new Array(STAGE_WIDTH).fill([0, 'clear']) // fill them with a clean cell, no blocks have collided with this cell
    )