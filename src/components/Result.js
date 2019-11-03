import React from 'react';
import {LF, BF, WF, RF} from './Algorithms';

const algorithms = {
    lf: LF,
    bf: BF,
    wf: WF,
    rf: RF
};

const Result = (props) => {
    const SpecificAlgorithm = algorithms[props.algorithm];
    const values = props.values;
    return (
        <SpecificAlgorithm values={values}/>
    )
};

export default Result;