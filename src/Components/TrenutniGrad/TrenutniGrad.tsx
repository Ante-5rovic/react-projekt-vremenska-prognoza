import React, { SyntheticEvent, useEffect, useState } from 'react'
import './TrenutniGrad.css';
import { IconButton } from "rsuite"; 
import Minus from '@rsuite/icons/Minus';
import { IconType } from 'react-icons/lib';
import { Link } from 'react-router-dom';


interface Props{
  id:String;
  rezultat:WeatherData;
  iconVrijeme:IconType;
  timezone:number,
}

const TrenutniGrad: React.FC<Props> = ({id,rezultat,iconVrijeme,timezone}: Props) :JSX.Element=> {
  const IconComponent = iconVrijeme;
  const str1=rezultat.coord.lat.toString();
  const str2=rezultat.coord.lon.toString();

  const [color, setColor] = useState<string>('green');

  // Funkcija koja mijenja CSS svojstva
  const changeStyles = () => {
    const date=new Date();
    //console.log(date.getTimezoneOffset());
    const currTime = (date.getHours()*60*60+date.getMinutes()*60+date.getSeconds()+timezone+date.getTimezoneOffset()*60)%(24*60*60);
    if(currTime>7*60*60&&currTime<19*60*60){
      setColor('rgb(89, 173, 207)');
    }else{
      setColor('rgb(43, 84, 100)');
    }
    
  };
  useEffect(() => {
    //sluzi za bolje renderanje
    changeStyles();
  }, []);
  


  return (
    <div className='grad'>
        <div className='button_containerr' >
          Trenutna lokacija
        </div>
        <Link to={"/graf/"+JSON.stringify(rezultat)} className='grad2' >
          <h2 className='ime_grada'>{rezultat.name}</h2>
          <IconComponent className="icon_vrijeme" style={{color}}/>
          <div className='podaci'>
            <p id='temperatura' className='txt_prikaz'>Temp: {rezultat.main.temp} °C</p>
            <p id='padaline' className='txt_prikaz'>Vrijeme: {rezultat.weather[0].description}</p>
          </div>
        </Link>
        
    </div>
  );
}
export default TrenutniGrad;