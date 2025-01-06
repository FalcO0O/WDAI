import React from "react";
import Produkt from "./produkt";

function NowyKoszyk() {
  const produkty = ["Jabłko", "Gruszka", "Banan", "Pomarańcza", "Winogrona"];

  return (
    <div>
      {produkty.map((nazwaProduktu) => (
        <Produkt nazwa={nazwaProduktu} />
      ))}
    </div>
  );
}

export default NowyKoszyk;
