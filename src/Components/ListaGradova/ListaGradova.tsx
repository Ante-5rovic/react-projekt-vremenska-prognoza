import React, { SyntheticEvent } from 'react'
import Grad from '../Grad/Grad'
import { WiCloud ,WiDaySunny,WiDayCloudy,WiCloudy,WiRain,WiDayRain,WiThunderstorm,WiSnow,WiFog,WiNightAltRain,WiNightAltCloudy,WiNightClear} from "react-icons/wi";
import './ListaGradova.css';
import {v4 as uuidv4} from 'uuid';
import { IconType } from 'react-icons';

interface Props  {
  podatak:WeatherData[];
  onClickDelete:(e:SyntheticEvent,long_lat:string)=>void;
}

const ListaGradova :React.FC<Props>= ({podatak,onClickDelete}: Props):JSX.Element => {

  type StringObject<T> = {
    [key: string]: T;
  };
  const stringMappingDay: StringObject<IconType> = {
    'clear sky':WiDaySunny,
    'few clouds':WiDayCloudy,
    'scattered clouds':WiCloud,
    'broken clouds':WiCloudy,
    'shower rain':WiRain,
    'rain':WiDayRain,
    'thunderstorm':WiThunderstorm,
    'snow':WiSnow,
    'mist':WiFog,
  };
  const stringMappingNight: StringObject<IconType> = {
    'clear sky':WiNightClear,
    'few clouds':WiNightAltCloudy,
    'scattered clouds':WiCloud,
    'broken clouds':WiCloudy,
    'shower rain':WiRain,
    'rain':WiNightAltRain,
    'thunderstorm':WiThunderstorm,
    'snow':WiSnow,
    'mist':WiFog,
  };

  const WeatherIconGenerator=(imeVremena:string,vremenskaZona:number)=>{
    const mappedValue: IconType = stringMappingDay['clear sky'];
    

  }

  


  return (
    <div className='pom_container'>
      <div className='container_lista_gradova'>
        <>{podatak.length>0 ?(
            podatak.map((rezultat)=>{
              return <Grad id={rezultat.name} key={uuidv4()} rezultat={rezultat} iconVrijeme={WiCloud} onClickDelete={onClickDelete}/>;
            })
        ):(
          <h1>no resoults</h1>
        )
      }
      </>
      </div>
    </div>
    
  )
}


export default ListaGradova