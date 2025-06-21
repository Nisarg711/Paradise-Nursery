import React, { createContext, useContext, useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import './home.css'
import Footer from './footer'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { countercontext, ordercontext,logcontext,checkoutcontext} from './context/context'
import Nav from './nav'
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './backend/firebase';
const cart = () => {
  const { cart, setcart } = useContext(countercontext);
  const [cart2,setcart2]=useState(0);
  const { ordered, setorderd } = useContext(ordercontext);
  const {checkout,setcheckout}=useContext(checkoutcontext);
  const [ordered2,setorderd2]=useState([]);
  const {loggedin,setloggedin}=useContext(logcontext);
  const [updated, setupdated] = useState(ordered);
  const [amount,setamount]=useState(0);
     const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isSubmitting},
  } = useForm()

  const options = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' }
  ];
useEffect(()=>{
  const arr=localStorage.getItem("ordered");
  if(arr)
  {
    setorderd2(JSON.parse(arr));
    setcart2(parseInt(localStorage.getItem("cart")));
  }
},[])

 
const updatelocalstorage=(temp)=>{
  let arr=localStorage.getItem("ordered");
  let cnt=localStorage.getItem("cart");
  if(arr)
  {
    localStorage.removeItem("ordered");
  }
  if(cnt)
    localStorage.removeItem("cart");
  localStorage.setItem("ordered",JSON.stringify(temp));
  localStorage.setItem("cart",temp.length);
}

  const handledelete=(ele)=>{

    setTimeout(() => {
     toast('Item removed from the cart!!', {
position: "top-center",
autoClose: 1500,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
}, 0);

  setorderd2(()=>{
   let temp= ordered2.filter((e)=>{
    console.log("checking ",ele.name);
    return ele.name!==e.name;
  })
    updatelocalstorage(temp);
    return temp;
  }
);
  }

  async function handlecheckout(){
    const usr=auth.currentUser;
  setcheckout(updated);
  await setDoc(doc(db,"orders",usr.uid),{
    orders:updated
  })


}

  const qtychange=(idx,e)=>{
    let arr=[];
    setorderd2(()=>{
      arr=[...ordered2];
      arr[idx]={...arr[idx],qty:e.target.value};
      console.log("Updated is: ",arr[idx].qty);
      return arr;
    })

  }

    useEffect(()=>{
    setupdated(ordered2);
    setcart(ordered2.length);
  },[ordered2]);

  useEffect(()=>{
    console.log("Update is: ",updated);
    let sum=0;
    updated.map((ele,idx)=>{
      sum+=ele.price * (ele.qty);
    })
    console.log("sum found is: ",sum);
    setamount(sum);
  },[updated])

  return (
    <div style={{background:'aliceblue'}}>
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
      <Nav />
      <div style={{height:'100vh'}}>
           
      
      <h3>Your Cart</h3>
      <div className="amount">Total amount <p>$ {amount}</p></div>
      <div className="lists">
       
        {
          updated.map((ele, idx) => {
            return (

              <div className="box2" key={idx}>
                <div className="lefti">
                  <div className="img">
                    <img src={ele.url.original_url} alt="" />
                  </div>
                  <div className="content3">
                    <div className="name"><p>{ele.common_name}</p></div>
                    <div className="price"><p>Price: {ele.price}</p></div>
                  </div>
                </div>

                <div className="right">
                  <div className="quantity">
                    <select  value={ele.qty} onChange={(e)=>{qtychange(idx,e)}} >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                    </select>
                    {/* <Select  options={options}  Value={ele.qty} onChange={(e)=>{qtychange(idx,e)}} /> */}
                  </div>
                  <div className="btn" onClick={()=>{handledelete(ele)}}>
                    <dotlottie-player src="https://lottie.host/e507fe75-1154-4f7a-8bac-fb19f3a40e71/nygsnCKmo9.lottie" background="transparent"></dotlottie-player>
                  </div>
                </div>

              </div>

            )
          })

        }

 
     
      </div>
      </div>
        <div className="checkout">
    <div className="check">
            <Button variant="primary" className='checkbtn' onClick={handleShow}>Check Out</Button>
            <div className="cont"><a href="/shop" target='blank' style={{color:'gray'}}>Continue Shopping</a></div>


     { loggedin?
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
    
            <p>Total Amount to be Paid:<b>{amount} $</b> </p>
       
        <Modal.Footer>
           <p style={{width:'100%'}}>Payment Mode:<b>Currently, we support COD only.</b></p>
          <Button variant="primary" style={{width:'100%'}} onClick={()=>{
            handlecheckout();
            handleClose()
toast.success('Order Placed Successfully', {
position: "top-center",
autoClose: 1500,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",

});
          }}>Place Order</Button>
           <Button variant="secondary" style={{width:'100%'}} onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
        </Modal.Body>
      </Modal>:
       <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>You must Log in To proceed with Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Modal.Footer>
         
          <Button variant="primary" style={{width:'100%'}} onClick={()=>{
            window.open('/login','_blank');
          }}>Log In now</Button>
           <Button variant="secondary" style={{width:'100%'}} onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
        </Modal.Body>
      </Modal>
}

    </div>

    </div>
          <Footer  style={{top:'0vh'}}/>
    </div>
  )
}

export default cart




