import './App.css';

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import NavbarMenu from './components/navbar/navbarMenu';
import createStar from './components/utils/createStar';

import Home from './pages/home/home';
import ExploreData from './pages/exploreData/exploreData';
import ApiAccess from './pages/apiAccess/apiAccess';
import UseCases from './pages/useCases/useCases';
import About from './pages/about/about';
import NoPage from './pages/noPage/noPage';
import Footer from './components/footer/footer';

function App() {

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     createStar()
  //   }, 300); // crea una stella ogni 300ms

  //   return () => clearInterval(interval) // pulizia
  // }, []);

  return (
    <BrowserRouter>
      <main>
        <div className='max-w-full min-h-screen items-center [background:radial-gradient(140%_140%_at_80%_20%,#000_40%,#63e_100%)] scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-800'>
          <div className='sky'>
            <div className='stars'></div>
          </div>
          <NavbarMenu />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/explore-data' element={<ExploreData />} />
            <Route path='/api-access' element={<ApiAccess />} />
            <Route path='/use-cases' element={<UseCases />} />
            <Route path='/about' element={<About />} />
            <Route path='*' element={<NoPage />} />
          </Routes>
          <Footer />
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
