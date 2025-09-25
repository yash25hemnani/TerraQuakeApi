import MetaData from '@pages/noPage/metaData';

export default function Contact() {
  return (
    <>
      <MetaData
        title='About'
        description='About of TerraQuake API'
      />
      <section className='relative z-30 w-full min-h-screen px-6 py-20'>
        <h1 className='text-2xl md:text-4xl text-white font-extrabold text-center my-25 tracking-tight'>
          Contact TerraQuake API
        </h1>
      </section>
    </>
  );
}
