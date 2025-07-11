import React from 'react'
import  { useRef, useEffect, useState } from 'react';
import Footer from './footer'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import Nav from './nav'
import './selling.css'

import { auth, db } from './backend/firebase';
import { setDoc,doc } from 'firebase/firestore';

const sell = () => {
   const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isSubmitting},
  } = useForm()
  const [plantimg,setplantimg]=useState(null);
   const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const ref = useRef();
  const [visible, setVisible] = useState(false);
async function delay(d){
  return new Promise((res,rej)=>{
    setTimeout(() => {
      res();
    }, d*1000);
  })
}
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting); // Toggle based on visibility
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
const submitform=async (data)=>{
  handleClose;
  const usr=auth.currentUser;
  const imgfile=data.file[0];
  let str=null;
const reader=new FileReader();
reader.readAsDataURL(imgfile);
reader.onload=async function(){

    if(reader.result!=="")
    {
        let arr2=reader.result.split(",");
      
    await setDoc(doc(db,"Plants",usr.uid),{
    name:data.pname,
    price:data.pprice,
    data:arr2[1]
  })
  toast('We will notify🔔 you if any buyer is interested!!', {
position: "top-right",
autoClose: 1500,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});

    }

}


}
  return (
    
    <>
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
      <Nav/>

      <div className="sellpage">

 
       <img src="./background/sell8.jpg" alt="" className='bg' />
      <div className="seller">
        <h1 className='leftani2'>Let Your Greens Grow Beyond Your Garden!!</h1>
        <p className='intro rightani2'>If you have healthy, home-grown plants or cuttings that you no longer need, Paradise Nursery offers you a wonderful opportunity to pass them on to someone who will care for them just as much as you have. Whether you're a passionate gardener with a balcony full of propagated saplings or someone who simply has a few extra pots to spare, our platform allows you to share your love for plants while making a little extra from your green hobby.</p>
          <p className='intro rightani2'> By listing your plants with us, you not only help others start or expand their plant collection, but also contribute to sustainable gardening by reducing waste and promoting reuse. We accept a wide variety of plants, from flowering and foliage varieties to indoor greens, succulents, and rare finds—provided they are healthy, well-rooted, and ready to thrive in a new home. Selling through Paradise Nursery is simple: just provide the plant details, upload a few clear photos, set a fair price, and we’ll help connect you with buyers who appreciate nature just as much as you do. Whether you’re looking to declutter, support your gardening habit, or simply share the joy of plants, this is the perfect place to let your greens grow beyond your garden.
            </p>
            <div className="sellbtn">
    

        <Button variant="primary" className='btn2' onClick={handleShow}>
        Sell Now
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sell a Plant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="sellform">
               <form  onSubmit={handleSubmit(submitform)} encType='multipart/form-data' >
         {isSubmitting && <div>Loading...</div>}
      <br />
      <input type="text" placeholder="Enter the Plant Name" {...register("pname",{required:{value:true,message:"This field is required"}})} />
      {errors.pname && <div className='message'>{errors.pname.message}</div>}
      <hr />
      <input type="text" placeholder='Enter a brief description about the plant' {...register("pdisc",{required:{value:true,message:"This field is required"}})} />
      {errors.pdisc && <div className='message'>{errors.pdisc.message}</div>}
      <hr />
    <input type="checkbox" name="" id="" value={"yes"} /> <span>Yes</span>
    <hr />
      <input type="number" placeholder="Enter the price (in Dollars)" {...register("pprice",{required:{value:true,message:"This field is required"}})}/>
      {errors.pprice && <div className='message'>{errors.pprice.message}</div>}
      <hr />
      <input type="text" placeholder='Enter your shipping address' {...register("paddress",{required:{value:true,message:"This field is required"}})} />
      {errors.paddress &&<div className='message'>{errors.paddress.message}</div>}
      <hr />
      <input type="date" {...register("pdate",{required:{value:true,message:"This field is required"}})} />
            {errors.pdate &&<div className='message'>{errors.pdate.message}</div>}
      <input type="file" {...register("file")}/>

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



            </div>
      </div>
                  <div className="bar">
             <div className="imagetag">
                            <img  ref={ref} className={`plant ${visible?'visible2':''}`} src="./background/sell1.jpg" alt="" />
             </div>

                 <div ref={ref} className={`card sidebar ${visible ? 'visible' : ''}`}>
                        <h3>Why sell a plant on our website?</h3>
                        <p>Selling your plant on Paradise Nursery gives you access to a community of genuine plant lovers who value and care for greenery. It’s a great way to declutter your space, earn from your gardening hobby, and ensure your healthy plants find new homes instead of going to waste. Plus, our platform makes the process simple, secure, and supportive—with guidance at every step.</p>
              </div>
 
            </div>
               <Footer  style={{top:'100vh'}}/>
             </div>    
    </>
  )
}

export default sell
