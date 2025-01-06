import React, { useState } from 'react';
import Przycisk from './przycisk'

function NowyLicznik() {
  const [licznik, setLicznik] = useState(0);

  const zwieksz = () => {
    setLicznik((prev) => prev + 1);
  };

  return (
    <div>
      <div>Aktualny stan licznika: {licznik}</div>
      <Przycisk onZwieksz={zwieksz} />
    </div>
  );
};

export default NowyLicznik;
