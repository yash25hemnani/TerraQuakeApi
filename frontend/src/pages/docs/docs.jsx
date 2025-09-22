import React from 'react';
import MetaData from '../noPage/metaData';

export default function Docs() {
  return (
    <>
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
