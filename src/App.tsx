import React, { ChangeEvent, SyntheticEvent, useEffect, useReducer, useState } from 'react';
import './App.css';
import Trazilica from './Components/Trazilica/Trazilica';
//import Grad from './Components/Grad/Grad';
import ListaGradova from './Components/ListaGradova/ListaGradova';
import { geocodeLocation, searchGrad } from './api';
import FloatingWidget from './Components/FloatingWidget/FloatingWidget';



const MY_CONSTANT: number = 8;//ogranicenje max elemenata localstoraga ujedno ograncava i pristup


function App() {
  //console.log(searchGrad(''));
  //console.log(geocodeLocation("ww"));
  const[search,setSearch]=useState<string>("Zagreb");
  const[podatak,setPodatak]=useState<ApiResponseGradovi[]>([]);
  const[podatakZaPrikazUSearchz,setpodatakZaPrikazUSearchz]=useState<ApiResponseGradovi[]>([]);
  const[serverError,setServerError]=useState<string|null>(null);
  const [ignored, forceUpdate] = useReducer(x=>x+1,0);
  const [ignored2, forceUpdate2] = useReducer(x=>x+1,0);
  const[podatakVremenskaPrognoza,setPodatakVremenskaPrognoza]=useState<WeatherData[]>([]);



  useEffect(() => {
    //sluzi za bolje renderanje
    handleDataForSearch();
  }, [ignored]);

  useEffect(() => {
    //sluzi za bolje renderanje
    //console.log('uslo u reductor 2');
    setPodatakVremenskaPrognoza(vratiElIzLocalStorege());
  }, [ignored2]);
  
  

    const onClickTrazilica=async(e:SyntheticEvent,itemGradPprep:ApiResponseGradovi)=>{
      //dodavanje graa iz liste gradova ispod sheacha
      //console.log(itemGradPprep.name);
      dodajElULocalStorage(itemGradPprep);
      //forceUpdate2();

    };

    const dodajElULocalStorage=async(itemGradPprep:ApiResponseGradovi)=>{
      //fja koja sprema pojedini podatak u local storage
      //prvo zelim napraviti hash od podatka kojeg cu koristiti kao key
      const itemWeatherGrad=await searchGrad(itemGradPprep.lat,itemGradPprep.lon);
      if(itemWeatherGrad!==null){
        const objString=JSON.stringify(itemWeatherGrad);
        const str1:string=itemWeatherGrad.coord.lat.toString();
        const str2:string=itemWeatherGrad.coord.lon.toString();
        if(str1!==undefined&&str2!==undefined){
        const key=str1+str2;
        if(localStorage.length>=MY_CONSTANT)console.log('previse elemenata ograniceno na '+MY_CONSTANT);
        else if(localStorage.getItem(key)===null)localStorage.setItem(key,objString);
        else console.log("ovaj element vec postoji unutra storega nema ga potrebe dodavat");
      }
      console.log(vratiElIzLocalStorege());
      forceUpdate2();

      }
      
      
      
    }
    const vratiElIzLocalStorege=():WeatherData[]=>{
      //ova funkcija vraca listu ApiResponseGradovi[] iz local storage
      const gradoviArray: WeatherData[]=[];
      for (let key in localStorage){
        const pomStr=localStorage.getItem(key);
        if(pomStr!==null){
          if(pomStr.includes('{')&&pomStr.includes('}')){
            try{
              gradoviArray.push(JSON.parse(pomStr));
            }catch(error){
              console.log("nije ispravan tip ajde dalje: "+error);//ugl apk kad se pokrece ponovo nekad stavi neke scoje podatke u local storage
              //u buduce popraviti i staviti provjeru tip ===ApiResponseGradovi
              //TO DO
            }
          }else{
            localStorage.removeItem(key);
          }  
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
        dodajElULocalStorage(podatakApia[0]);
        setPodatakVremenskaPrognoza(vratiElIzLocalStorege());
        //forceUpdate2();
        console.log(podatak);
      }else if(podatakApia===null){
        setServerError("Network Error");
        console.log("nema int");
      }else{
        console.log('Error pri dohvatu podataka, vjv ne radi interface');
      }
    };

    const onClickDelete=async(e:SyntheticEvent,kljuc:string)=>{
      //brisanje podatka iz local storega
      if(localStorage.getItem(kljuc)!==null){
        localStorage.removeItem(kljuc);
        forceUpdate2();
      }
      //console.log(kljuc);
    };

  return (
    <div className='App'>
        <span className='heading'>Prognoza</span>
        {serverError && <h1>{serverError}</h1>}
        <Trazilica onClick={onClick} search={search} handleChange={handleChange} podatak={podatakZaPrikazUSearchz} onClickTrazilica={onClickTrazilica}/>
        <ListaGradova podatak={podatakVremenskaPrognoza} onClickDelete={onClickDelete}/>
        <FloatingWidget/>
    </div>

  );
}


export default App;
