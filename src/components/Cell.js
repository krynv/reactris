import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

const Cell = ({ type }) => (
    <StyledCell type={type} colour={TETROMINOS[type].colour} />
)

export default React.memo(Cell); // memoise the cell component, only render the cells when they change