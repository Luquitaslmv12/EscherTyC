import React from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Servicios from './components/Servicios';
import Proyectos from './components/Proyectos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';
import Testimonios from './components/Testimonios';
import Presupuesto from './components/Presupuesto';
import ProyectosToldos from './components/ProyectosToldos';

const App = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <div className="bg-gradient-to-t from-sky-50 via-sky-600 to-sky-50 text-gray-800">
      <Servicios />
      <Proyectos />
      <ProyectosToldos />
      <Testimonios />
      {/* <Contacto /> */}
      <Presupuesto/>
      <Footer />
    </div>
    </div>
  );
};

export default App;