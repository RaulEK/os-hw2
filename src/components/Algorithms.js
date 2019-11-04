import React from 'react';
import Visualize from "./Visualize";

function inputSeparator(values) {
    values = values.split(/,|;/);
    let xValues = [];
    let yValues = [];

    for (let i = 0; i < values.length; i++) {
        if (i % 2 === 0) {
            xValues.push(parseInt(values[i]))
        } else {
            yValues.push(parseInt(values[i]))
        }
    }
    return [xValues, yValues];
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const processFits = (startX, startY, lengthX, lengthY, grid) => {
    let y = 0;

    while (y < lengthY) {
        for (let i = 0; i < lengthX; i++) {
            if (startY + y > 9 || startX + i > 49 || grid[startY + y][startX + i] !== '-') {
                return false;
            }
        }
        y++;
    }
    return true;
};

const fillGrid = (startX, startY, lengthX, lengthY, grid, processName) => {

    let y = 0;

    while (y < lengthY) {

        for (let j = 0; j < lengthX; j++) {
            grid[startY + y][startX + j] = processName;
        }
        y++;
    }

    return grid;
};

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];



const LF = (props) => {

    const input = inputSeparator(props.values);
    const inputX = input[0];
    const inputY = input[1];

    let grid = Array.from(Array(10), () => (Array.from(Array(50), () => "-")));
    const addedProcesses = [];

    for (let process = 0; process < inputX.length; process++) {

        addedProcesses[process] = {id: process + 1, name: alphabet[process], x: inputX[process], y: inputY[process], fits: true};

        let x = 0;

        for (let i = 0; i < 50; i++) {
            if (grid[process][i] !== '-') {
                if (processFits(i + 1, process, inputX[process], inputY[process], grid)) {
                    x = i + 1;
                }
            }
        }
        if (x === 0 && !processFits(x, process, inputX[process], inputY[process], grid)) {
            addedProcesses[process].fits = false;
            break;
        } else {
            grid = fillGrid(x, process, inputX[process], inputY[process], grid, alphabet[process])
        }

    }

    return (
        <div>
            <p>Last-Fit</p>
            <Visualize processes={addedProcesses} grid={grid}/>
        </div>

    )
}; // LF end

const BF = (props) => {

    const input = inputSeparator(props.values);
    const inputX = input[0];
    const inputY = input[1];

    let grid = Array.from(Array(10), () => (Array.from(Array(50), () => "-")));
    const addedProcesses = [];

    for (let process = 0; process < inputX.length; process++) {
        addedProcesses[process] = {id: process + 1, name: alphabet[process], x: inputX[process], y: inputY[process], fits: true};

        let x = 0;
        let gap = 0;

        for (let i = 0; i < 50; i++) {
            if (grid[process][i] !== '-') {
                if (processFits(i + 1, process, inputX[process], inputY[process], grid)) {

                    for (let j = i + inputX[process]; j < 50; j++) {
                        if (grid[process][j] !== '-' || j === 49) {
                            if (j - i - 1 < gap || gap === 0) {
                                gap = j - i - 1;
                                x = i + 1;
                                i = j;
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (x === 0 && !processFits(x, process, inputX[process], inputY[process], grid)) {
            addedProcesses[process].fits = false;
            break;
        } else {
            grid = fillGrid(x, process, inputX[process], inputY[process], grid, alphabet[process])
        }

    }

    return (
        <div>
            <p>Best Fit</p>
            <Visualize processes={addedProcesses} grid={grid}/>
        </div>
    )
}; // BF end

const WF = (props) => {

    const input = inputSeparator(props.values);
    const inputX = input[0];
    const inputY = input[1];

    let grid = Array.from(Array(10), () => (Array.from(Array(50), () => "-")));
    const addedProcesses = [];

    for (let process = 0; process < inputX.length; process++) {
        addedProcesses[process] = {id: process + 1, name: alphabet[process], x: inputX[process], y: inputY[process], fits: true};

        let x = 0;
        let gap = 0;

        for (let i = 0; i < 50; i++) {
            if (grid[process][i] !== '-') {
                if (processFits(i + 1, process, inputX[process], inputY[process], grid)) {

                    for (let j = i + inputX[process]; j < 50; j++) {
                        if (grid[process][j] !== '-' || j === 49) {
                            if (j - i - 1 > gap) {
                                gap = j - i - 1;
                                x = i + 1;
                                i = j;
                                break;
                            }
                        }
                    }
                }
            }
        }
        if (x === 0 && !processFits(x, process, inputX[process], inputY[process], grid)) {
            addedProcesses[process].fits = false;
            break;
        } else {
            grid = fillGrid(x, process, inputX[process], inputY[process], grid, alphabet[process])
        }

    }

    return (
        <div>
            <p>Worst Fit</p>
            <Visualize processes={addedProcesses} grid={grid}/>
        </div>
    )
}; // WF end

const RF = (props) => {

    const input = inputSeparator(props.values);
    const inputX = input[0];
    const inputY = input[1];

    let grid = Array.from(Array(10), () => (Array.from(Array(50), () => "-")));
    const addedProcesses = [];

    for (let process = 0; process < inputX.length; process++) {
        addedProcesses[process] = {id: process + 1, name: alphabet[process], x: inputX[process], y: inputY[process], fits: true};

        let x = [];

        for (let i = 0; i < 50; i++) {
            if (grid[process][i] !== '-') {
                if (processFits(i + 1, process, inputX[process], inputY[process], grid)) {
                    x.push(i + 1);
                    i += inputX[process];
                }
            }
        }
        if (x.length === 0) {
            if (!processFits(0, process, inputX[process], inputY[process], grid)) {
                addedProcesses[process].fits = false;
                break;
            } else {
                grid = fillGrid(0, process, inputX[process], inputY[process], grid, alphabet[process])
            }
        } else {
            const random = getRandomInteger(0, x.length);
            grid = fillGrid(x[random], process, inputX[process], inputY[process], grid, alphabet[process])
        }
    }

    return (
        <div>
            <p>Random Fit</p>
            <Visualize processes={addedProcesses} grid={grid}/>
        </div>
    )
}; // RF end

export {
    LF,
    BF,
    WF,
    RF
};