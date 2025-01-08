import React from "react";
import Produkt from "./produkt";

function NowyKoszyk() {
  const products = ["Jabłko", "Gruszka", "Banan", "Pomarańcza", "Winogrona"];

  return (
    <div>
      {products.map((productName) => (
        <Produkt name={productName} />
      ))}
    </div>
  );
}

export default NowyKoszyk;
