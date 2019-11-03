import React from 'react';

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

class Visualize extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            processes: props.processes,
            grid: props.grid
        };

    }


    componentDidMount() {
        const colors = ['Green', 'Red', 'OrangeRed', 'LightSeaGreen', 'Gold', 'Aqua', 'Olive', 'HotPink', 'RoyalBlue', 'Maroon'];
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext('2d');

        console.log(this.state.processes);

        ctx.font = '14px Comic Sans Mr';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'bottom';
        ctx.fillText("Etapp", 0, 20);
        ctx.fillText("Lisatud protsess", 50, 20);
        for (let i = 0; i < 50; i++) {
            ctx.fillText(i, i * 20 + 150, 20);
        }
        for (let i = 0; i < this.state.grid.length; i++) {
            if (this.state.processes.length > i) {
                const description = this.state.processes[i].name + " : " + this.state.processes[i].x + "," + this.state.processes[i].y;
                ctx.fillText(i + 1, 0, i * 20 + 40);
                ctx.fillText(description, 50, i * 20 + 40);
            }
            if (this.state.processes.length - 1 === i && this.state.processes[this.state.processes.length - 1].fits === false) {
                ctx.fillStyle = 'black';
                for (let j = 0; j < this.state.grid[i].length; j++) {
                    ctx.beginPath();
                    ctx.rect(j * 20 + 145, i * 20 + 25, 20, 20);
                    ctx.stroke();
                    ctx.fill()
                }
                ctx.fillStyle = 'white';
                ctx.fillText('Protsess ei mahu mällu', 600, i * 20 + 40);
            } else {
                for (let j = 0; j < this.state.grid[i].length; j++) {
                    ctx.beginPath();
                    ctx.rect(j * 20 + 145, i * 20 + 25, 20, 20);
                    ctx.stroke();
                    if (this.state.grid[i][j] !== '-') {
                        ctx.fillStyle = colors[this.state.processes.find(x => x.name === this.state.grid[i][j]).id - 1];
                    } else {
                        ctx.fillStyle = '#D3D3D3';
                    }
                    ctx.fill();
                    ctx.fillStyle = 'black';
                    ctx.fillText(this.state.grid[i][j], j * 20 + 150, i * 20 + 40)

                }
            }
        }
    }


render()
{
    return (
        <div>
            <canvas ref="canvas" width={1500} height={230}></canvas>
        </div>
    )
}
;
}


export default Visualize;