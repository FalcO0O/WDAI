import React from "react";
import Produkt from "./produkt";

function Koszyk() {
  return (
    <div>
      <Produkt name="Jabłko" />
      <Produkt name="Gruszka" />
      <Produkt name="Banan" />
      <Produkt name="Pomarańcza" />
      <Produkt name="Winogrona" />
    </div>
  );
}

export default Koszyk;
