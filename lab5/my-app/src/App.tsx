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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Studenci/>
      </header>
    </div>
  );
}

export default App;
