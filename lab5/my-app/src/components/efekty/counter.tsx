import React, {useEffect, useState} from 'react';

function Licznik() {
    const [licznik, setLicznik] = useState(0);

    useEffect(() => {
        console.log("licznik zwiekszyl sie do " + licznik);
    }, [licznik]);

    useEffect(() => {
        console.log("hello world");
    });

    const zwieksz = () => {
        setLicznik(licznik + 1);
    };

    return (
        <div>
            <div>Aktualny stan licznika: {licznik}</div>
            <button onClick={zwieksz}>Dodaj</button>
        </div>
    );
}

export default Licznik;
