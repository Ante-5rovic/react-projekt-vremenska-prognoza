import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { search5DaysWeather } from '../../api'
import Graf from '../../Components/Graf/Graf';
import "./GrafPage.css"

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
  
  const {podatak1,podatak2}=useParams<Podaci>();
  const[prognoza,setPrognoza]=useState<WeatherDataFor5Days>(modal);
  //search5DaysWeather
  useEffect(() => {
    //poziv apija odma u startu
    console.log(podatak1,podatak2);
    pripremaPodatakaPrognoze();
  }, []);

  const pripremaPodatakaPrognoze=async()=>{
    if(podatak1!==undefined&&podatak2!==undefined){
      let lat:number;
      let lon:number;
      try{
        lat=parseFloat(podatak1);
        lon=parseFloat(podatak2);
        const podatakApia= await search5DaysWeather(lat,lon);
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





  return (
    
    <div className='graf_conteiner'>
      <Link to="/" className='heading'>
        <span className='heading'>{prognoza.city.name}</span>
      </Link>
      <div className='graf_prikaz'>
      <Graf/>
      </div>
      
    </div>
  )
}

export default GrafPage