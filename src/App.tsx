import React, { ChangeEvent, SyntheticEvent, useEffect, useReducer, useState } from 'react';
import './App.css';
import Trazilica from './Components/Trazilica/Trazilica';
//import Grad from './Components/Grad/Grad';
import ListaGradova from './Components/ListaGradova/ListaGradova';
import { geocodeLocation } from './api';


function App() {
  //console.log(searchGrad(''));
  //console.log(geocodeLocation("ww"));
  const[search,setSearch]=useState<string>("Zagreb");
  const[podatak,setPodatak]=useState<ApiResponseGradovi[]>([]);
  const[podatakZaPrikazUSearchz,setpodatakZaPrikazUSearchz]=useState<ApiResponseGradovi[]>([]);
  const[serverError,setServerError]=useState<string|null>(null);
  const [data, setData] = useState<ApiResponseGradovi>();
  const [ignored, forceUpdate] = useReducer(x=>x+1,0);



  useEffect(() => {
    //console.log("ovo2")
    //console.log(search)
    handleDataForSearch();
    console.log(podatakZaPrikazUSearchz)
  }, [ignored]);
  




  

    const  handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setSearch(e.target.value);
      //console.log(e.target.value+" lol?????");
      forceUpdate();
      //console.log(search+" lol222")
      
      
      //dodaj sad elemente koji odgovaraj za prikaz na search baru
    };

    const handleDataForSearch=async()=>{
      if(search===""){
        setpodatakZaPrikazUSearchz([]);
      }else{
        const podatakApia= await geocodeLocation(search);
        if(podatakApia !==null && Array.isArray(podatakApia)){
          setpodatakZaPrikazUSearchz(podatakApia);
          //console.log(podatak);
        }else if(podatakApia===null){
          setServerError("Network Error");
          //console.log("nema int");
        }else{
          //console.log('Error pri dohvatu podataka, vjv ne radi interface');
        }
      }
      
    };



    const onClick=async(e:SyntheticEvent)=>{
      const podatakApia= await geocodeLocation(search);
      if(podatakApia !==null && Array.isArray(podatakApia)){
        setPodatak(podatakApia);
        console.log(podatak);
      }else if(podatakApia===null){
        //setServerError("Network Error");
        //console.log("nema int");
      }else{
        console.log('Error pri dohvatu podataka, vjv ne radi interface');
      }
    };

  return (
    <div className='App'>
        <span className='heading'>Prognoza</span>
        {serverError && <h1>{serverError}</h1>}
        <Trazilica onClick={onClick} search={search} handleChange={handleChange} podatak={podatakZaPrikazUSearchz}/>
        <ListaGradova podatak={podatak}/>
    </div>

  );
}


export default App;
