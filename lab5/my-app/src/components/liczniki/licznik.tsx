import React, { useState } from 'react';

function Licznik() {
    const [licznik, setLicznik] = useState(0);

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
