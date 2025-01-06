import React from "react";
import Produkt from "./produkt";

function Koszyk() {
  return (
    <div>
      <Produkt nazwa="Jabłko" />
      <Produkt nazwa="Gruszka" />
      <Produkt nazwa="Banan" />
      <Produkt nazwa="Pomarańcza" />
      <Produkt nazwa="Winogrona" />
    </div>
  );
}

export default Koszyk;
