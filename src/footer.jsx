import React, { useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import './footer.css'
const footer = (p) => {
     const {
      register,
      handleSubmit,
      watch,
      formState: { errors,isSubmitting},
    } = useForm()
      const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  const [val,setval]=useState(p.style.top);
  console.log('Val is ',val);
  const submitform=()=>{
    handleClose();
      toast.success('Message sent!! We will get back to you soon!!!', {
    position:"top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    
    });
  }
  return (
    <>
        <ToastContainer
    position="top-center"
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
    <div className="footer" style={{top:val}}>
      <div className="foottop">
       <div className="footproduct">
        <div className="foothead">
          <h4>Our Products</h4>
          <hr style={{width:'100%'}} />
          <ul style={{listStyle:'none', paddingLeft:'0rem'}}>

            <li>Plants by Type</li>
            <li>Plants by Seasons</li>
            <li>Foliage Plants</li>
            <li>Flowering Plants</li>
            <li>Aquatic Plants</li>
          </ul>
        </div>
      </div>
      
      <div className="footlinks">
        <div className="foothead">
          <h4>Useful Links</h4>
          <hr style={{width:'100%'}} />
        </div>
        <ul style={{listStyle:'none', paddingLeft:'0rem'}}>
          <li><a href="/about">About Us</a></li>
          <li> <p style={{cursor:'pointer',margin:'0rem',textDecoration:'underline'}}>
            <button style={{background:'none',border:'none',textDecoration:'underline'}} onClick={handleShow}>
               Contact us
            </button>
           
            
            
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reach out to us!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="sellform">
               <form  onSubmit={handleSubmit(submitform)}  encType='multipart/form-data' >
         {isSubmitting && <div>Loading...</div>}
      <br />
      <input type="text" placeholder="Enter your Name" {...register("name",{required:{value:true,message:"This field is required"}})} />
      {errors.name && <div className='message'>{errors.name.message}</div>}
      <hr />
      <input type="text" placeholder="Enter your Email id" {...register("email",{required:{value:true,message:"This field is required"}})}/>
      {errors.email && <div className='message'>{errors.email.message}</div>}
      <hr />
      <input type="text" placeholder='Enter your message' {...register("message",{required:{value:true,message:"This field is required"}})} />
      {errors.message &&<div className='message'>{errors.message.message}</div>}
      <hr />
    

            <Modal.Footer>
         
          <input disabled={isSubmitting} type="submit" value="Submit Now"/>
           <Button variant="secondary" style={{width:'100%'}} onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
     </form>
          </div>
        
        
      
        </Modal.Body>
  
      </Modal>


            
            
            
            
            
            </p></li>
          <li> <a href="">Privacy</a></li>
          <li> <a href="/login" target='blank'>Login</a></li>
          <li> <a href="/signup" target='blank'>Sign up</a></li>
        </ul>
     
      </div>
      <div className="footcontact">
      <div className="foothead">
          <h4>Our Contact</h4>
          <hr style={{width:'35%'}}/>
          <ul  style={{listStyle:'none', paddingLeft:'0rem'}}>
            <li>    <DotLottieReact
      src="https://lottie.host/7e93d359-3b48-4d84-b618-1d0624c9fdbc/srbrt0BKSx.lottie"
      loop
      autoplay
      style={{width:'30px',height:'30px'}}
    />1234 Elm Street, Springfield, IL 62704, USA
    </li>
            <li>
               <DotLottieReact
      src="https://lottie.host/bf46681e-0bce-4a23-8d21-cbf7e9d0debc/vq4uWWJDzq.lottie"
       style={{width:'30px',height:'30px'}}
      loop
      autoplay
    /> paradisenursery@gmail.com
            </li>
            <li style={{position:'relative',left:'5px'}}>
        <DotLottieReact
      src="https://lottie.host/9951e4f7-d9a3-4454-8071-c59b6d476d82/7GblpZ0OWL.lottie"
        style={{width:'30px',height:'30px'}}
      loop
      autoplay
       />
          + 012 345 678
            </li>
          </ul>
        </div>
      </div>
      </div>
      <div className="footbot">
      <p style={{margin:'0rem'}}>&copy; All rights reserved | Paradise Nursery</p>
      <div className="footlogos">
        <lord-icon
    src="https://cdn.lordicon.com/lplofcfe.json"
    trigger="hover"
    stroke="bold"
     style={{width:'30px',height:'30px'}}>
</lord-icon>
      <lord-icon
    src="https://cdn.lordicon.com/vnvsnvov.json"
    trigger="hover"
    stroke="bold"
        style={{width:'30px',height:'30px'}}>
</lord-icon>
<lord-icon
    src="https://cdn.lordicon.com/cuwcpyqc.json"
    trigger="hover"
    stroke="bold"
     style={{width:'30px',height:'30px'}}>
</lord-icon>
<lord-icon
    src="https://cdn.lordicon.com/jjxzcivr.json"
    trigger="hover"
    stroke="bold"
     style={{width:'30px',height:'30px'}}>
</lord-icon>
      </div>
      </div>
    </div>
    </>

  )
}

export default footer
