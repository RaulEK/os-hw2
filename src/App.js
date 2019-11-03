import React, {useState, useEffect} from 'react';
import './App.css';
import Result from "./components/Result";


const App = () => {
    const [arrays] = useState([
        {id: 1, name: 'Esimene', value: "1,8;35,4;3,6;4,2;1,4;3,3;1,2;5,1;50,1"},
        {id: 2, name: 'Teine', value: "1,10;6,6;3,9;2,4;1,6;5,2;1,4;5,2;2,1;2,7"},
        {id: 3, name: 'Kolmas', value: "5,10;6,6;3,9;8,4;3,6;5,12;1,4;15,3;3,4;9,7"},
        {id: 4, name: 'Enda oma', value: ""}
    ]);

    // 4,5;2,7;9,2;4,6;7,1;6,4;8,8;3,6;1,10;9,2
    // for testing
    // 1,8;35,4;3,6;4,2;1,4;3,3;1,2;5,1;50,1

    const [userArray, setUserArray] = useState('');

    const [choice, setChoice] = useState('0');

    const [render, setRender] = useState(true);

    const [algorithm, setAlgorithm] = useState('lf');

    const handleUserArray = (event) => {
        setUserArray(event.target.value.trim().replace(/,{2,}/, ',').replace(/;{2,}/, ';').replace(/[^0-9,;]/, ""));
    };

    const handleChoice = (event) => {
        setChoice(event.target.value);
    };

    const handleButton = (event) => {
        setAlgorithm(event.target.value);
    };

    const start = (event) => {
        event.preventDefault();
        setRender(false);
        arrays[3].value = userArray;
    };

    useEffect(() => {
        setRender(true)
    }, [render]);

    return (
        <div>
            <h3>Vali või sisesta kuni kümneelemendiline järjend kujul 3,5;2,7;8,2;4,6;7,1;6,4;8,8;3,6;1,10;9,2</h3>
            <div>
                <form onSubmit={start}>
                    <div className="radio">

                        <label className='label'>
                            <input type="radio" value={'0'} checked={choice === '0'} onChange={handleChoice}/>
                            {arrays[0].name}
                        </label>

                        {arrays[0].value}

                    </div>

                    <div className="radio">

                        <label className='label'>
                            <input type="radio" value={'1'} checked={choice === '1'} onChange={handleChoice}/>
                            {arrays[1].name}
                        </label>

                        {arrays[1].value}

                    </div>
                    <div className="radio">

                        <label className='label'>
                            <input type="radio" value={'2'} checked={choice === '2'} onChange={handleChoice}/>
                            {arrays[2].name}{}
                        </label>

                        {arrays[2].value}

                    </div>
                    <div className="radio">
                        <label className='label'>
                            <input type="radio" value={'3'} checked={choice === '3'} onChange={handleChoice}/>
                            {arrays[3].name}
                        </label>
                        <input value={userArray} onChange={handleUserArray}/>
                    </div>
                    <h4>Vajuta nupule, et algoritm käivitada.</h4>
                    <div>
                        <button onClick={handleButton} value="lf" type="submit">Last-Fit</button>
                        <button onClick={handleButton} value="bf" type="submit">Best-Fit</button>
                        <button onClick={handleButton} value="wf" type="submit">Worst-Fit</button>
                        <button onClick={handleButton} value="rf" type="submit">Random-Fit</button>
                    </div>
                </form>
            </div>
            <div className="graph">
                {render && <Result values={arrays[parseInt(choice)].value} algorithm={algorithm}/>}
            </div>
        </div>
    );
};

export default App;
