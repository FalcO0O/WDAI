import React, {useEffect, useState} from 'react';

function Licznik() {
    const [licznik, setLicznik] = useState<number>(() => {
        const savedValue = localStorage.getItem('Licznik');
        return savedValue !== null ? parseInt(savedValue) : 0;
    });

    useEffect(() => {
        localStorage.setItem('Licznik', licznik.toString());
    }, [licznik]);

    const add = () => {
        setLicznik(licznik + 1);
    };

    return (
        <div>
            <div>Aktualny stan licznika: {licznik}</div>
            <button onClick={add}>Dodaj</button>
        </div>
    );
}

export default Licznik;
