import React, { useEffect,useState } from 'react'
import Nav from "./nav"
import { doc,getDocs,collection } from 'firebase/firestore'
import { db } from './backend/firebase'
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Footer from './footer'
import "./about.css"
const about = () => {
  const [wishurl,setwishurl]=useState("https://cdn.lordicon.com/nvsfzbop.json");
  const [plant1,setplant1]=useState([]);
  const [plant2,setplant2]=useState([]);
  const handleDragStart = (e) => e.preventDefault();
const items = [
  <img src="./new8.jpeg" onDragStart={handleDragStart} role="presentation" alt='1'/>,
  <img src="./cover2.jpeg" onDragStart={handleDragStart} role="presentation" alt='1'/>,
  <img src="./cover3.jpg" onDragStart={handleDragStart} role="presentation" alt='1'/>,
];
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
   const [plants,setplants]=useState([]);
  async function delay(d) {
    return new Promise((res,rej)=>{
      setTimeout(() => {
        res();
      }, d*1000);
    })
  }
  
 useEffect(()=>{

 async function func(){
 let ref=await getDocs(collection(db,"Plants"));

  ref.forEach((doc)=>{
  setplants(prev => [...prev, { name: doc.data().name, data: doc.data().data,status:false,price:doc.data().price,qty:1,info:doc.data().information}]);
  })} 
  func();
 },[])
useEffect(()=>{
setplant1(plants.slice(0,Math.floor(plants.length / 2)));
setplant2(plants.slice(Math.floor(plants.length / 2)));

},[plants])
useEffect(()=>{
  console.log("Plants are: ",plants);
},[plants])
  return (
    <div>
      <Nav/>
      <div>
        <h2 style={{textAlign:'center', color:'gray'}}>About Paradise Nursery</h2>
        <div className="abcontent">
                <p><b><strong>Paradise Nursery</strong></b><span>&nbsp;</span>germinated in June 2025 with a promise to provide a platform for everyone to connect to nature</p>
<p>Having plants in our homes or in our offices doesn’t just look good, it also boosts our mood, makes us more productive, and cleans the air around us. Living in a helathy environment has a great impact on our life</p>
<p>Most of us being urban dwellers spending their days in apartments with limited access to parks and ecological reserves, have no way of feeling close to nature and experiencing the benefits of being around plants.</p>
<p>Ordering a pizza is easy but ever heard of ordering a plant to your doorstep? This is where nurserylive comes in.</p>
<p>We believe that Green is Good and are here to enable Indians to access plants in the easiest way possible – online! We are here to shape the future of gardening!</p>
<p>A one-stop-shop for all gardening related requirements, nurserylive has more than 6000 products available online for delivery across India saving you numerous messy trips to various nurseries.</p>
<p>We cater to all kinds of gardening needs ranging from plants, pots, tools, to curated plant-scaping solutions. Our ever-growing platform integrates nurseries and customers across India.&nbsp;</p>
<p>If you’re new to being a plant parent, we’re here to make it easier. Our garden experts can provide you with guidance for detailed care every step of the way.</p>
<p>Having served a network of 1 million happy plant parents, we can assure you that once you order a plant from us, you will emerge with your own home-grown veggies!</p>
<p>We believe that every space can be made more beautiful with plants! Come, join us in our vision to make all spaces green and healthy!&nbsp;</p>
<p><b><strong>How we work</strong></b></p>
<p>Add a touch of green to your home/office in three simple steps and become a plant parent</p>
<ol>
<li>
<span></span><b><strong>Plants, simplified</strong></b>: Order plants ready to be placed in your home, office or garden. Just Unpack, Relax and Enjoy your green buddies</li>
<li>
<span></span><b><strong>Secure Shipping</strong></b>: Our unique packaging will hold the plants in place and let the plant breathe so that it reaches you fresh without any mess.</li>
<li>
<span></span><b><strong>Detailed Guidance</strong></b>: Get detailed plant care instructions from the website as well as real-time guidance from our Garden Experts on Whatsapp.</li>
</ol>
        </div>

    </div>
      <h2 style={{textAlign:'center', color:'gray'}}>You may like these...</h2>
       <Carousel style={{background:'gainsboro',height:'440px',display:'flex',alignItems:'center'}} activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item interval={2500}> 
            <div className="abitems">
              {

     plant1.map((ele,idx)=>{
          return(
                  
            <div className={`box `} style={{margin:'10px'}} key={idx}>

            <div className="pic flex" style={{justifyContent:'center'}}>
<img src={"data:image/png;base64," + ele.data} alt="" /></div>
            <div className="content2">
                     <div className="price">
                <p style={{ marginBottom: "0rem" }}>$ {ele.price}</p>
              </div>
              <div className="name">
                <p>{ele.name}</p>
              </div>
              <div className="ratings">

              </div>
              <div className="add">
                <button type="button" onClick={()=>{
                  handleorder(idx)
}} className="addbtn btn btn-danger">Add to cart</button>
              </div>
              <div className="review">
                  <button style={{width:'100%'}} type='button' className='rev btn btn-secondary'>Go to shop page</button>
              </div>
            </div>
          </div>
       
          )
        })
        }
            </div>


    </Carousel.Item > 
   <Carousel.Item interval={2500}> 
     <div className="abitems">
      {

     plant2.map((ele,idx)=>{
          return(
                  
            <div className={`box`}style={{margin:'10px'}} key={idx}>

            <div className="pic flex" style={{justifyContent:'center'}}>
<img src={"data:image/png;base64," + ele.data} alt="" /></div>
            <div className="content2">
                     <div className="price">
                <p style={{ marginBottom: "0rem" }}>$ {ele.price}</p>
              </div>
              <div className="name">
                <p>{ele.name}</p>
              </div>
              <div className="ratings">

              </div>
              <div className="add">
                <button type="button" onClick={()=>{
                  handleorder(idx)
}} className="addbtn btn btn-danger">Add to cart</button>
              </div>
              <div className="review">
                  <button style={{width:'100%'}} type='button' className='rev btn btn-secondary'>Go to shop page</button>
              </div>
            </div>
          </div>
       
          )
        })
        }      
    </div>


    </Carousel.Item> 

    </Carousel>
    <div className="check" style={{position:'relative',top:'10vh'}}>
      <button type="button" onClick={()=>{
        window.open("/shop","_blank");
}} className="checkbtn btn btn-danger">Shop now</button>
    </div>
      <Footer style={{top:'20vh'}}/>
    </div>
  )
}

export default about
