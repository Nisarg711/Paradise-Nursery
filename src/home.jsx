import React from 'react'
import Footer from './footer'
import './home.css'
const home = () => {

  return (
    <div className='homecover' style={{height:'100vh'}}>

        <img className='bg' src="../public/background/new3.jpeg" alt=""  />
            <div className='homepage'>
        <div className="homeheading">
          <h1>Welcome To Paradise Nursery!!</h1>
          </div> 
          <div className="homecontent">
              <p >Welcome to Paradise Nursery, your one-stop destination for a vibrant collection of plants and flowers that bring life and beauty to any space. Whether you're a gardening enthusiast or a first-time plant parent, we offer a wide variety of indoor and outdoor plants, flowering species, and decorative greens to suit every need and style.</p>
                
                <p> At Paradise Nursery, we believe in nurturing nature and helping you create your own green paradise—right at home. Explore our selection and let your garden dreams take root!
</p>
 <div className="homebtn">
                <button style={{width:'100%',background:'black'}} type="button" class="btn btn-success" onClick={()=>{
                window.location.href="/shop"
                }}>Get Started</button>
            </div>
          </div>
           

    </div>
 

    <Footer style={{top:'100vh'}}/>
    </div>
  )
}

export default home




