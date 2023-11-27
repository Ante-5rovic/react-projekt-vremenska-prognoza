import React, { ChangeEvent, SyntheticEvent, useEffect, useReducer, useState } from 'react'
import { geocodeLocation, searchGrad } from '../../api';
import Trazilica from '../../Components/Trazilica/Trazilica';
import ListaGradova from '../../Components/ListaGradova/ListaGradova';
import './HomePage.css';
import { Link } from 'react-router-dom';

interface Props {}
const MY_CONSTANT: number = 8;//ogranicenje max elemenata localstoraga ujedno ograncava i pristup

const HomePage = (props: Props) => {
    interface Location {
        latitude: number | null;
        longitude: number | null;
      }
      const modal: WeatherData = {
        coord: {
          lon: 0,
          lat: 0
        },
        weather: [{description: "vedro",icon: "01n",id: 800,main: "Clear"}],
        base: '',
        main: {
          temp: 123,
          feels_like: 0,
          temp_min: 0,
          temp_max: 0,
          pressure: 0,
          humidity: 0,
          sea_level: undefined,
          grnd_level: undefined
        },
        visibility: 0,
        wind: {
          speed: 0,
          deg: 0,
          gust: undefined
        },
        clouds: {
          all: 0
        },
        dt: 0,
        sys: {
          type: 0,
          id: 0,
          country: '',
          sunrise: 0,
          sunset: 0
        },
        timezone: 0,
        id: 0,
        name: 'error',
        cod: 0
      };
      //console.log(searchGrad(''));
      //console.log(geocodeLocation("ww"));
      const[search,setSearch]=useState<string>("Zadar");
      const[podatak,setPodatak]=useState<ApiResponseGradovi[]>([]);
      const[podatakZaPrikazUSearchz,setpodatakZaPrikazUSearchz]=useState<ApiResponseGradovi[]>([]);
      const[serverError,setServerError]=useState<string|null>(null);
      const [ignored, forceUpdate] = useReducer(x=>x+1,0);
      const [ignored2, forceUpdate2] = useReducer(x=>x+1,0);
      const [ignored3, forceUpdate3] = useReducer(x=>x+1,0);
      const[podatakVremenskaPrognoza,setPodatakVremenskaPrognoza]=useState<WeatherData[]>([]);
      const[trenutnaLokacija,setTrenutnaLoakcija]=useState<WeatherData>(modal);
    
    
    
      useEffect(() => {
        //sluzi za bolje renderanje
        handleDataForSearch();
      }, [ignored]);
    
      useEffect(() => {
        //sluzi za bolje renderanje
        //console.log('uslo u reductor 2');
        setPodatakVremenskaPrognoza(vratiElIzLocalStorege());
      }, [ignored2]);
    
      useEffect(() => {
        updateLocalStorageOnRelode();
        //dohva trenutne lokacije korisnika
        //console.log('provjera');
        const getLocation = () => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async(position) => {        
                const lat=position.coords.latitude;
                const lon=position.coords.longitude;
                const trenutnaLokacijaa=await searchGrad(lat,lon);
                if(trenutnaLokacijaa!==null){
                  setTrenutnaLoakcija(trenutnaLokacijaa);
                }
                //console.log(trenutnaLokacija);
              },
    
              (error) => {
                console.error('Error getting location:', error.message);
              }
            );
          } else {
            console.error('Geolocation is not supported by this browser.');
          }
        };
    
        getLocation();
        vratiElIzLocalStorege();
      }, []);


      const updateLocalStorageOnRelode=async()=>{
        const lista:WeatherData[]=[];
        for (let key in localStorage){
          try{
            if(key!==null){
              const podatak=localStorage.getItem(key);
              if(podatak!==null){
                lista.push(JSON.parse(podatak));
              }  
            }      
          }catch{
          }
        }
        localStorage.clear();
        for(var i=0;i<lista.length;i++){
          var podatak:WeatherData;
          podatak=lista[i];
          const itemWeatherGrad=await searchGrad(podatak.coord.lat,podatak.coord.lon);
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
        }
      }
      forceUpdate2();
    }



      
      
    
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
          //console.log(vratiElIzLocalStorege());
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
          //za izbrisati nepotrebno
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
    <div className='HomePage'>
      <Link to="/" className='heading'>
        <span className='heading'>Prognoza</span>
      </Link>
        {serverError && <h1>{serverError}</h1>}
        <Trazilica onClick={onClick} search={search} handleChange={handleChange} podatak={podatakZaPrikazUSearchz} onClickTrazilica={onClickTrazilica}/>
        <ListaGradova podatak={podatakVremenskaPrognoza} onClickDelete={onClickDelete} trenutaLoakcija={trenutnaLokacija}/>
        
    </div>
  )
}

export default HomePage