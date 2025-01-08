import React, { useState } from 'react';

function Aktualizacja() {
    const [produkt, setProdukt] = useState<{ nazwa: string; cena: number }>({
        nazwa: 'Pomidor',
        cena: 50
    });

    const changePrice = () => {
        setProdukt(
            (prev) => ({...prev, cena: 100
        }));
    };

    return (
        <div>
            <div>
                Aktualnie {produkt.nazwa} kosztuje {produkt.cena}
            </div>
            <button onClick={changePrice}>Zmień cenę</button>
        </div>
    );
};

export default Aktualizacja;
