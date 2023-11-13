import React from 'react'
import './Grad.css';
import { IconButton } from "rsuite"; 
import Minus from '@rsuite/icons/Minus';
import { TiWeatherCloudy } from 'react-icons/ti';
import { IconType } from 'react-icons/lib';


interface Props{
  id:String;
  rezultat:ApiResponseGradovi;
  iconVrijeme:IconType;
}

const Grad: React.FC<Props> = ({id,rezultat,iconVrijeme}: Props) :JSX.Element=> {
  const IconComponent = iconVrijeme;
  return (
    <div className='grad'>
        <div className='button_container'>
          <IconButton className='minus_button' icon={<Minus />} type='submit' />
        </div>
        <h2 className='ime_grada'>{rezultat.name}</h2>
        <IconComponent className="icon_vrijeme"/>
        <div className='podaci'>
          <p id='temperatura' className='txt_prikaz'>Temperatura: {30}</p>
          <p id='padaline' className='txt_prikaz'>Padaline: {30}</p>
        </div>
        
    </div>
  );
}
export default Grad;