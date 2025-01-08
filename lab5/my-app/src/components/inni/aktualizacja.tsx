import React, { useState } from 'react';

function Aktualizacja() {
    const [product, setProduct] = useState<{ nazwa: string; cena: number }>({
        nazwa: 'Pomidor',
        cena: 50
    });

    const changePrice = () => {
        setProduct(
            (prev) => ({...prev, cena: 100
        }));
    };

    return (
        <div>
            <div>
                Aktualnie {product.nazwa} kosztuje {product.cena}
            </div>
            <button onClick={changePrice}>Zmień cenę</button>
        </div>
    );
};

export default Aktualizacja;
