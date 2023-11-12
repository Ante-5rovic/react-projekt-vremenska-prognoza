import React from 'react'
import Grad from '../Grad/Grad'
import { TiWeatherCloudy } from 'react-icons/ti';
import './ListaGradova.css';

interface Props  {}

const ListaGradova :React.FC<Props>= (props: Props):JSX.Element => {
  return (
    <div className='container_lista_gradova'>
        <Grad imeGrada='Zadar' temperatura='30' padaline='kisa' iconVrijeme={TiWeatherCloudy}/>
        <Grad imeGrada='Zagreb' temperatura='-2' padaline='kisa' iconVrijeme={TiWeatherCloudy}/>
        <Grad imeGrada='Split' temperatura='29' padaline='kisa' iconVrijeme={TiWeatherCloudy}/>
        <Grad imeGrada='Split' temperatura='29' padaline='kisa' iconVrijeme={TiWeatherCloudy}/>
        <Grad imeGrada='Split' temperatura='29' padaline='kisa' iconVrijeme={TiWeatherCloudy}/>
        <Grad imeGrada='Split' temperatura='29' padaline='kisa' iconVrijeme={TiWeatherCloudy}/>
    </div>
  )
}

export default ListaGradova