import React from 'react'

const Button = ({setModal,text,setType, isuser}) => {
  return (
    <div>
      <button disabled={isuser?false:true} className='btn' onClick={()=>{
        setType(text);
        setModal(true);
      }}>{text}</button>
    </div>
  )
}

export default Button
