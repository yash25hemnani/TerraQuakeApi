import { useState } from 'react';

export default function ApiDocsEarthquakes() {
  const URL = import.meta.env.VITE_URL_BACKEND;

  const [activeTab, setActiveTab] = useState('recent');
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const endpoints = [
    {
      title: 'recent',
      description:
        'Fetches the most recent seismic events from INGV, ordered by time.',
      query: '?limit=10',
      example: '/api/earthquakes/recent?limit=10',
      method: 'GET',
    },
    {
      title: 'today',
      description: 'Fetches all seismic events that occurred today (UTC time).',
      query: '?limit=10',
      example: '/api/earthquakes/today?limit=10',
      method: 'GET',
    },
    {
      title: 'last-week',
      description: 'Fetches seismic events from the past 7 days.',
      query: '?limit=20',
      example: '/api/earthquakes/last-week?limit=20',
      method: 'GET',
    },
    {
      title: 'month',
      description: 'Fetches seismic events for a specific year and month.',
      query: '?year=2025&month=03&limit=10',
      example: '/api/earthquakes/month?year=2025&month=03&limit=15',
      method: 'GET',
    },
    {
      title: 'location',
      description:
        'Fetches events for a specific location (latitude and longitude-based).',
      query: '?lat=42.5&lon=13.4&radius=50&limit=10',
      example: '/api/earthquakes/location?lat=42.5&lon=13.4&radius=50&limit=10',
      method: 'GET',
    },
    {
      title: 'region',
      description:
        'Fetches events that occurred within a specific Italian region.',
      query: '?region=Campania&limit=10',
      example: '/api/earthquakes/region?region=Campania&limit=10',
      method: 'GET',
    },
    {
      title: 'depth',
      description:
        'Fetches events with a specified focal depth (in kilometers).',
      query: '?depth=10&limit=10',
      example: '/api/earthquakes/depth?depth=10&limit=10',
      method: 'GET',
    },
    {
      title: 'range-time',
      description: 'Fetches events that occurred between two specific dates.',
      query: '?startdate=2025-01-01&enddate=2025-03-30&limit=10',
      example:
        '/api/earthquakes/range-time?startdate=2025-01-01&enddate=2025-03-30&limit=10',
      method: 'GET',
    },
    {
      title: 'magnitude',
      description: 'Fetches events with a specific magnitude (e.g., ≥ 1.0).',
      query: '?mag=1&limit=10',
      example: '/api/earthquakes/magnitude?mag=1&limit=10',
      method: 'GET',
    },
    {
      title: 'eventId',
      description: 'Fetches a single seismic event by its unique event ID.',
      query: '?eventId=43410122',
      example: '/api/earthquakes/eventId?eventId=43410122',
      method: 'GET',
    },
  ];

  const handleTest = async (url) => {
    console.log(url);
    try {
      setLoading(true);
      const res = await fetch(`${URL}` + url);
      const data = await res.json();
      setResponseData(data);
    } catch (err) {
      setResponseData({ error: 'Request failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className='min-h-screen text-white px-6 py-16'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl md:text-6xl font-bold mb-4'>TerraQuake API</h1>
        <p className='text-gray-400 text-lg max-w-2xl mx-auto'>
          Explore real-time seismic data powered by INGV. Use the endpoints
          below to query earthquake events in Italy and beyond.
        </p>
      </div>

      <div className='p-5'>
        <h2 className='text-center text-2xl'>Earthquakes</h2>
      </div>

      <div className='max-w-5xl mx-auto'>
        {/* Tabs */}
        <div className='grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6'>
          {endpoints.map((ep) => (
            <button
              key={ep.title}
              onClick={() => {
                setActiveTab(ep.title);
                setResponseData(null);
              }}
              className={`py-2 px-4 rounded-xl font-semibold transition-colors ${
                activeTab === ep.title
                  ? 'bg-purple-700 text-white cursor-pointer'
                  : 'bg-white/10 hover:bg-purple-600 text-gray-300 cursor-pointer'
              }`}
            >
              {ep.title}
            </button>
          ))}
        </div>

        {/* Content */}
        {endpoints.map((ep) =>
          activeTab === ep.title ? (
            <div
              key={ep.title}
              className='bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl'
            >
              <h2 className='text-2xl font-semibold text-purple-400 mb-2'>
                {ep.method} {ep.title}
              </h2>
              <p className='text-gray-300 mb-4'>{ep.description}</p>

              <div className='mb-4'>
                <p className='text-white font-medium mb-4'>Query Parameters:</p>
                <pre className='bg-white/10 text-gray-300 rounded-md p-3 overflow-auto whitespace-pre'>
                  {ep.query}
                </pre>
              </div>

              <div className='mb-4'>
                <p className='text-white font-medium'>Example:</p>
                <pre className='bg-black/30 text-green-400 text-sm rounded-md p-4 overflow-auto whitespace-pre'>
                  {`fetch('${ep.example}')
  .then(res => res.json())
  .then(data => console.log(data))`}
                </pre>
              </div>

              <div className='mb-6'>
                <button
                  onClick={() => handleTest(ep.example)}
                  className='bg-purple-600 hover:bg-purple-800 transition-colors duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer'
                >
                  Test this endpoint
                </button>
              </div>

              {loading && <p className='text-yellow-400 mb-2'>⏳ Loading...</p>}

              {responseData && (
                <div className='bg-black/40 rounded-lg p-4 text-sm text-yellow-200 max-h-[400px] overflow-auto'>
                  <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
              )}
            </div>
          ) : null
        )}
      </div>
    </section>
  );
}
