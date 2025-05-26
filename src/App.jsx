import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Servicios from './components/Servicios';
import Proyectos from './components/Proyectos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Testimonios from './components/Testimonios';

const App = () => {
  return (
    <div className="bg-white text-gray-800">
      <Navbar />
      <Banner />
      <Servicios />
      <Proyectos />
      <Testimonios />
      <Contacto />
      <Footer />
    </div>
  );
};

export default App;