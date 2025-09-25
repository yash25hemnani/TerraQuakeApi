import React from 'react';
import MetaData from '../noPage/metaData';

export default function Docs() {
  return (
    <>
    <MetaData
            title='Docs'
            description='Docs for TerraQuake API'
          />
          <section className='relative z-30 w-full min-h-screen px-6 py-20'>
            {/* Page header */}
            <div className='flex flex-col justify-center items-center mb-16'>
              <h1 className='text-2xl md:text-4xl text-white font-extrabold text-center mb-5 tracking-tight'>
                Docs for TerraQuake API
              </h1>
    
              <p className='text-white text-lg w-[95%] lg:w-6xl'>
               
              </p>
            </div>
          </section>

      <MetaData
        title='Docs'
        description='Documentation Page of TerraQuake'
      />
      <section className='relative z-30 w-full min-h-screen flex flex-col items-center text-center px-6 py-20 bg-gradient-to-b text-white'>
        <h1 className='lg:w-xl text-xl mx-auto md:text-2xl font-extrabold leading-tight mt-[50px]'>
          Docs
        </h1>
      </section>
    </>
  );
}
