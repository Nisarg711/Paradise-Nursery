import React, { useEffect } from 'react'
import { auth } from './backend/firebase';
import Footer from './footer'
import { ToastContainer, toast } from 'react-toastify';
import { deleteUser, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { useContext,useState } from 'react';
import {remove,ref} from 'firebase/database'
import { wishcontext,checkoutcontext } from './context/context';
import { db } from './backend/firebase';
import { getDoc,doc,deleteDoc, setDoc } from 'firebase/firestore'
import './profile.css'
import Nav from './nav'
import { logcontext } from './context/context';
import { Navigate } from 'react-router-dom';
const profile = () => {
      const {wishlist,setwishlist}=useContext(wishcontext);
      const {checkout,setcheckout}=useContext(checkoutcontext);
      const [display,setdisplay]=useState('f');
      const {loggedin,setloggedin}=useContext(logcontext);
      const [questions,setquestions]=useState([
        "What types of plants do you sell?","Are flowering plants available all year round?","Can you help me choose the right plant for my home or office?","Do you provide guidance on how to care for the plants?","Do you sell pots and decorative planters as well?","Is home delivery available for plants and other items?","Can I place a bulk order for events or corporate gifting?","What payment options do you accept?"
      ])
      const [answers,setanswers]=useState(["We offer a wide variety of plants including indoor, outdoor, flowering, air-purifying, medicinal, and decorative plants. Whether you're looking for a low-maintenance succulent or a vibrant blooming flower, we have something for everyone.","Yes, we maintain a rotating stock of seasonal and perennial flowering plants throughout the year. Availability may vary slightly depending on the season and growing conditions.",`Absolutely! Just tell us about your space, lighting, and maintenance preferences, and we'll suggest plants that fit your needs perfectly. Personalized recommendations are part of our service`,`Yes, every plant comes with basic care instructions to help you keep it healthy. You can also contact us for detailed advice or tips at any time.`,`Yes, we have a wide range of pots and planters in various sizes, materials, and designs. From simple clay pots to designer planters, we’ve got something to match every aesthetic.`,`Yes, we offer home delivery within our service areas. Your plants will be carefully packed and delivered to your doorstep in fresh and healthy condition.`,`Yes, we cater to bulk orders for weddings, parties, festivals, and corporate gifting.`,`We can also customize plant selections and packaging as per your requirements.We accept a variety of payment methods including UPI, credit/debit cards, net banking, and cash on delivery for local orders. We aim to make your shopping experience seamless.`]);
      async function delay(d){
        return new Promise((res,rej)=>{
          setTimeout(() => {
              res();
          }, d*1000);
        })
      }
      useEffect(()=>{
        console.log("Logged is: ",loggedin);
      },[loggedin])

      const handlesignout=()=>{
        auth.signOut();
         window.location.href="/signup";
      }
    async function handledeleteaccount(){
      const usr=auth.currentUser;
      console.log("user is: ",usr);
      const id=usr.uid;
       const docref=doc(db,"userdetails",id);
      const docs=await getDoc(docref);
     const credentials=EmailAuthProvider.credential(docs.data().email,docs.data().password);
     reauthenticateWithCredential(usr,credentials).then(async ()=>{
     const check=await deleteDoc(doc(db,"userdetails",usr.uid));
     console.log("checkign this: ",check);
      deleteUser(usr).then(async ()=>{
        setloggedin(null);
          toast('Account Deleted Successfully', {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
        await delay(1.5);
        window.location.href="/signup";
      })
     }).catch((err)=>{
      alert('error with cred: ',err.message);
     })
    }
    const deletewish=(ele)=>{
      let arr=wishlist.filter((e)=>{
        return e!==ele;
      })
      setwishlist(arr);
    }
    
    useEffect(()=>{
      async function firewish()
      {
        let usr=auth.currentUser;
        if(usr)
        {
        await setDoc(doc(db,"wishlist",auth.currentUser.uid),{
        wishlist:wishlist
        })
        }

      }
      firewish();
    },[wishlist])
    const handledisplay=(e)=>{
      setdisplay(e);
    }
    useEffect(()=>{
    },[display])

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
     {loggedin &&
        <div className='profcover' style={{width:'100vw', height:'100vh'}}>
      
      <div className="prof">
        <div className="card1">

        <div className="card1top" style={{display:'flex'}}>
          <div className="dp"><lord-icon
    src="https://cdn.lordicon.com/hroklero.json"
    trigger="hover"
    style={{background: 'wheat', borderRadius: '100%', height:'45px', width:'45px'}}>
</lord-icon></div>
          <div className="name"><p style={{marginBottom:'0rem',fontSize: 'x-small'}}>Hello,</p><p style={{fontWeight:'bold',marginBottom:'0rem'}}>{loggedin.name}</p></div>
        </div>
        <div className="card1bot">
          <div className="faqs items" onClick={()=>{handledisplay('f')}}  style={{background:(display==='f')?'gainsboro':'white'}}>
<dotlottie-player
  src="https://lottie.host/2c383102-a3ab-4974-b6e1-f9a2939cc423/UbhHGzCFkA.lottie"
  background="transparent"
  speed="1"
  style={{width: '32px',height: '32px'}}
  loop
  autoplay
></dotlottie-player>
FAQs
          </div>
          <hr style={{height:'1px'}} />
        <div className="orders items"   onClick={()=>{handledisplay('o')}}  style={{background:(display==='o')?'gainsboro':'white'}}><lord-icon
    src="https://cdn.lordicon.com/tbabdzcy.json"
    trigger="hover"
    >
</lord-icon>Your Orders</div>
<hr style={{height:'1px'}} />
       <div className="wishlist items" onClick={()=>{handledisplay('w')}} style={{background:(display==='w')?'gainsboro':'white'}}>
        <lord-icon
    src="https://cdn.lordicon.com/ewmfucya.json"
    trigger="hover">
</lord-icon>
Wishlist</div>
       <hr style={{height:'1px'}} />
       <div className="sell items" onClick={()=>{
       window.open('/sell','_blank');
       }}>
        <lord-icon
    src="https://cdn.lordicon.com/gochcofk.json"
    trigger="hover">
</lord-icon>
Sell a Plant
       </div>
              <hr style={{height:'1px'}} />
       <div className="logout items" onClick={handlesignout}>
        <dotlottie-player
  src="https://lottie.host/78e0e89a-c67c-4013-9c57-e968a0654f87/z6Xg8B0K62.lottie"
  background="transparent"
  speed="1"
  style={{width: '32px',height: '32px'}}
  loop
  autoplay
></dotlottie-player>
        Log Out</div>
       <hr style={{height:'1px'}} />
       <div className="delete items" onClick={handledeleteaccount} style={{justifyContent:'center',color:'red'}}>Delete Account</div>
        </div>

        </div>
        <div className="card2">
        {(display==='f')?
        questions.map((ele,idx)=>{
          return(
            <div key={idx}>
            <p><b>{idx+1}.{ele}</b> </p>
             <p><b>A.</b>{answers[idx]}</p>
            </div>
           
          )
         
        })
        :((display==='w')?
         
          wishlist.map((ele, idx) => {
            return (

              <div className="box21" key={idx}>
                <div className="lefti">
                  <div className="img2">
                    <img src={"data:image/png;base64," + ele.data} alt="" />
                  </div>
                  <div className="content3">
                    <div className="name"><p>{ele.name}</p></div>
                    <div className="price"><p>Price: ${ele.price}</p></div>
                  </div>
                </div>

              <div className="right">
                  <div className="btn" onClick={()=>{deletewish(ele)}}>
                    <dotlottie-player src="https://lottie.host/e507fe75-1154-4f7a-8bac-fb19f3a40e71/nygsnCKmo9.lottie" background="transparent" style={{ height: "30px", width: "30px" }}></dotlottie-player>
                  </div>
                </div>
              </div>
            )
          })
            
        :((display==='o')?
         
          checkout.map((ele, idx) => {
            return (

              <div className="box21" key={idx}>
                <div className="lefti">
                  <div className="img2">
                    <img src={"data:image/png;base64," + ele.data} alt="" />
                  </div>
                  <div className="content23">
                    <div className="name"><p>{ele.name}</p></div>
                    <div className="price"><p>Price: ${ele.price}</p></div>
                    <div className="qtypurchased"><p>Qty: {ele.qty}</p></div>
                  </div>
                </div>

              <div className="right">
            
                </div>
              </div>
            )
          })
            
        :<></>))
        }
        </div>
      </div>
    </div>
          }
          <Footer  style={{top:'0vh'}} />
    </>
  
  )
}

export default profile



