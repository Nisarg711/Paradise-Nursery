import React from 'react'
import Footer from '../footer'
import './plant.css'
import { useState,useEffect,useRef } from 'react'
import { Lightbulb,RefreshCcwDot,ArrowUpWideNarrow,SquareActivity,Droplet,Sun,Leaf,Flower2,Apple,DoorClosed,BriefcaseMedical} from 'lucide-react';
import { CarouselCaption, CarouselItem } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
const page = () => {

     const [index, setIndex] = useState(0);
     const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div className='page'>
      <div className="plantcard">
       <Carousel activeIndex={index} onSelect={handleSelect} style={{borderRadius: '20px'}}>
      <Carousel.Item interval={1000}style={{borderRadius: '20px'}} >
       	<img  className='carimg2' src="../new8.jpeg"/>
        <Carousel.Caption>
          <h3>Welcome To Paradise Nursery</h3>
          <p>Your one-stop destination for a vibrant collection of plants and flowers that bring life and beauty to any space.</p>
          <Button>Know More</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       	<img className='carimg2' src="./cover2.jpeg"/>
        <Carousel.Caption>
          <h3>A Real Paradise!!!</h3>
          <p>we believe in nurturing nature and helping you create your own green paradise—right at home. Explore our selection and let your garden dreams take root!
</p>
<Button onClick={()=>{
        window.open("/about","_blank");}}>About us</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        	<img className='carimg2' src="./cover3.jpg"/>
        <Carousel.Caption>
          <h3>Visit Our Shop</h3>
          <p>
            We sell a variety of flowering and non flowering plants. Have a look!!!
          </p>
          <Button onClick={()=>{
            window.open('/shop','_blank');
          }}>Shop now</Button>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <div className="cardinner">
         <div className="plantname">
        <h3>XYZ</h3>
    </div>
    <div className="scientific">
        <h4>pqrs</h4>
    </div>
    <div className="specific">
        <div className="description">
          <p style={{fontSize:'19px',display:'flex'}}><Lightbulb />You must know!!</p>
          <div className="sub">
          <p>European Silver Fir (Abies alba) is an amazing coniferous species native to mountainous regions of central Europe and the Balkans. It is an evergreen tree with a narrow, pyramidal shape and long, soft needles. Its bark is scaly grey-brown and its branches are highly ornamental due to its conical-shaped silver-tinged needles. It is pruned for use as an ornamental evergreen hedging and screening plant, and is also popular for use as a Christmas tree. Young trees grow quickly and have strong, flexible branches which makes them perfect for use as windbreaks. The European Silver Fir is an impressive species, making it ideal for gardens and public spaces.</p>
          </div>
        </div>

            <div className="minute">
          
          <div className="sub" style={{display:'flex'}}>
          <div className="list1" style={{width:'50%'}}>
            <ul style={{listStyle:'none'}}>
              <li><RefreshCcwDot style={{height:'15px'}} />Cycle:</li>
              <li><ArrowUpWideNarrow style={{height:'15px'}} />Growth Rate:</li>
              <li><SquareActivity style={{height:'15px'}}/>Care level:</li>
               <li><Flower2 style={{height:'15px'}}/>Flowers:</li>
             <li><DoorClosed style={{height:'15px'}}/>Indoor Plant:</li>
   
            </ul>
          </div>
           <div className="list2" style={{width:'50%'}}>
            <ul style={{listStyle:'none'}}>
              <li><Droplet style={{height:'15px'}}/>Watering:</li>
              <li><Sun style={{height:'15px'}}/>Sun:</li>  
              <li><Leaf style={{height:'15px'}}/>Leaf:</li>
               <li><Apple  style={{height:'15px'}}/>Fruits:</li>
                <li><BriefcaseMedical style={{height:'15px'}}/>Medicinal:</li>

            </ul>
          </div>
          </div>
        </div>
    </div>
    </div>
   
      </div>
    </div>
  )
}

export default page
