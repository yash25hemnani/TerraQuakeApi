import './App.css';
import ApiDocsEarthquakes from './components/apiDocs/apiDocsEarthquakes';
import Hero from './components/hero/hero';
import Info from './components/info/info';
import NavbarMenu from './components/navbar/navbarMenu';

function App() {
  return (
    <main>
      <div className='max-w-full min-h-screen items-center [background:radial-gradient(140%_140%_at_80%_20%,#000_40%,#63e_100%)] scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-800'>
        <NavbarMenu />
        <Hero />
        <Info />
        <ApiDocsEarthquakes />
      </div>
    </main>
  );
}

export default App;
