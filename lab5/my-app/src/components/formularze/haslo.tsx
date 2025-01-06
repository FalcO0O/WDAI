import React, { useState } from 'react';

function Haslo() {
    const [haslo, setHaslo] = useState('');
    const [powtorzHaslo, setPowtorzHaslo] = useState('');

    // Logika warunkowa dla diva
    let komunikat = '';
    if (!haslo && !powtorzHaslo) {
        komunikat = 'Proszę wprowadzić hasło';
    } else if (haslo !== powtorzHaslo) {
        komunikat = 'Hasła nie są zgodne';
    }
    // jeśli są identyczne, div będzie pusty (komunikat = '')

    return (
        <div>
            <input
                type="text"
                value={haslo}
                onChange={(e) => setHaslo(e.target.value)}
            />
            <div>
                <input
                    type="text"
                    value={powtorzHaslo}
                    onChange={(e) => setPowtorzHaslo(e.target.value)}
                />
            </div>
            <div>{komunikat}</div>
        </div>
    );
}

export default Haslo;
