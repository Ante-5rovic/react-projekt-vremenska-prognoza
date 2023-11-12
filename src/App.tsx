import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css';
import Trazilica from './Components/Trazilica/Trazilica';
//import Grad from './Components/Grad/Grad';
import ListaGradova from './Components/ListaGradova/ListaGradova';
import { searchGrad } from './api';


function App() {
  //console.log(searchGrad(''));
  const[search,setSearch]=useState<string>("Zagreb");
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setSearch(e.target.value);
      console.log(e);
    };
    const onClick=(e:SyntheticEvent)=>{
      console.log(e);
    };
  return (
    <div className='App'>
        <span className='heading'>Prognoza</span>
        <Trazilica onClick={onClick} search={search} handleChange={handleChange}/>
        <ListaGradova/>
    </div>

  );
}


export default App;
