import './App.css';
import Hero from './components/hero/hero';
import Info from './components/info/info';
import NavbarMenu from './components/navbar/navbarMenu';

function App() {
  return (
    <>
      <div className='relative inset-0 z-10 min-h-screen w-full items-center px-5 py-24 [background:radial-gradient(140%_140%_at_80%_20%,#000_40%,#63e_100%)] scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-800'>
        <NavbarMenu />
        <Hero />
        <Info />
      </div>
    </>
  );
}

export default App;
