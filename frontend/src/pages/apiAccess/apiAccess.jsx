import MetaData from '@pages/noPage/metaData';

export default function ApiAccess() {
  return (
    <>
      <MetaData
        title='API Access'
        description='API Access for TerraQuake API'
      />
      <section className='relative z-30 w-full min-h-screen px-6 py-20'>
        {/* Page header */}
        <div className='flex flex-col justify-center items-center mb-16'>
          <h1 className='text-2xl md:text-4xl text-white font-extrabold text-center mb-5 tracking-tight'>
            API Access for TerraQuake API
          </h1>

          <p className='text-white text-lg w-[95%] lg:w-6xl'>
           
          </p>
        </div>
      </section>
    </>
  );
}
