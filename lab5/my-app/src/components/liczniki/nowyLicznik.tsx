import React, { useState } from 'react';
import Przycisk from './przycisk'

function NowyLicznik() {
  const [licznik, setLicznik] = useState(0);

  const add = () => {
    setLicznik((prev) => prev + 1);
  };

  return (
    <div>
      <div>Aktualny stan licznika: {licznik}</div>
      <Przycisk onAdd={add} />
    </div>
  );
};

export default NowyLicznik;
