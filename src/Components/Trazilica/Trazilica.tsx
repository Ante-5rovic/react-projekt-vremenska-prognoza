import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { IconButton } from "rsuite"; 
import SearchIcon from '@rsuite/icons/Search';
import './Trazilica.css';
import {v4 as uuidv4} from 'uuid';



type Props={
  onClick:(e:SyntheticEvent,)=>void;
  search:string|undefined;
  handleChange:(e:ChangeEvent<HTMLInputElement>)=>void;
  podatak:ApiResponseGradovi[];
  onClickTrazilica:(e:SyntheticEvent,item_grad_prep:ApiResponseGradovi)=>void;

};




const Trazilica:React.FC<Props> = ({onClick,search,handleChange,podatak,onClickTrazilica}:Props):JSX.Element  => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  //const[l,setL]=useState<string>('');
  return (
    <div className='container_inputa'>
      <form className='input' >
        <input className='input_box' type='input' placeholder='Unesi ime grada' value={search} onChange={(e)=>handleChange(e)} onFocus={(e)=>{setShowSuggestions(true)}}  />
        <IconButton className='search_button' icon={<SearchIcon />} type='button' onClick={(e)=> onClick(e)}/>
        
      </form>
      <div className='dropdown' style={{ display: showSuggestions ? 'flex' : 'none' }}>
          {podatak.length>0 && podatak.map((item)=>(
            <div className='dropdown_row' key={uuidv4()} id={item.name}
            onClick={async(e)=>{
              onClickTrazilica(e,item);
              setShowSuggestions(false);
            }}>
              <div className='ime_grada'>{item.name}</div>
              <div className='zemlja'>{item.country}</div>
            </div>
          ))}   
      </div>
    </div>
    
  )
}

export default Trazilica