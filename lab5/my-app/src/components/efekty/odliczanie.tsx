import {useEffect, useState} from "react";

function Odliczanie() {
    const [licznik, setLicznik] = useState<number>(15);
    const [buttonState, setButtonState] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>('');
    const [buttonDisability, setButtonDisability] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;

        if (buttonState) {
            setButtonText("Stop");
            interval = setInterval(() => {
                setLicznik((prevCount) => {
                    const newValue = prevCount - 0.1;
                    if (newValue <= 0) {
                        clearInterval(interval);
                        setButtonText("Odliczanie zakończone");
                        setButtonDisability(true);
                        return 0;
                    }
                    return newValue;
                });
            }, 100);
        } else {
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


