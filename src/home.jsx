import React from 'react'
import Footer from './footer'
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import './home.css'
import './homereal.css'
import Carousel from 'react-bootstrap/Carousel';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { Search,ShoppingCart } from 'lucide-react';
const home = () => {
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
  return (
    <div className='homecover' style={{height:'100vh'}}>
      <div className="homeheading flex">
      <div className="logos flex">
      <div className="logoimg">
   
      <img src="./logo.png" alt="" />
      </div>
      </div>
      <div className="searchbar flex">
      <input type="text" name="" id="" placeholder='What are you looking for?'/>
      <div className="searchlogo">
      <Search/>
      </div>

      </div>
      <div className="cart">
      <ShoppingCart onClick={()=>{
        window.open("/cart","_blank");
      }} />
      </div>
      </div>
       {/* <AliceCarousel autoPlay={true} mouseTracking items={items} autoPlayInterval={1000} infinite={true} /> */}
      <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item interval={1000} >
       	<img src="./new8.jpeg"/>
        <Carousel.Caption>
          <h3>Welcome To Paradise Nursery</h3>
          <p>Your one-stop destination for a vibrant collection of plants and flowers that bring life and beauty to any space.</p>
          <Button>Know More</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       	<img src="./cover2.jpeg"/>
        <Carousel.Caption>
          <h3>A Real Paradise!!!</h3>
          <p>we believe in nurturing nature and helping you create your own green paradise—right at home. Explore our selection and let your garden dreams take root!
</p>
<Button>About us</Button>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        	<img src="./cover3.jpg"/>
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

    <Footer style={{top:'100vh'}}/>
    </div>
  )
}

export default home




