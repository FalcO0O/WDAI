import React, { useState } from 'react';

function Formularz() {
    const [text, setText] = useState('');

    const handleChange = (event: any) => {
        setText(event.target.value);
    };

    return (
        <div>
            <input type="text" value={text} onChange={handleChange} />
            <div>{text}</div>
        </div>
    );
}

export default Formularz;
