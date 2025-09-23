import MetaData from '@pages/noPage/metaData';
import ApiPlayground from '@/components/apiPlayground/ApiPlayground.jsx';
import '@/components/apiPlayground/apiPlayground.css';

export default function ExploreData() {
  const earthquakesEndpoints = [
    { key: 'recent', label: 'recent', method: 'GET', path: '/api/earthquakes/recent', description: 'Latest seismic events', params: [ { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' } ] },
    { key: 'today', label: 'today', method: 'GET', path: '/api/earthquakes/today', description: 'Today seismic events', params: [ { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' } ] },
    { key: 'last-week', label: 'last-week', method: 'GET', path: '/api/earthquakes/last-week', description: 'Last 7 days', params: [ { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' } ] },
    { key: 'month', label: 'month', method: 'GET', path: '/api/earthquakes/month', description: 'By month/year', params: [ { name: 'year', label: 'year', placeholder: '2025', defaultValue: '2025', required: true }, { name: 'month', label: 'month', placeholder: '03', defaultValue: '03', required: true }, { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' } ] },
    { key: 'location', label: 'location', method: 'GET', path: '/api/earthquakes/location', description: 'Near lat/lon', params: [ { name: 'lat', label: 'lat', placeholder: '41.7142', required: true }, { name: 'lon', label: 'lon', placeholder: '15.9577', required: true }, { name: 'radius', label: 'radius (km)', placeholder: '10' }, { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' } ] },
    { key: 'region', label: 'region', method: 'GET', path: '/api/earthquakes/region', description: 'By Italian region', params: [ { name: 'region', label: 'region', placeholder: 'Campania', required: true }, { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' } ] },
    { key: 'depth', label: 'depth', method: 'GET', path: '/api/earthquakes/depth', description: 'By focal depth (km)', params: [ { name: 'depth', label: 'depth (km)', placeholder: '10', required: true }, { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' } ] },
    { key: 'range-time', label: 'range-time', method: 'GET', path: '/api/earthquakes/range-time', description: 'By time range', params: [ { name: 'startdate', label: 'startdate', placeholder: 'YYYY-MM-DD', required: true }, { name: 'enddate', label: 'enddate', placeholder: 'YYYY-MM-DD', required: true }, { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' } ] },
    { key: 'magnitude', label: 'magnitude', method: 'GET', path: '/api/earthquakes/magnitude', description: 'Min magnitude', params: [ { name: 'mag', label: 'mag', placeholder: '1', required: true }, { name: 'limit', label: 'limit', placeholder: '50', defaultValue: '50' } ] },
    { key: 'eventId', label: 'eventId', method: 'GET', path: '/api/earthquakes/eventId', description: 'By event ID', params: [ { name: 'eventId', label: 'eventId', placeholder: '44061482', required: true } ] },
  ];

  return (
    <>
       <MetaData title="Explore Data" description="Explore data page of TerraQuake" />
      <section className='relative z-30 w-full min-h-screen flex flex-col items-center text-center px-6 py-20 bg-gradient-to-b text-white'>
        <h1 className='lg:w-xl text-xl mx-auto md:text-2xl font-extrabold leading-tight mt-[50px]'>
          Explore Data
        </h1>
        <div className='w-full mt-10'>
          <ApiPlayground title="Earthquakes" endpoints={earthquakesEndpoints} />
        </div>
      </section>
    </>
  )
}
