import React from 'react'
import Navbar from '../sections/Navbar'
import Hero from '../sections/Hero'
import Products from '../sections/Products'
import Ish from '../sections/Ish'
import Numbers from '../sections/Numbers'
import Contact from '../sections/Contact'
import Footer from "../sections/Footer.jsx";


const Home = () => {
  return (
    <div id='home'>
      <Navbar />     
      <Hero />  
      <Products/>
      <Ish />
      <Numbers />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home

