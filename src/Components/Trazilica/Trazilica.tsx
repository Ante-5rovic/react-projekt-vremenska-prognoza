import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { IconButton } from "rsuite"; 
import SearchIcon from '@rsuite/icons/Search';
import './Trazilica.css';

type Props={
  onClick:(e:SyntheticEvent)=>void;
  search:string|undefined;
  handleChange:(e:ChangeEvent<HTMLInputElement>)=>void;

};

const Trazilica:React.FC<Props> = ({onClick,search,handleChange}:Props):JSX.Element  => {
  return (
    <form className='input'>
        <input className='input_box' type='input' placeholder='Unesi ime grada' value={search} onChange={(e)=>handleChange(e)} />
        <IconButton className='search_button' icon={<SearchIcon />} type='button' onClick={(e)=> onClick(e)}/>
    </form>
  )
}

export default Trazilica