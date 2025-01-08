import {useEffect, useState} from "react";

function Odliczanie() {
    const [licznik, setLicznik] = useState<number>(5);
    const [buttonState, setButtonState] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>('');
    const [buttonDisability, setButtonDisability] = useState<boolean>(false);

    let interval: NodeJS.Timeout | undefined;

    useEffect(() => {
        if(buttonState)
        {
            setButtonText("Stop");
            interval = setInterval(() => {
                setLicznik((prevCount) => prevCount - 0.1);
                if(licznik <= 0)
                {
                    setButtonText("Odliczanie zakończone")
                    setButtonDisability(true);
                    setLicznik(0);
                    clearInterval(interval);
                }
            }, 100);
        }
        else {
            setButtonText("Start");
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [buttonState]);

    return (
        <div>
            <div>
                {licznik.toFixed(1)}
            </div>
            <button disabled={buttonDisability} onClick={() => {setButtonState(!buttonState)}}>{buttonText}</button>
        </div>
    );
}


export default Odliczanie;


