import React, { useContext, useEffect, useState } from 'react'
import { auth } from './backend/firebase';
import { useNavigate } from 'react-router-dom';
import { db } from './backend/firebase';
import { logcontext } from './context/context';

const nav = () => {
    const [cart,setcart]=useState(0);
    const navigate = useNavigate(); 
    const {loggedin,setloggedin}=useContext(logcontext);
    useEffect(()=>{
        let arr=localStorage.getItem("cart");
        if(arr)
        {
            setcart(parseInt(arr));
        }
    })
    const handleaccount=()=>{
        if(loggedin)
        {
            console.log("Logged in is: ",loggedin);
            window.open('/profile','_blank');
         }
        else
        {
            window.open('/login','_blank')
        }
        
    }

  return (
    <>
     <div className='nav' style={{background:'black'}}>
      <h4 className='heading3' style={{color:'white'}}> <lord-icon
    src="https://cdn.lordicon.com/anutbrah.json"
    trigger="hover">
</lord-icon> Paradise Nursery</h4>
<div className="links">
    <a href="/" target='blank'>Home</a>
    <a href="">Orders</a>
    <a href="">Offers</a>
</div>
<div className="logo">
       
    <lord-icon className="log"
    src="https://cdn.lordicon.com/kwttodke.json"
    trigger="hover"
     style={{height:"20px"}}>
</lord-icon>
<lord-icon className="log"
    src="https://cdn.lordicon.com/yajmsxjh.json"
    trigger="hover"
    style={{height:"25px"}}>
</lord-icon>
<lord-icon className="log"
    src="https://cdn.lordicon.com/wgtaryar.json"
    trigger="hover"
    style={{height:"20px"}}>
</lord-icon>
<lord-icon className="log"
    src="https://cdn.lordicon.com/dbcganmh.json"
    trigger="hover"
    style={{height:"20px"}}>
</lord-icon>

<lord-icon
    src="https://cdn.lordicon.com/fgctxlnd.json"
    trigger="hover"
    style={{height:"20px"}}>
</lord-icon>
</div>
<hr className='hori' style={{width:"100%",margin:"0rem 0"}}/>
<div className="logo2" >
    <div className="logos">
  <lord-icon className="log"
    src="https://cdn.lordicon.com/hhljfoaj.json"
    trigger="hover"
    style={{height:"30px",background:"white",borderRadius:"100%"}} onClick={()=>{

        handleaccount();
    }
        
        }>
</lord-icon>

<lord-icon className="log" onClick={()=>{
   window.open('/cart','_blank');
}}
 colors="primary:#121331,secondary:#e8b730,tertiary:#66d7ee"
    src="https://cdn.lordicon.com/hwpohgdf.json"
    trigger="hover"
    style={{height:"40px", width:"40px"}}>
</lord-icon>
<p className='cnt'>{cart}</p>
    </div>
   
</div>

<hr style={{width:"100%",margin:"0rem 0"}}/>

    </div>
    </>
   
  )
}

export default nav
