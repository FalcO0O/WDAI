import React, { useState } from 'react';

function Logowanie()  {
    const [login, setlogin] = useState<string>('');
    const [haslo, setHaslo] = useState<string>('');
    const [powtorzHaslo, setPowtorzHaslo] = useState<string>('');

    const empty = !login || !haslo || !powtorzHaslo;

    const handleClick = () => {
        if (haslo !== powtorzHaslo) {
            alert('Hasła nie są zgodne');
        } else {
            alert('Zalogowano poprawnie');
        }
    };

    return (
        <div>
            <div>
                <input
                    placeholder="login"
                    value={login}
                    onChange={(e) => setlogin(e.target.value)}
                />
            </div>
            <div>
                <input
                    placeholder="hasło"
                    value={haslo}
                    onChange={(e) => setHaslo(e.target.value)}
                />
            </div>
            <div>
                <input
                    placeholder="Powtorz hasło"
                    value={powtorzHaslo}
                    onChange={(e) => setPowtorzHaslo(e.target.value)}
                />
            </div>

            <button disabled={empty} onClick={handleClick}>
                Logowanie
            </button>
        </div>
    );
}

export default Logowanie;
