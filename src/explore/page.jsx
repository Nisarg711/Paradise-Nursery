import React from 'react'
import Footer from '../footer'
import './plant.css'
import { useState,useEffect,useRef } from 'react'
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
        
    </div>
    </div>
   
      </div>
    </div>
  )
}

export default page
