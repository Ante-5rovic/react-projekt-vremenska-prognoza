import React from 'react';
import './App.css';
import Trazilica from './Components/Trazilica';
//import Grad from './Components/Grad/Grad';
import ListaGradova from './Components/ListaGradova/ListaGradova';
function App() {
  return (
    <div className='App'>
        <span className='heading'>Prognoza</span>
        <Trazilica/>
        <ListaGradova/>
    </div>

  );
}


export default App;
