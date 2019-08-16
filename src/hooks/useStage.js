import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {

    // create a clean board for us to use
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {

        setRowsCleared(0);


        // implicit return, we don't need braces
        const sweepRows = newStage =>
            newStage.reduce((ack, row) => {

                // if we find a matching row to be cleared (check if we find a 0 value) - if the entire row has been filled with blocks
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1);

                    // add new value to array, at the beginning of the array (removing the old one)
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear'])); // create a new array and fill it with an empty array
                    return ack;
                }

                ack.push(row);
                return ack;

            }, []); // give it an empty array to begin with


        const updateStage = prevStage => {
            // clear the state
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // draw our shape
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            // check if we've hit something below
            if (player.collided) {
                resetPlayer();

                // this will return any new rows, already checking if we have any rows to be cleared
                return sweepRows(newStage);
            }

            return newStage;
        };

        setStage(prev => updateStage(prev));

    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
};