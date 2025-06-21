// import React, { useEffect, useState,useContext,useRef} from 'react'
// import {db,auth } from "./backend/firebase"
// import { logcontext } from './context/context';
// import { Bounce, ToastContainer, toast } from 'react-toastify';
// import { count, doc, setDoc } from "firebase/firestore"; 
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { useForm } from 'react-hook-form';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { getDocs,collection,arrayUnion,arrayRemove } from 'firebase/firestore';
// import Nav from "./nav"
// import Footer from './footer'
// import { countercontext, ordercontext} from './context/context';
// import { wishcontext,reviewcontext,newplantcontext } from './context/context';
// const shop = () => {
//      const {
//       register,
//       handleSubmit,
//       watch,
//       formState: { errors,isSubmitting},
//     } = useForm()
//    const [show, setShow] = useState(false);
//       const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);
//        const [show2, setShow2] = useState(false);
//       const handleClose2 = () => setShow2(false);
//     const handleShow2 = () => setShow2(true);

//   const [wishurl,setwishurl]=useState("https://cdn.lordicon.com/nvsfzbop.json");
//   const [ordered,setorderd]=useState([]);
//   const [cart,setcart]=useState(0);
//   const {wishlist,setwishlist}=useContext(wishcontext);
//   const {reviewlist,setreviewlist}=useContext(reviewcontext);
//   const [plants,setplants]=useState([]);
//   const {loggedin,setloggedin}=useContext(logcontext);
//   const {newplant,setnewplant}=useContext(newplantcontext);
//   const [checklogin,setchecklogin]=useState(false);
//   const [checki,setcheck]=useState(false);
//   const [reviewplant,setreviewplant]=useState();
//   const ref=useRef(null);
//   const [detail,setdetail]=useState();
//   const [info,setinfo]=useState();
// useEffect(()=>{
// console.log("details is: ",detail);
// },[detail])
// async function delay(d) {
//   return new Promise((res,rej)=>{
//     setTimeout(() => {
//       res();
//     }, d*1000);
//   })
// }

//  useEffect(()=>{

//  async function func(){
//  let ref=await getDocs(collection(db,"Plants"));

//   ref.forEach((doc)=>{
//   setplants(prev => [...prev, { name: doc.data().name, data: doc.data().data,status:false,price:doc.data().price,qty:1,info:doc.data().information}]);
//   })} 
//   func();
//  },[])

//  function find(ele)
// {
//   let arr2=[...ordered];
//   let idx=ordered.findIndex(element=>element.name==ele.name);
//   if(idx!=-1)
//   {
//   arr2[idx].qty++;
//   return arr2;
// }
// return -1;
// }

//  const handleorder=async (idx)=>{
//   setTimeout(() => {
//     toast.success('Item added into the cart!!!', {
//       position: "top-right",
//       autoClose: 1500,
//       hideProgressBar: false,
//       closeOnClick: false,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   }, 0);
//   let arr=[];
// setplants(()=>{
  
//   arr=[...plants];
//   let cnt=localStorage.getItem("cart")?parseInt(localStorage.getItem("cart")):0;
  
//     const ret=find(arr[idx]);
//     if(ret==-1)
//     {
      
//     setorderd([...ordered,arr[idx]]);
//     localStorage.setItem("ordered",JSON.stringify([...ordered,arr[idx]]));
//     cnt++;
//     }
//     else
//     {
//       setorderd(ret);
//       localStorage.setItem("ordered",JSON.stringify(ret));
//     }
//   localStorage.setItem("cart",cnt);
//   return arr;
// })
//  }

//  useEffect(()=>{
//   let arr=localStorage.getItem("ordered");
//   if(arr)
//   {
    
//     setorderd(JSON.parse(arr));
//     setcart(parseInt(localStorage.getItem("cart")));
//     console.log("checking somethingggg: ",parseInt(localStorage.getItem("cart")));
//   }
//  },[])

// useEffect(() => {
//   if (plants.length > 0 && ref.current) {
//     ref.current.style.display = 'none';
//   }
// }, [plants]);

// async function handlewish(e,ele){
//   const usr=auth.currentUser;
//   if(!usr)
//   {
//     alert('You must Log in to add an item to the wishlist!!');
//     return;
//   }
// if(e.target.src==="https://cdn.lordicon.com/nvsfzbop.json")
// {
//   setTimeout(() => {
//     toast.success('Item added to the wishlist!!', {
//       position: "top-right",
//       autoClose: 1500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   }, 0);

//   e.target.src="https://cdn.lordicon.com/ewmfucya.json";
//   setwishlist([...wishlist,ele]);
  
//   await setDoc(doc(db,"wishlist",usr.uid),{
//     wishlist:[...wishlist,ele]
//   });
// }
// else
// {
//   setTimeout(() => {
//       toast.success('Item removed from the Wishlist!!!', {
// position:"top-right",
// autoClose: 1500,
// hideProgressBar: false,
// closeOnClick: true,
// pauseOnHover: true,
// draggable: true,
// progress: undefined,
// theme: "light",
// });
//   }, 0);


//   e.target.src="https://cdn.lordicon.com/nvsfzbop.json"
//    let arr=wishlist.filter((element)=>{
//     return element!==ele;
//   })
//     await setDoc(doc(db,"wishlist",usr.uid),{
//     wishlist:arr
//   });
//  setwishlist(arr);
//  } 
// }

//   const submitform=async(data)=>{
//     handleClose();
//     const usr=auth.currentUser;
//     console.log("Received Data is: ",data, "for ",reviewplant);
//     setreviewlist([...reviewlist,{
//        user:usr.uid,
//       plant_reviewed: reviewplant.name,
//       plant_image: reviewplant.data
//     }])
//     await setDoc(doc(db,"reviews",usr.uid),{
//      reviews:[...reviewlist,{
//        user:usr.uid,
//       plant_reviewed: reviewplant.name,
//       plant_image: reviewplant.data
//     }]
//     })
    
//     setTimeout(() => {
//     toast('Review Submitted Successfully!!', {
//     position: "top-right",
//     autoClose: 1500,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "light",
//     });
//     }, 0);
//   }
  

// useEffect(()=>{
//   console.log("Wishlist is: ",wishlist);
// },[wishlist])
//   return (
    
//     <>
// <ToastContainer
// position="top-right"
// autoClose={1500}
// hideProgressBar={false}
// newestOnTop={false}
// closeOnClick={true}
// rtl={false}
// pauseOnFocusLoss
// draggable
// pauseOnHover
// theme="light"
// transition="Bounce"
// />
//       <div className="shoppage" style={{height:'100vh'}}>

     
//       <Nav/>
//       <div className="loading" ref={ref}>
//  <DotLottieReact  src="https://lottie.host/a537d24a-b75f-49d2-b989-9663fc8d8c67/ElKzzvk4iJ.lottie" loop style={{ height: "300px", width: "300px" }}
//                                                 autoplay /> 
//       </div>
          
//         <div className="con">
//         <div className="list">
          
       
          
//       {
//         plants.map((ele,idx)=>{
//           return(
                    
//             <div className={`box ${idx%2?'leftani':'rightani'}`} key={idx}>

//             <div className="pic">
//     <lord-icon
//     src={wishurl}
//     onClick={(e)=>{handlewish(e,ele)}}
//     trigger="hover"
//    >
// </lord-icon>
// <img src={"data:image/png;base64," + ele.data} alt="" /></div>
//             <div className="content2">
//                      <div className="price">
//                 <p style={{ marginBottom: "0rem" }}>$ {ele.price}</p>
//               </div>
//               <div className="name">
//                 <p>{ele.name}</p>
//               </div>
//               <div className="ratings">

//               </div>
//               <div className="add">
//                 <button type="button" onClick={()=>{
//                   handleorder(idx)
// }} className="addbtn btn btn-danger">Add to cart</button>
//               </div>
//               <div className="review">
//                 <button type='button' onClick={()=>{
//                   if(loggedin)
//                   {
//                     handleShow();
//                     setreviewplant(ele);
//                    return;
//                   }
//                   alert("You Must log in to add a review!!");
                  
//                   }}  className='rev btn btn-secondary'>Add a review</button>
//                   <button type='button' className='rev btn btn-secondary' onClick={()=>{
//                     handleShow2();
//                     setinfo(ele.info);
//                     setdetail({ele:ele,idx:idx});
//                   }}>More</button>
//               </div>
             
//                {
//         <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Add a review 📝</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="sellform">
//                <form  onSubmit={handleSubmit(submitform)} encType='multipart/form-data' >
//          {isSubmitting && <div>Loading...</div>}
//       <br />
//       <input type="text" placeholder="Enter your review about this plant" {...register("rev",{required:{value:true,message:"This field is required"}})} />
//       {errors.rev && <div className='message'>{errors.rev.message}</div>}
//       <hr />
      

//             <Modal.Footer>
         
//           <input disabled={isSubmitting} type="submit" value="Submit Now"/>
//            <Button variant="secondary" style={{width:'100%'}} onClick={handleClose}>
//             Cancel
//           </Button>
//         </Modal.Footer>
//      </form>
//           </div>
        
        
      
//         </Modal.Body>
  
//       </Modal>                  
//       }
//             </div>
//           </div>
//           )
//         })
        
//       }
//        { detail?
//         <Modal
//         show={show2}
//         onHide={handleClose2}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Find the details Here 💡</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="detailpage">
//             <div className="leftdetail">
//           <div className="img2">
//               <img src={"data:image/png;base64," + detail.ele.data} alt="" />
//             </div>
//             </div>
//             <div className="rightdetail">
//             <p>{info}</p>
//             </div>
//           </div>
//          <div className="add">
//                 <button type="button" onClick={()=>{
//                   handleorder(idx)
// }} className="addbtn btn btn-danger">Add to cart</button>
//               </div>
      
//         </Modal.Body>
  
//       </Modal>:<></>

//       }

//        </div>
           
//       </div>
//       <Footer  style={{top:'3vh'}}/>
      
//        </div>
//     </>
//   )
// }

// export default shop

import React from 'react'

const shop = () => {
  return (
    <div>
      
    </div>
  )
}

export default shop
