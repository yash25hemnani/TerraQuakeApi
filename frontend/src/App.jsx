import './App.css';
import { useEffect } from 'react';
import ApiDocsEarthquakes from './components/apiDocs/apiDocsEarthquakes';
import Hero from './components/hero/hero';
import Info from './components/info/info';
import NavbarMenu from './components/navbar/navbarMenu';

function App() {

  // Funzione per creare animazione di stelle
  const createStar = () => {
    const star = document.createElement('div')
    star.className = 'star'
    star.style.left = `${Math.random() * 100}vw`
    star.style.top = `${Math.random() * 100}vh`
    star.style.animationDuration = `${Math.random() * 10 + 1}s`
    document.body.appendChild(star)

    // Elimina la stella dopo l'animazione
    setTimeout(() => {
      star.remove()
    }, 1000)
  }

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
