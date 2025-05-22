import React from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer,toast } from 'react-toastify'
import { useState } from 'react'
import Footer from './footer'
import Nav from './nav'
import { auth } from './backend/firebase'
const login = () => {
    const [issubmitting,setissubmitting]=useState(false);
     const [register,setregister]=useState({email:"",password:""})
       const handlechange=(e)=>{
        setregister({...register,[e.target.name]:e.target.value});
        console.log("USer is: ",register);
       }
       async function delay(d)
       {
        return new Promise((res,rej)=>{
            setTimeout(() => {
                res();
            }, d*1000);
        })
       }
       const handlesignin=()=>{
        setissubmitting(true);
        console.log("Entering the function:");
        signInWithEmailAndPassword(auth,register.email,register.password).then(async()=>{
            const usr=auth.currentUser;
            console.log("In then part");
               if(usr)
        {   
            toast('Hang tight!! Signing you in!!!', {
                        position: "top-right",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
               delay(1.5);
               window.location.href="/shop"         
        }
        }).catch((err)=>{
           toast.error('Entered Credentials Invalid', {
                        position: "top-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        });
        })

     
       }
  return (
    <div>
      <Nav />
 
          <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={'light'}
        />
       
        <div className="logincard">
             <div className="heading" style={{textAlign:'center',position:'relative'}}><h3>Login</h3></div>
            <div className='form'>
                  <div className="email">
            <p style={{marginBottom:'0rem'}}>Email</p>
            <div className="inp">
                <input type="text" name='email'  onChange={handlechange} placeholder='Enter Email Address' />
            </div>
        </div>
        <div className="password">
            <p style={{marginBottom:'0rem'}}>Password</p>
            <div className="inp">
                <input type="password" onChange={handlechange} placeholder='Enter Your Password' name="password" id="" />
            </div>
        </div>
        <div className="options">
            <div className="signin">
                <button className='btn2' disabled={issubmitting} value="Sign Up" onClick={handlesignin}>Sign in</button>
                
            </div>
            <div className="create">
                <a href="/signup" style={{color:'gray'}} target='_blank'>Create Account</a>
            </div>
        </div>
            </div>
      
      </div>
      <Footer  style={{top:'10vh'}}/>
    </div>
  )
}

export default login

