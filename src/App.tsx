import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import './App.css';
import Trazilica from './Components/Trazilica/Trazilica';
//import Grad from './Components/Grad/Grad';
import ListaGradova from './Components/ListaGradova/ListaGradova';
import { geocodeLocation, searchGrad } from './api';


function App() {
  //console.log(searchGrad(''));
  //console.log(geocodeLocation("ww"));
  const[search,setSearch]=useState<string>("Zagreb");
  const[podatak,setPodatak]=useState<ApiResponseGradovi[]>([]);
  const[serverError,setServerError]=useState<string|null>(null);
  const [data, setData] = useState<ApiResponseGradovi>();

  useEffect(() => {
    const storedData = localStorage.getItem('myData');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const updateData = (newData:ApiResponseGradovi) => {
    //setData(newData);
    localStorage.setItem('myData', JSON.stringify(newData));
  };




  const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setSearch(e.target.value);
      console.log(e);
    };
    const onClick=async(e:SyntheticEvent)=>{
      const podatakApia= await geocodeLocation(search);
      if(podatakApia !==null && Array.isArray(podatakApia)){
        setPodatak(podatakApia);
        console.log(podatak);
      }else if(podatakApia===null){
        setServerError("Network Error");
        //console.log("nema int");
      }else{
        console.log('Error pri dohvatu podataka, vjv ne radi interface');
      }
    };
  return (
    <div className='App'>
        <span className='heading'>Prognoza</span>
        {serverError && <h1>{serverError}</h1>}
        <Trazilica onClick={onClick} search={search} handleChange={handleChange}/>
        <ListaGradova podatak={podatak}/>
    </div>

  );
}


export default App;
