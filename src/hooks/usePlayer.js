import { useState } from 'react';
import { randomTetromino } from '../tetrominos';

export const usePlayer = () => {

    //ES6 way
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
    });

    const updatePlayerPos = ({ x, y, collided }) => {
        setPlayer(prev => ({
            ...prev,
            pos: {
                x: (prev.pos.x += x),
                y: (prev.pos.y += y)
            },
        }));
    }

    const resetPlayer = () => {
        
    }

    return [player];
}