import React, { useEffect, useReducer, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { search5DaysWeather, searchWeatherHistory } from '../../api'
import Graf from '../../Components/Graf/Graf';
import "./GrafPage.css"
import Select from 'react-select';
import { InputActionMeta } from 'react-select/dist/declarations/src';

interface Props  {
  
}
interface Podaci{
  [key: string]: string|undefined;
  podatak1:string|undefined;
  podatak2:string|undefined;
  
}


const GrafPage = (props: Props) => {
  
  
  const model1:City={
    id: 0,
    name: '',
    coord: {
      lat: 0,
      lon: 0
    },
    country: '',
    population: 0,
    timezone: 0,
    sunrise: 0,
    sunset: 0
  }
  const modal: WeatherDataFor5Days = {
    cod: '',
    message: 0,
    cnt: 0,
    list: [],
    city: model1
  }
  const model2: WeatherDataHistory = {
    message: "e",
    cod: "zen",
    city_id: 4887398,
    calctime: 0.0863,
    cnt: 4,
    list: [
      {
        main: {
          temp: 268.987,
          temp_min: 268.987,
          temp_max: 268.987,
          pressure: 1001.11,
          sea_level: 1024.68,
          grnd_level: 1001.11,
          humidity: 100,
        },
        wind: {
          speed: 5.06,
          deg: 291.002,
        },
        clouds: {
          all: 48,
        },
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
        dt: 1485703465,
      },
      // ... other WeatherItems
    ],
  };


  
  const {podatak1,podatak2}=useParams<Podaci>();
  const[prognoza,setPrognoza]=useState<WeatherDataFor5Days>(modal);
  //const[prognozaHistory,setPrognozaHistory]=useState<WeatherDataHistory>();
  const [ignored, forceUpdate] = useReducer(x=>x+1,0);
  const[vremenskiInterval,setVremenskiInterval]=useState<number>(3);
  const[vrstaPodatak,setVrstaPodataka]=useState<string>("Temperatura");
  const[vrstaPodatakZaNaslov,setVrstaPodatakaZaNaslov]=useState<string>("Temperatura");
  //search5DaysWeather
  useEffect(() => {
    //poziv apija odma u startu
    console.log(podatak1,podatak2);
    pripremaPodatakaPrognoze();
  }, []);

  useEffect(() => {
    
    
  }, [ignored]);

  const pripremaPodatakaPrognoze=async()=>{
    if(podatak1!==undefined&&podatak2!==undefined){
      let lat:number;
      let lon:number;
      try{
        lat=parseFloat(podatak1);
        lon=parseFloat(podatak2);
        const podatakApia= await search5DaysWeather(lat,lon);
        //const date=new Date();
        //const podatakApiaHistory=await searchWeatherHistory(lat,lon,Math.floor(date.getTime() / 1000));
          //console.log(podatakApia);
          if(podatakApia !==null){
            setPrognoza(podatakApia);
            //forceUpdate2();
            console.log(podatakApia);
          }else if(podatakApia===null){
            //setServerError("Network Error");
            console.log("nema int");
          }else{
            console.log('Error pri dohvatu podataka, vjv ne radi interface');
          }
      }catch(e){
        console.log("lat ili long nisu u ispravnom obliku");
      }
    }else{
      console.log("lat ili lon su undefined");
    }   
  }
  const optionsIntervali = [
    { value: 1, label: '3 h' },
    { value: 2, label: '6 h' },
    { value: 3, label: '9 h' },
    { value: 4, label: '12 h' },
    { value: 8, label: '24 h' },
  ]
  const optionsVrsta = [
    { value: "Temperatura", label: 'Temperatura' },
    { value: "Tlak", label: 'Tlak' },
    { value: "Naoblaka", label: 'Naoblaka' },
    { value: "Vlaga", label: 'Vlaga' },
    
  ]







  return (
    
    <div className='graf_conteiner'>
      <Link to="/" className='heading'>
        <span className='heading'>{prognoza.city.name}</span>
      </Link>
      <h2 className='naslov_grafa'>
        {vrstaPodatakZaNaslov}/{vremenskiInterval*3}h
      </h2>
      <div className='graf_prikaz'>
      <Graf listaPodataka={prognoza.list} interval={vremenskiInterval} tipGrafa={vrstaPodatak}/>
      </div>
      <Select id="dropdown" options={optionsIntervali} onChange={(selectedOption) =>{
        if(selectedOption?.value!==undefined){setVremenskiInterval(selectedOption.value);forceUpdate();}}}
      placeholder="Interva Prikaza" className='select'/>
      <Select id="dropdown" options={optionsVrsta} onChange={(selectedOption) => {
       if(selectedOption?.value!==undefined){setVrstaPodataka(selectedOption.value);forceUpdate();setVrstaPodatakaZaNaslov(selectedOption.label)}}}
      placeholder="Interva Prikaza" className='select'/>
      
    </div>
  )
}

export default GrafPage