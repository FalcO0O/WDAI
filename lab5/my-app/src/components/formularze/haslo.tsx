import React, { useState } from 'react';

function Haslo() {
    const [password, setPassword] = useState('');
    const [repPassword, setRepPassword] = useState('');

    let message = '';
    if (!password && !repPassword) {
        message = 'Proszę wprowadzić hasło';
    } else if (password !== repPassword) {
        message = 'Hasła nie są zgodne';
    }

    return (
        <div>
            <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div>
                <input
                    type="text"
                    value={repPassword}
                    onChange={(e) => setRepPassword(e.target.value)}
                />
            </div>
            <div>{message}</div>
        </div>
    );
}

export default Haslo;
