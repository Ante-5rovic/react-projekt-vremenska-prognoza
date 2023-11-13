import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import './App.css';
import Trazilica from './Components/Trazilica/Trazilica';
//import Grad from './Components/Grad/Grad';
import ListaGradova from './Components/ListaGradova/ListaGradova';
import { geocodeLocation, searchGrad } from './api';


function App() {
  //console.log(searchGrad(''));
  //console.log(geocodeLocation("ww"));
  const[search,setSearch]=useState<string>("Zagreb");
  const[podatak,setPodatak]=useState<ApiResponseGradovi[] | undefined[]>([]);
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setSearch(e.target.value);
      console.log(e);
    };
    const onClick=async(e:SyntheticEvent)=>{
      const lud= await geocodeLocation(search);
      if(lud !==null && Array.isArray(lud)){
        setPodatak(lud);
        console.log(podatak);
      }else{
        console.log('Error pri dohvatu podataka, vjv ne radi interface');
      }
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
