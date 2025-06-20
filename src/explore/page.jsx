import React from 'react'
import Footer from '../footer'
import './plant.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useState,useEffect,useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Lightbulb,RefreshCcwDot,ArrowUpWideNarrow,SquareActivity,Droplet,Sun,Leaf,Flower2,Apple,DoorClosed,BriefcaseMedical,Share2,Copy} from 'lucide-react';
import { CarouselCaption, CarouselItem } from 'react-bootstrap';
import { newplantcontext,detailcontext } from '../context/context';
import Button from 'react-bootstrap/Button';
import { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
  import { ToastContainer, toast } from 'react-toastify';
const page = () => {
     const [index, setIndex] = useState(0);
     const [sort,setsort]=useState(false);
     const {plantid}=useParams();
     const currid=Number(plantid);
     const {newplant,setnewplant}=useContext(newplantcontext);
     const [index2,setindex2]=useState(-1);
     const {deepdetail,setdeepdetail}=useContext(detailcontext);
     const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  useEffect(()=>{
          console.log("Detail array new: ",deepdetail);
},[deepdetail])
    useEffect(()=>{
      deepdetail.sort((a,b)=>a.id-b.id);
      setsort(true);
    },[deepdetail])

useEffect(()=>{
if(currid)
{
  let idx2=-1;
  deepdetail.forEach((ele,idx)=> {
  if(ele.id==currid)
   idx2=idx;
  });
  setindex2(idx2);
}

},[currid,deepdetail])
  return (
   
    <div className='page'>
      <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
 {
      deepdetail.length!=0 && index2>=0 && sort?
      <div className="plantcard">
       <Carousel activeIndex={index} onSelect={handleSelect} style={{borderRadius: '20px'}}>
      <Carousel.Item interval={1000}style={{borderRadius: '20px'}} >
       	<img  className='carimg2' src={deepdetail[index2].default_image.regular_url}/>
      </Carousel.Item>
       <CarouselItem interval={1500}>
           	<img  className='carimg' src="../new8.jpeg"/>
      <CarouselCaption>
       <h3 style={{color:'black'}}> <Button variant="warning"  onClick={()=>{
        window.open("/shop","_blank");}}>View More!!!</Button></h3> 
      </CarouselCaption>
    </CarouselItem>
    </Carousel>
    <div className="cardinner">
      
         <div className="plantname">
        <h3>{deepdetail[index2].common_name}<Copy style={{cursor:'pointer',position:'relative',left:'10px'}} onClick={()=>{
          let url=window.location.href;
          navigator.clipboard.writeText(url);
            toast.success('Link Copied to Clipboard!!', {
position: "top-right",
autoClose: 2000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
});
        }}/></h3>
        <p>{deepdetail[index2].scientific_name[0]}</p>
    </div>
    <div className="scientific">
        <h4>Also Known As - {deepdetail[index2].other_name[0]}</h4>
    </div>
    <div className="specific">
        <div className="description">
          <p style={{fontSize:'19px',display:'flex'}}><Lightbulb />You must know!!</p>
          <div className="sub">
          <p>{deepdetail[index2].description}</p>
          </div>
        </div>

            <div className="minute">
          
          <div className="sub" style={{display:'flex'}}>
          <div className="list1" style={{width:'50%'}}>
            <ul style={{listStyle:'none'}}>
              <li><RefreshCcwDot style={{height:'15px'}} />Cycle: {deepdetail[index2].cycle}</li>
              <li><ArrowUpWideNarrow style={{height:'15px'}} />Growth Rate: {deepdetail[index2].growth_rate}</li>
              <li><SquareActivity style={{height:'15px'}}/>Care level:{deepdetail[index2].care_level}</li>
               <li><Flower2 style={{height:'15px'}}/>Flowers: {deepdetail[index2].flowers}</li>
             <li><DoorClosed style={{height:'15px'}}/>Indoor Plant: {deepdetail[index2].indoor}</li>
            </ul>
          </div>
           <div className="list2" style={{width:'50%'}}>
            <ul style={{listStyle:'none'}}>
              <li><Droplet style={{height:'15px'}}/>Watering: {deepdetail[index2].watering}</li>
              <li><Sun style={{height:'15px'}}/>Sun: {deepdetail[index2].sunlight[0]}</li>  
              <li><Leaf style={{height:'15px'}}/>Leaf: {deepdetail[index2].leaf?"✅":"❌"}</li>
               <li><Apple  style={{height:'15px'}}/>Fruits: {deepdetail[index2].fruits?"✅":"❌"}</li>
                <li><BriefcaseMedical style={{height:'15px'}}/>Medicinal: {deepdetail[index2].medicinal?"✅":"❌"}</li>
            </ul>
          </div>
          </div>
        </div>
    </div>
    </div>
   
      </div>
      :<>  <div className="loading">
 <DotLottieReact  src="https://lottie.host/a537d24a-b75f-49d2-b989-9663fc8d8c67/ElKzzvk4iJ.lottie" loop style={{ height: "300px", width: "300px" }}
                                                autoplay /> 
      </div></>
      }
    </div>
  )
}

export default page
