import React, { ChangeEvent, SyntheticEvent, useEffect, useReducer, useState } from 'react';
import './App.css';
import Trazilica from './Components/Trazilica/Trazilica';
//import Grad from './Components/Grad/Grad';
import ListaGradova from './Components/ListaGradova/ListaGradova';
import { geocodeLocation, searchGrad } from './api';
import {v4 as uuidv4} from 'uuid';
import { Hash } from 'crypto';


const MY_CONSTANT: number = 5;//ogranicenje max elemenata localstoraga ujedno ograncava i pristup


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
    //sluzi za bolje renderanje
    handleDataForSearch();
  }, [ignored]);
  

    const onClickTrazilica=(e:SyntheticEvent,itemGradPprep:ApiResponseGradovi)=>{
      //dodavanje graa iz liste gradova ispod sheacha
      //console.log(itemGradPprep.name);
      dodajElULocalStorage(itemGradPprep);

    };

    const dodajElULocalStorage=(itemGradPprep:ApiResponseGradovi)=>{
      //fja koja sprema pojedini podatak u local storage
      //prvo zelim napraviti hash od podatka kojeg cu koristiti kao key
      const objString=JSON.stringify(itemGradPprep);
      const str1:string=itemGradPprep.lat.toString();
      const str2:string=itemGradPprep.lon.toString();
      if(str1!==undefined&&str2!==undefined){
        const key=str1+str2;
        if(localStorage.length>=MY_CONSTANT)console.log('previse elemenata ograniceno na '+MY_CONSTANT);
        else if(localStorage.getItem(key)===null)localStorage.setItem(key,objString);
        else console.log("ovaj element vec postoji unutra storega nema ga potrebe dodavat");
      }
      console.log(parserUTrazenoVrijeme(vratiElIzLocalStorege()));
      
    }
    const vratiElIzLocalStorege=():ApiResponseGradovi[]=>{
      //ova funkcija vraca listu ApiResponseGradovi[] iz local storage
      const gradoviArray: ApiResponseGradovi[]=[];
      for (let key in localStorage){
        const pomStr=localStorage.getItem(key);
        if(pomStr!==null){
          gradoviArray.push(JSON.parse(pomStr))
        }
      }
      //console.log(gradoviArray);
      return gradoviArray;
    }
    const parserUTrazenoVrijeme=async(zaParsirati:ApiResponseGradovi[]):Promise<WeatherData[]>=>{
      const gradoviArrayVrijeme: WeatherData[]=[];
      for (const item of zaParsirati){
        const gradVrijeme= await searchGrad(item.lat,item.lon);
        if(gradVrijeme!==null){
          gradoviArrayVrijeme.push(gradVrijeme);
        }
      }
      return gradoviArrayVrijeme;

    }


  

    const  handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
      //fja koja update rezultat trazilice sa svakom izmjenom slova
      setSearch(e.target.value);
      forceUpdate();
    };

    const handleDataForSearch=async()=>{
      //priprema listu lokacija koja ce se prikazati ovisno o utipkanim stavrima u sherac(rezultati ispod trazilice)
      if(search===""){
        setpodatakZaPrikazUSearchz([]);
      }else{
        const podatakApia= await geocodeLocation(search);
        if(podatakApia !==null && Array.isArray(podatakApia)){
          setpodatakZaPrikazUSearchz(podatakApia);
        }else if(podatakApia===null){
          setServerError("Network Error");
          console.log("nema int");
        }else{
          console.log('Error pri dohvatu podataka, vjv ne radi interface');
        }
      }     
    };



    const onClick=async(e:SyntheticEvent)=>{
      //stisnuto je povecalo i dodaje se prvi grad koji odgovara opisu
      const podatakApia= await geocodeLocation(search);
      if(podatakApia !==null && Array.isArray(podatakApia)){
        setPodatak(podatakApia);
        console.log(podatak);
      }else if(podatakApia===null){
        setServerError("Network Error");
        console.log("nema int");
      }else{
        console.log('Error pri dohvatu podataka, vjv ne radi interface');
      }
    };

  return (
    <div className='App'>
        <span className='heading'>Prognoza</span>
        {serverError && <h1>{serverError}</h1>}
        <Trazilica onClick={onClick} search={search} handleChange={handleChange} podatak={podatakZaPrikazUSearchz} onClickTrazilica={onClickTrazilica}/>
        <ListaGradova podatak={podatak}/>
    </div>

  );
}


export default App;
