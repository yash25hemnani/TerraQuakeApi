import './App.css';
import { useEffect } from 'react';
import ApiDocsEarthquakes from './components/apiDocs/apiDocsEarthquakes';
import Hero from './components/hero/hero';
import Info from './components/info/info';
import NavbarMenu from './components/navbar/navbarMenu';
import createStar from './components/utils/createStar';

function App() {

  useEffect(() => {
    const interval = setInterval(() => {
      createStar()
    }, 300); // crea una stella ogni 300ms

    return () => clearInterval(interval) // pulizia
  }, []);

  return (
    <main>
      <div className='max-w-full min-h-screen items-center [background:radial-gradient(140%_140%_at_80%_20%,#000_40%,#63e_100%)] scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-800'>
        <div className='sky'>
          <div className='stars'></div>
        </div>
        <NavbarMenu />
        <Hero />
        <Info />
        <ApiDocsEarthquakes />
      </div>
    </main>
  );
}

export default App;
