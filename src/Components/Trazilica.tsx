import React from 'react'
import { IconButton } from "rsuite"; 
import SearchIcon from '@rsuite/icons/Search';
import './Trazilica.css';
var data=require("../MOCK_DATA.json");


const Trazilica = () => {

    function funkcijaX(){
        console.log("wow");
    }

  return (
    <form className='input'>
        <input className='input_box' type='input' placeholder='Unesi ime grada' onChange={funkcijaX} />
        <IconButton className='search_button' icon={<SearchIcon />} type='submit' />
    </form>
  )
}

export default Trazilica