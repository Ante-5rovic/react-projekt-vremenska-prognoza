import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { IconButton } from "rsuite"; 
import SearchIcon from '@rsuite/icons/Search';
import './Trazilica.css';

type Props={};

const Trazilica:React.FC<Props> = (props:Props):JSX.Element  => {

    const[search,setSearch]=useState<string>("wow");
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
      setSearch(e.target.value);
      console.log(e);
    };
    const onClick=(e:SyntheticEvent)=>{
      console.log(e);
    };

    

  return (
    <form className='input'>
        <input className='input_box' type='input' placeholder='Unesi ime grada' value={search} onChange={(e)=>handleChange(e)} />
        <IconButton className='search_button' icon={<SearchIcon />} type='button' onClick={(e)=> onClick(e)}/>
    </form>
  )
}

export default Trazilica