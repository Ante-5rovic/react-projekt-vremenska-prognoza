import React, { SyntheticEvent } from 'react'
import Grad from '../Grad/Grad'
import { WiCloud ,WiDaySunny,WiDayCloudy,WiCloudy,WiRain,WiDayRain,WiThunderstorm,WiSnow,WiFog,WiNightAltRain,WiNightAltCloudy,WiNightClear} from "react-icons/wi";
import './ListaGradova.css';
import {v4 as uuidv4} from 'uuid';
import { IconType } from 'react-icons';
import TrenutniGrad from '../TrenutniGrad/TrenutniGrad';

interface Props  {
  podatak:WeatherData[];
  onClickDelete:(e:SyntheticEvent,long_lat:string)=>void;
  trenutaLoakcija:WeatherData;
}

const ListaGradova :React.FC<Props>= ({podatak,onClickDelete,trenutaLoakcija}: Props):JSX.Element => {
  //console.log(trenutaLoakcija);

  type StringObject<T> = {
    [key: string]: T;
  };
  const stringMappingDay: StringObject<IconType> = {
    'clear':WiDaySunny,
    'clouds':WiDayCloudy,
    'clouds2':WiCloud,
    'clouds3':WiCloudy,
    'drizzle':WiRain,
    'rain':WiDayRain,
    'thunderstorm':WiThunderstorm,
    'snow':WiSnow,
    'mist':WiFog,
  };
  const stringMappingNight: StringObject<IconType> = {
    'clear':WiNightClear,
    'clouds':WiNightAltCloudy,
    'clouds2':WiCloud,
    'clouds3':WiCloudy,
    'drizzle':WiRain,
    'rain':WiNightAltRain,
    'thunderstorm':WiThunderstorm,
    'snow':WiSnow,
    'mist':WiFog,
  };

  const WeatherIconGenerator=(imeVremena:string,vremenskaZona:number,clouds:number):IconType=>{
    //od 7 ujutro do 7 navecer je dan pretpostavka<---------
    const date=new Date();
    const currTime = (date.getHours()*60*60+date.getMinutes()*60+date.getSeconds()+vremenskaZona+date.getTimezoneOffset()*60)%(24*60*60);
    let mappedValue: IconType=WiFog;// po defoultu
    const ime=imeVremena.toLowerCase();
    if(currTime>7*60*60&&currTime<19*60*60){
      try{
        if(ime==='clouds'){
          if(clouds<25){
            mappedValue=stringMappingDay['clouds'];
          }else if(clouds<50){
            mappedValue=stringMappingDay['clouds2'];
          }else{
            mappedValue=stringMappingDay['clouds3'];
          }
        }else{
          mappedValue=stringMappingDay[ime];
        }
      }catch(error){
        console.log('ovj tip ikone ne postoji');
      }
    }else{
      try{
        if(ime==='clouds'){
          if(clouds<25){
            mappedValue=stringMappingNight['clouds'];
          }else if(clouds<50){
            mappedValue=stringMappingNight['clouds2'];
          }else{
            mappedValue=stringMappingNight['clouds3'];
          }
        }else{
          mappedValue=stringMappingNight[ime];
        }
       }catch(error){
         console.log('ovj tip ikone ne postoji');
       }
    }
    if(mappedValue===undefined){
      mappedValue=WiFog;
    }
    
    return mappedValue;

  }

  


  return (
    <div className='pom_container'>
      <div className='container_lista_gradova'>
        <TrenutniGrad id={trenutaLoakcija.name} key={uuidv4()}  rezultat={trenutaLoakcija} iconVrijeme={ WeatherIconGenerator(trenutaLoakcija.weather[0].main,trenutaLoakcija.timezone,trenutaLoakcija.clouds.all)} timezone={trenutaLoakcija.timezone}/>
        <>{podatak.length>0 ?(
            podatak.map((rezultat)=>{
              return <Grad id={rezultat.name} key={uuidv4()} rezultat={rezultat} iconVrijeme={ WeatherIconGenerator(rezultat.weather[0].main,rezultat.timezone,rezultat.clouds.all)} onClickDelete={onClickDelete}  timezone={rezultat.timezone} />;
            })
        ):(
          <h1 className='txt_dodajte_loaciju'>dodajete lokaciju</h1>
        )
      }
      </>
      </div>
    </div>
    
  )
}


export default ListaGradova