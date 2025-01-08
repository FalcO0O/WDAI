import {useEffect, useState} from "react";
import {start} from "node:repl";
import {clearInterval} from "node:timers";


function Odliczanie() {
    const [licznik, setLicznik] = useState<number>(15);
    const [buttonValue, setButtonValue] = useState<string>("Start");

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if(buttonValue === "Start")
        {
            setButtonValue("Stop");
            interval = setInterval(() => {
                setLicznik((prevCount) => prevCount - 0.1);
            }, 100);
            clearInterval(interval);
        }
        else {
            setButtonValue("Start");
            clearInterval(interval);
        }

    }, [buttonValue]);

    return (
        <div>
            <div>
                {licznik.toFixed(1)}
            </div>
            <button value = {buttonValue} onClick={() => {setButtonValue(buttonValue == "Start" ? "Stop" : "Start")}}/>
        </div>
    );
}


export default Odliczanie;


