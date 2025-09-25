import MetaData from '@pages/noPage/metaData';
import ApiPlayground from '@/components/apiPlayground/ApiPlayground.jsx';
import '@/components/apiPlayground/apiPlayground.css';

export default function ExploreData() {
  const earthquakesEndpoints = [
    {
      key: 'recent',
      label: 'recent',
      method: 'GET',
      path: '/v1/earthquakes/recent',
      description: 'Latest seismic events',
      params: [
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'today',
      label: 'today',
      method: 'GET',
      path: '/v1/earthquakes/today',
      description: 'Today seismic events',
      params: [
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'last-week',
      label: 'last-week',
      method: 'GET',
      path: '/v1/earthquakes/last-week',
      description: 'Last 7 days',
      params: [
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'month',
      label: 'month',
      method: 'GET',
      path: '/v1/earthquakes/month',
      description: 'By month/year',
      params: [
        {
          name: 'year',
          label: 'year',
          placeholder: '2025',
          defaultValue: '2025',
          required: true,
        },
        {
          name: 'month',
          label: 'month',
          placeholder: '03',
          defaultValue: '03',
          required: true,
        },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'location',
      label: 'location',
      method: 'GET',
      path: '/v1/earthquakes/location',
      description: 'Near lat/lon',
      params: [
        {
          name: 'latitude',
          label: 'latitude',
          placeholder: '41.7142',
          required: true,
        },
        {
          name: 'longitude',
          label: 'longitude',
          placeholder: '15.9577',
          required: true,
        },
        { name: 'radius', label: 'radius (km)', placeholder: '10' },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'region',
      label: 'region',
      method: 'GET',
      path: '/v1/earthquakes/region',
      description: 'By Italian region',
      params: [
        {
          name: 'region',
          label: 'region',
          placeholder: 'Campania',
          required: true,
        },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'depth',
      label: 'depth',
      method: 'GET',
      path: '/v1/earthquakes/depth',
      description: 'By focal depth (km)',
      params: [
        {
          name: 'depth',
          label: 'depth (km)',
          placeholder: '10',
          required: true,
        },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'range-time',
      label: 'range-time',
      method: 'GET',
      path: '/v1/earthquakes/range-time',
      description: 'By time range',
      params: [
        {
          name: 'startdate',
          label: 'startdate',
          placeholder: 'YYYY-MM-DD',
          required: true,
        },
        {
          name: 'enddate',
          label: 'enddate',
          placeholder: 'YYYY-MM-DD',
          required: true,
        },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'magnitude',
      label: 'magnitude',
      method: 'GET',
      path: '/v1/earthquakes/magnitude',
      description: 'Min magnitude',
      params: [
        { name: 'mag', label: 'mag', placeholder: '1', required: true },
        {
          name: 'limit',
          label: 'limit',
          placeholder: '50',
          defaultValue: '50',
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
    {
      key: 'eventId',
      label: 'eventId',
      method: 'GET',
      path: '/v1/earthquakes/eventId',
      description: 'By event ID',
      params: [
        {
          name: 'eventId',
          label: 'eventId',
          placeholder: '44061482',
          required: true,
        },
        {
          name: 'page',
          label: 'page',
          placeholder: '1',
          defaultValue: '1',
        },
      ],
    },
  ];

  return (
    <>
      <MetaData
        title='Explore Data'
        description='Explore Data of TerraQuake API'
      />
      <section className='relative z-30 w-full min-h-screen px-6 py-20'>
        <div className='flex flex-col justify-center items-center mb-16'>
          <h1 className='text-2xl md:text-4xl text-white font-extrabold text-center mb-5 tracking-tight'>
            Explore Data for TerraQuake API
          </h1>

          {/* Descrizione visibile */}
          <p className='text-white text-lg w-[95%] lg:w-6xl'>
            Welcome to the <strong>TerraQuake API Playground</strong>! Here, you
            can explore and interact with earthquake data in real time. Use the
            playground to test API queries with different parameters such as
            magnitude, location, or time range, view results in raw JSON format,
            and copy ready-to-use code snippets for <code>curl</code>,
            JavaScript (<code>fetch</code> or <code>axios</code>), and Python (
            <code>requests</code>).
          </p>
        </div>

        <div className='w-full mt-10'>
          <ApiPlayground
            title='Earthquakes'
            endpoints={earthquakesEndpoints}
          />
        </div>
      </section>
    </>
  );
}
