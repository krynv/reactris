import { useState } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = () => {

    //create a clean board for us
    const [stage, setStage] = useState(createStage());

    return [stage, setStage];
}