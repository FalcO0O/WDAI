import React from 'react';

function Ternary() {
    const a = true;
    const b = false;

    return (
        <div>
            <div>Swierdzenie a jest {a ? "prawdziwe" : "fałszywe"}</div>
            <div>Swierdzenie b jest {b ? "prawdziwe" : "fałszywe"}</div>
        </div>
    );
};

export default Ternary;
