import React from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import "./Graf.css";
import { IconType } from 'react-icons';
import { WiCloud, WiCloudy, WiDayCloudy, WiDayRain, WiDaySunny, WiFog, WiNightAltCloudy, WiNightAltRain, WiNightClear, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { Icon } from '@rsuite/icons';

interface Props  {
  listaPodataka:WeatherEntry[],
  interval:number,
  tipGrafa:string,
  
}
interface data2{
  name:string,
  linija1:number,
  Iconn:IconType,
  danNoc:string,
  mjernaJedinica:string;
}
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

const WeatherIconGenerator=(imeVremena:string,vremenskaZona:string,clouds:number):IconType=>{
  //od 7 ujutro do 7 navecer je dan pretpostavka<---------

  let mappedValue: IconType=WiFog;// po defoultu
  const ime=imeVremena.toLowerCase();
  if(vremenskaZona==="d"){
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


const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

const Graf = ({listaPodataka,interval,tipGrafa}: Props) => {

  const podaci:data2[]=[]
  if(listaPodataka.length!==0){
    if(tipGrafa==="Temperatura"){
      for(let i:number=0;i<listaPodataka.length;i+=interval){
        const ime:string=listaPodataka[i].dt_txt.split("-")[1]+"/"+
        listaPodataka[i].dt_txt.split("-")[2].split(" ")[0]+" "+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1];
        const noviObjekt: data2 = {
          name:ime,
          linija1:listaPodataka[i].main.temp,
          Iconn:WeatherIconGenerator(listaPodataka[i].weather[0].main,listaPodataka[i].sys.pod,listaPodataka[i].clouds.all),
          danNoc:listaPodataka[i].sys.pod,
          mjernaJedinica:"°C",

        };
        podaci.push(noviObjekt);
      }
    }else if(tipGrafa==="Tlak"){
      for(let i:number=0;i<listaPodataka.length;i+=interval){
        const ime:string=listaPodataka[i].dt_txt.split("-")[1]+"/"+
        listaPodataka[i].dt_txt.split("-")[2].split(" ")[0]+" "+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1];
        const noviObjekt: data2 = {
          name:ime,
          linija1:listaPodataka[i].main.pressure,
          Iconn:WeatherIconGenerator(listaPodataka[i].weather[0].main,listaPodataka[i].sys.pod,listaPodataka[i].clouds.all),
          danNoc:listaPodataka[i].sys.pod,
          mjernaJedinica:"hPa",
        };
        podaci.push(noviObjekt);
      }
    }else if(tipGrafa==="Naoblaka"){
      for(let i:number=0;i<listaPodataka.length;i+=interval){
        const ime:string=listaPodataka[i].dt_txt.split("-")[1]+"/"+
        listaPodataka[i].dt_txt.split("-")[2].split(" ")[0]+" "+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1];
        const noviObjekt: data2 = {
          name:ime,
          linija1:listaPodataka[i].clouds.all,
          Iconn:WeatherIconGenerator(listaPodataka[i].weather[0].main,listaPodataka[i].sys.pod,listaPodataka[i].clouds.all),
          danNoc:listaPodataka[i].sys.pod,
          mjernaJedinica:"%",
        };
        podaci.push(noviObjekt);
      }
    }else if(tipGrafa==="Vlaga"){
      for(let i:number=0;i<listaPodataka.length;i+=interval){
        const ime:string=listaPodataka[i].dt_txt.split("-")[1]+"/"+
        listaPodataka[i].dt_txt.split("-")[2].split(" ")[0]+" "+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1];
        const noviObjekt: data2 = {
          name:ime,
          linija1:listaPodataka[i].main.humidity,
          Iconn:WeatherIconGenerator(listaPodataka[i].weather[0].main,listaPodataka[i].sys.pod,listaPodataka[i].clouds.all),
          danNoc:listaPodataka[i].sys.pod,
          mjernaJedinica:"%",
        };
        podaci.push(noviObjekt);
      }
      
    }

  }else{
    const noviObjekt: data2 = {
      name:"error",
      linija1:50,
      Iconn:WiCloud,
      danNoc:"d",
      mjernaJedinica:"%",
    };
    podaci.push(noviObjekt);
  }
  const CustomizedDot = (props: any) => {
    const { cx, cy, payload } = props;
  
    return (
      <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="red">
        {/* Ovdje možete postaviti ikonicu koju želite koristiti */}
        <circle cx={5} cy={5} r={5} />
        <text x={cx} y={cy - 10} textAnchor="middle" fill="#FFFFFF">
          {payload.value}
        </text>
      </svg>
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload) {
      //console.log('Payload:', payload);
      const Iconn:IconType=payload[0].payload.Iconn;
      const boja = payload[0].payload.danNoc === "d" ? 'rgb(89, 173, 207)' : 'rgb(43, 84, 100)';
      return (
        <div className="custom_tooltip">
          <p className="label">{`Datum: ${label}`}</p>
          <p className="desc">{`${tipGrafa}: ${payload[0].value} ${payload[0].payload.mjernaJedinica}`}</p>
          <div className='icona_u_tooltipu_conteiner'>
            <Iconn className='icona_u_tooltipu' style={{ color: boja }}/>{/* treba postavit boju vec je dndoano dan noc u payload i treba napraviti css funkciju */}
          </div>
          {/* Dodajte više podataka prema potrebi */}
        </div>
      );
    }
  
    return null;
  };

  
    
  return (
    <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={podaci}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke='white'/>
          <YAxis stroke="white"/>
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Line type="monotone" dataKey="linija1" stroke="#8884d8" activeDot={{ r: 8 }} dot={<CustomizedDot />}/>
          {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
          
        </LineChart>



      </ResponsiveContainer>



  );
}

export default Graf