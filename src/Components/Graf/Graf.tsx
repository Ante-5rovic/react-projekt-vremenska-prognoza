import React from 'react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Props  {
  listaPodataka:WeatherEntry[],
  interval:number,
  tipGrafa:string,
}
interface data2{
  name:string,
  linija1:number,
  test:number,
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
    if(tipGrafa==="obicnaPrognoza"){
      for(let i:number=0;i<listaPodataka.length;i+=interval){
        const ime:string=listaPodataka[i].dt_txt.split("-")[1]+"/"+
        listaPodataka[i].dt_txt.split("-")[2].split(" ")[0]+" "+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1];
        const noviObjekt: data2 = {
          name:ime,
          linija1:listaPodataka[i].main.temp,
          test:0
        };
        podaci.push(noviObjekt);
      }
    }else if(tipGrafa==="tlak"){
      for(let i:number=0;i<listaPodataka.length;i+=interval){
        const ime:string=listaPodataka[i].dt_txt.split("-")[1]+"/"+
        listaPodataka[i].dt_txt.split("-")[2].split(" ")[0]+" "+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1];
        const noviObjekt: data2 = {
          name:ime,
          linija1:listaPodataka[i].main.pressure,
          test:0
        };
        podaci.push(noviObjekt);
      }
    }else if(tipGrafa==="naoblaka"){
      for(let i:number=0;i<listaPodataka.length;i+=interval){
        const ime:string=listaPodataka[i].dt_txt.split("-")[1]+"/"+
        listaPodataka[i].dt_txt.split("-")[2].split(" ")[0]+" "+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1];
        const noviObjekt: data2 = {
          name:ime,
          linija1:listaPodataka[i].clouds.all,
          test:0
        };
        podaci.push(noviObjekt);
      }
    }else if(tipGrafa==="vlaga"){
      for(let i:number=0;i<listaPodataka.length;i+=interval){
        const ime:string=listaPodataka[i].dt_txt.split("-")[1]+"/"+
        listaPodataka[i].dt_txt.split("-")[2].split(" ")[0]+" "+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+listaPodataka[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1];
        const noviObjekt: data2 = {
          name:ime,
          linija1:listaPodataka[i].main.humidity,
          test:0
        };
        podaci.push(noviObjekt);
      }
      
    }

  }else{
    //TO DO
  }

  
    
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
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="linija1" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          
        </LineChart>



      </ResponsiveContainer>



  );
}

export default Graf