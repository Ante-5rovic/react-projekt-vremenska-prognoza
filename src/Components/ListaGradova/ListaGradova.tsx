import React from 'react'
import Grad from '../Grad/Grad'
import { TiWeatherCloudy } from 'react-icons/ti';
import './ListaGradova.css';
import {v4 as uuidv4} from 'uuid';

interface Props  {
  podatak:WeatherData[];
}

const ListaGradova :React.FC<Props>= ({podatak}: Props):JSX.Element => {
  return (
    <div className='pom_container'>
      <div className='container_lista_gradova'>
        <>{podatak.length>0 ?(
            podatak.map((rezultat)=>{
              return <Grad id={rezultat.name} key={uuidv4()} rezultat={rezultat} iconVrijeme={TiWeatherCloudy}/>;
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