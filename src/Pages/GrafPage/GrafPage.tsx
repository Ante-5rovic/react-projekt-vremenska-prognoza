import React, { useEffect, useReducer, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { search5DaysWeather, searchWeatherHistory } from '../../api'
import Graf from '../../Components/Graf/Graf';
import "./GrafPage.css"
import Select from 'react-select';
import { InputActionMeta } from 'react-select/dist/declarations/src';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { IconType } from 'react-icons';
import { WiCloud, WiCloudy, WiDayCloudy, WiDayRain, WiDaySunny, WiFog, WiNightAltCloudy, WiNightAltRain, WiNightClear, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

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
  const[podaciZaTablicu,setPodaciZaTablicu]=useState<podaciZaTablicuInterface[]>([]);
  //search5DaysWeather
  useEffect(() => {
    //poziv apija odma u startu
    console.log(podatak1,podatak2);
    pripremaPodatakaPrognoze();
    
  }, []);

  useEffect(() => {
    UpdateTable();
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
            forceUpdate();
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
    
  ];
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
  interface podaciZaTablicuInterface{
    id:number,
    col1:string,
    col2:IconType,
    col3:string,
    col4:string,
  }


  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'datum', width: 150 ,sortable:false},
    { field: 'col2', headerName: 'padaline', width: 150 ,sortable:false,renderCell: (params) => {
      const Icona:IconType=params.value;
      return (        
        <div>
          <Icona style={{height:30,width:30}}/>
        </div>
      );}},
    { field: 'col3', headerName: 'opis padaline', width: 150 ,sortable:false},
    { field: 'col4', headerName: vrstaPodatak, width: 150 ,sortable:false},
  ];


  const UpdateTable=()=>{
    const rows:podaciZaTablicuInterface[]= [];//poprabi
    if(prognoza.list.length===40){
      if(vrstaPodatak==="Temperatura"){
        var j:number=0;
      for(var i:number=0;i<40;i+=vremenskiInterval){
        const icona:IconType=WeatherIconGenerator(prognoza.list[i].weather[0].main,prognoza.list[i].sys.pod,prognoza.list[i].clouds.all);
      const noviObj={
        id:j,
        col1:prognoza.list[i].dt_txt.split("-")[1]+"/"+
        prognoza.list[i].dt_txt.split("-")[2].split(" ")[0]+" "+prognoza.list[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+prognoza.list[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1],
        col2 :icona ,
        col3:prognoza.list[i].weather[0].description,
        col4:prognoza.list[i].main.temp +"°C",
      }
      rows.push(noviObj);
      j++;
      }

      }else if(vrstaPodatak==="Tlak"){
        var j:number=0;
      for(var i:number=0;i<40;i+=vremenskiInterval){
        const icona:IconType=WeatherIconGenerator(prognoza.list[i].weather[0].main,prognoza.list[i].sys.pod,prognoza.list[i].clouds.all);
      const noviObj={
        id:j,
        col1:prognoza.list[i].dt_txt.split("-")[1]+"/"+
        prognoza.list[i].dt_txt.split("-")[2].split(" ")[0]+" "+prognoza.list[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+prognoza.list[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1],
        col2 :icona ,
        col3:prognoza.list[i].weather[0].description,
        col4:prognoza.list[i].main.pressure+"hPa",
      }
      rows.push(noviObj);
      j++;
    }
      }else if(vrstaPodatak==="Naoblaka"){
        var j:number=0;
      for(var i:number=0;i<40;i+=vremenskiInterval){
        const icona:IconType=WeatherIconGenerator(prognoza.list[i].weather[0].main,prognoza.list[i].sys.pod,prognoza.list[i].clouds.all);
      const noviObj={
        id:j,
        col1:prognoza.list[i].dt_txt.split("-")[1]+"/"+
        prognoza.list[i].dt_txt.split("-")[2].split(" ")[0]+" "+prognoza.list[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+prognoza.list[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1],
        col2 :icona ,
        col3:prognoza.list[i].weather[0].description,
        col4:prognoza.list[i].clouds.all+"%",
      }
      rows.push(noviObj);
      j++;
      }
      }else if(vrstaPodatak==="Vlaga"){
        var j:number=0;
      for(var i:number=0;i<40;i+=vremenskiInterval){
        const icona:IconType=WeatherIconGenerator(prognoza.list[i].weather[0].main,prognoza.list[i].sys.pod,prognoza.list[i].clouds.all);
      const noviObj={
        id:j,
        col1:prognoza.list[i].dt_txt.split("-")[1]+"/"+
        prognoza.list[i].dt_txt.split("-")[2].split(" ")[0]+" "+prognoza.list[i].dt_txt.split("-")[2].split(" ")[1].split(":")[0]
        +":"+prognoza.list[i].dt_txt.split("-")[2].split(" ")[1].split(":")[1],
        col2 :icona ,
        col3:prognoza.list[i].weather[0].description,
        col4:prognoza.list[i].main.humidity+"%",
      }
      rows.push(noviObj);
      j++;
      }
      }





      
    setPodaciZaTablicu(rows);

    }
    
  }

  


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
      <div className='filteri'>
        <Select id="dropdown" options={optionsIntervali} onChange={(selectedOption) =>{
          if(selectedOption?.value!==undefined){setVremenskiInterval(selectedOption.value);forceUpdate();}}}
          placeholder="Interval Prikaza" className='select'/>
        <Select id="dropdown" options={optionsVrsta} onChange={(selectedOption) => {
          if(selectedOption?.value!==undefined){setVrstaPodataka(selectedOption.value);forceUpdate();setVrstaPodatakaZaNaslov(selectedOption.label)}}}
          placeholder="Vrsta podataka" className='select'/>
      </div>
      <DataGrid className="grid" rows={podaciZaTablicu} columns={columns} disableColumnMenu disableColumnFilter disableColumnSelector disableDensitySelector disableEval disableRowSelectionOnClick disableVirtualization ignoreDiacritics  
       initialState={{pagination: {paginationModel: {pageSize: 10,},},}} pageSizeOptions={[5, 10, 15]}
       />
      
    </div>
  )
}

export default GrafPage