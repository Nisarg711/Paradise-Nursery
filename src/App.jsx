import { useState,useEffect } from 'react'
import { db } from './backend/firebase'
import { getDoc,doc, getDocs, collection } from 'firebase/firestore'
import { auth } from './backend/firebase'
import Sell from './sell'
import Home from "./home"
import Cart from "./cart"
import Profile from "./profile"
import Login from "./login"
import Signup from './signup'
import About from './about'
import Page from './explore/page'
import './logsin.css'
import './App.css'
import Footer from './footer'
import Shop from './shop'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import { countercontext } from './context/context'
import { ordercontext } from './context/context'
import { logcontext } from './context/context'
import { wishcontext } from './context/context'
import { checkoutcontext } from './context/context'
import { reviewcontext,newplantcontext,detailcontext } from './context/context'
function App() {
  const [cart, setcart] = useState(0);
  const [ordered,setorderd]=useState([]);
  const [checkout,setcheckout]=useState([]);
  const [loggedin,setloggedin]=useState(null);
  const [wishlist,setwishlist]=useState([]);
  const [reviewlist,setreviewlist]=useState([]);
  const [newplant,setnewplant]=useState([]);
  const [deepdetail,setdeepdetail]=useState([]);
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/shop',
      element:<Shop/>
    },{
      path:'/cart',
      element:<Cart/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/signup',
      element:<Signup/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/sell',
      element:<Sell/>
    },
    {
      path:'/footer',
      element:<Footer/>
    },
     {
      path:'/about',
      element:<About/>
    },{
      path:'/page/:plantid',
      element:<Page/>
    }

  ])

      const fetchdetails=()=>{
        auth.onAuthStateChanged(async(usr)=>{
          if(usr)
          {
        const uid=usr.uid;
            console.log("UID IS ",uid);
            const ref=doc(db,"userdetails",uid);
            let docs=await getDoc(ref);
            if(docs.exists())
            {
                console.log(docs.data());
                setloggedin(docs.data());
            }
            const ref2=doc(db,"wishlist",uid);
            let docs2=await getDoc(ref2);
            if(docs2.exists())
            {
              console.log("User has wishlist: ",docs2.data().wishlist);
              setwishlist(docs2.data().wishlist);
            }
            const ref3=doc(db,"orders",uid);
            let doc3=await getDoc(ref3);
            if(doc3.exists())
            {
              console.log("USer has ordered: ",doc3.data().orders);
              setcheckout(doc3.data().orders);
            }
            const ref4=doc(db,"reviews",uid);
            let doc4=await getDoc(ref4);
            if(doc4.exists())
            {
              console.log("USer has Reviews: ",doc4.data().reviews);
              setreviewlist(doc4.data().reviews);
            }
          }
            
        })
    }
  async function newfetch(){
   const newref=await getDocs(collection(db,"plants2"));
  newref.forEach((doc)=>{
   setnewplant(prev=> [...prev,{common_name:doc.data().common_name,other_name:doc.data().other_name[0],scientific_name:doc.data().scientific_name[0],url:doc.data().default_image}]);
  })
  const newref2=await getDocs(collection(db,"deepdetail"));
 newref2.forEach((doc)=>{
    setdeepdetail(prev=>[...prev,doc.data()]);
  })
}
    useEffect(()=>{
        fetchdetails();
        newfetch();
    },[])

  return (
    <> 
          <reviewcontext.Provider value={{reviewlist,setreviewlist}}>
          <checkoutcontext.Provider value={{checkout,setcheckout}}>
          <wishcontext.Provider value={{wishlist,setwishlist}}>
          <ordercontext.Provider value={{ordered,setorderd}}>
          <countercontext.Provider value={{cart,setcart}}>
          <logcontext.Provider value={{loggedin,setloggedin}}>
             <newplantcontext.Provider value={{newplant,setnewplant}}>
              <detailcontext.Provider value={{deepdetail,setdeepdetail}}>

                    <RouterProvider router={router}/>
                        </detailcontext.Provider>
                       </newplantcontext.Provider>
         
  
          </logcontext.Provider>  
          </countercontext.Provider>
          </ordercontext.Provider>
          </wishcontext.Provider>
          </checkoutcontext.Provider>
           </reviewcontext.Provider>
    </>
  )
}

export default App
