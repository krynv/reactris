import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = rowsCleared => {

    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    // original tetris game scores: one row clearned, two rows cleared ..
    const linePoints = [40, 100, 300, 1200];

    // make sure we don't go into an infinite loop
    const calcScore = useCallback(() => {

        // we should calculate a score if we have cleared a score
        if (rowsCleared > 0) {
            // og tetris forumla
            setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
            setRows(prev => prev + rowsCleared);
        }
    }, [level, linePoints, rowsCleared]); // will not go into an infinity loop because this method will only get triggered when any of these values change


    useEffect(() => {
        calcScore();
    }, [calcScore, rowsCleared, score])

    return [score, setScore, rows, setRows, level, setLevel];
};