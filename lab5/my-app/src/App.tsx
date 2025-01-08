import React from 'react';
import './App.css';
import Koszyk from './components/koszyk/koszyk';
import NowyKoszyk from "./components/koszyk/nowyKoszyk";
import Licznik from "./components/liczniki/licznik";
import NowyLicznik from "./components/liczniki/nowyLicznik";
import Formularz from "./components/formularze/formularz";
import Haslo from "./components/formularze/haslo";
import Logowanie from "./components/formularze/logowanie";
import Ternary from "./components/inni/ternary";
import Aktualizacja from "./components/inni/aktualizacja";
import Studenci from "./components/studenci/studenci";
import StudentManager from "./components/studenci/studentManager";
import Counter from "./components/efekty/counter";
import Tytul from "./components/efekty/tytul";
import Odliczanie from "./components/efekty/odliczanie";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Odliczanie/>
      </header>
    </div>
  );
}

export default App;
