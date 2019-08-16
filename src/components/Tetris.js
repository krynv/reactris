import React, { useState } from 'react';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

import { createStage, checkCollision } from '../gameHelpers';
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';


const Tetris = () => {

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false); // not game over when we start the game

    const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);

    console.log('re-render');


    const movePlayer = dir => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0 });
        }
    }

    const startGame = () => {
        console.log("test")
        // reset game
        setStage(createStage());
        setDropTime(1000); // 1 second
        resetPlayer();
        setGameOver(false);
    }

    const drop = () => {
        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false })
        } else {
            // game over
            if (player.pos.y < 1) {
                console.log("GAME OVER");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    }

    const keyUp = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 40) { // down key
                console.log(`interval on`);
                setDropTime(1000);
            }
        }
    }

    const dropPlayer = () => {
        console.log(`interval off`);
        // stop interval when player pressed the down key
        setDropTime(null);
        drop();
    }

    const move = ({ keyCode }) => {
        if (!gameOver) {
            if (keyCode === 37) { // left arrow
                movePlayer(-1); // move to the left
            }
            else if (keyCode === 39) { // right arrow
                movePlayer(1); // move to the left
            }
            else if (keyCode === 40) { // down arrow
                dropPlayer(); // drop the block
            }
            else if (keyCode === 38) { // up arrow - for rotate
                playerRotate(stage, 1); // rotate the shape clockwise
            }
        }
    }


    useInterval(() => {
        drop();
    }, dropTime)

    return (
        // making it so that we can use keys everywhere otherwise it will mean that we will have to click on the screen to move with arrow keys
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
            <StyledTetris>
                <Stage stage={stage} />
                <aside>
                    {gameOver ? (
                        <Display gameOver={gameOver} text="Game Over" />
                    ) : (
                            <div>
                                <Display text="Score" />
                                <Display text="Rows" />
                                <Display text="Level" />
                            </div>
                        )}
                    <StartButton callback={startGame} />
                </aside>
            </StyledTetris>
        </StyledTetrisWrapper >
    );
};

export default Tetris;