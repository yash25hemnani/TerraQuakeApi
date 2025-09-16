import "./apiDocs.css";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";

export default function ApiDocsEarthquakes() {
	const BACKEND_URL = import.meta.env.VITE_URL_BACKEND;

	const [activeTab, setActiveTab] = useState("recent");
	const [responseData, setResponseData] = useState(null);
	const [loading, setLoading] = useState(false);

	const endpoints = [
		{
			title: "recent",
			description: `This endpoint retrieves all seismic events that occurred today from the TerraQuake API, based on UTC time. It provides users with real-time insight into ongoing seismic activity for the current day. The response includes detailed information such as magnitude, location, depth, time, and unique event ID.
      
        Query Parameters:
          
      - limit: (Optional) The number of earthquake events to return. Defaults to 50 if not specified.`,
			query: "?limit=50",
			example: "/api/earthquakes/recent?limit=50",
			method: "GET"
		},
		{
			title: "today",
			description: `This endpoint retrieves all seismic events that occurred today (from 00:00 UTC to the current time) from the TerraQuake API. It allows users to monitor real-time seismic activity and provides a daily overview of ongoing earthquakes. The response includes detailed information such as magnitude, location, depth, event time, and coordinates.
      
        Query Parameters:
        
      - limit: (Optional) The number of earthquake events to return. Default is 50 if not provided.`,
      query: '?limit=50',
      example: '/api/earthquakes/today?limit=50',
      method: 'GET',
    },
    {
      title: 'last-week',
      description: `
This endpoint retrieves all seismic events that occurred in the last 7 days from the TerraQuake API.
It allows users to monitor and analyze recent seismic activity over the past week, providing insights into short-term trends and regional patterns.
      
        Query Parameters:
        
      - limit: (Optional) The number of earthquake events to return. Default is 50 if not specified.`,
      query: '?limit=50',
      example: '/api/earthquakes/last-week?limit=50',
      method: 'GET',
    },
    {
      title: 'month',
      description: `
This endpoint retrieves all seismic events that occurred during a specific month and year from the TerraQuake API.
It allows users to explore historical earthquake data for a given period. The response includes detailed event information such as magnitude, location, depth, and timestamp.
      
        Query Parameters:
        
      - year: (Required) The target year (e.g., 2025).
      - month: (Required) The target month in numeric format (01 to 12).
      - limit: (Optional) The number of events to return. Default is 10 if not specified.`,
      query: '?year=2025&month=03&limit=50',
      example: '/api/earthquakes/month?year=2025&month=03&limit=50',
      method: 'GET',
    },
    {
      title: 'location',
      description: `
This endpoint retrieves seismic events near a specific geographical location using latitude, longitude, and an optional search radius.
It allows users to filter recent earthquake events based on proximity to a point of interest.

        Query Parameters:

    - lat: (Required) The latitude of the location (e.g., 41.7142).
    - lon: (Required) The longitude of the location (e.g., 15.9577).
    - radius: (Optional) The search radius in kilometers. Default is 10 km if not specified.
    - limit: (Optional) The number of events to return. If not specified, it returns all matching events.

The response includes detailed information for each event such as magnitude, coordinates, depth, and time of occurrence.`,
      query: '?lon=15.9577&lat=41.7142&radius=50',
      example: '/api/earthquakes/location?lon=15.9577&lat=41.7142&radius=10&limit=50',
      method: 'GET',
    },
    {
      title: 'region',
      description: `
This endpoint retrieves all seismic events that occurred within a specific Italian region from the TerraQuake API.
It allows users to filter earthquakes by regional boundaries for localized seismic analysis. The response includes key data such as magnitude, location, depth, and time.
      
        Query Parameters:
        
      - region: (Required) The name of the Italian region to filter by (e.g., Campania, Sicilia, Lazio). Case-insensitive.
      - limit: (Optional) The number of events to return. Defaults to 50 if not specified.`,
      query: '?region=Campania&limit=50',
      example: '/api/earthquakes/region?region=Campania&limit=50',
      method: 'GET',
    },
    {
      title: 'depth',
      description: `
This endpoint retrieves all seismic events that occurred at a specific focal depth, measured in kilometers, from the TerraQuake API.
It allows users to analyze earthquakes based on their depth, which can help assess their potential surface impact.
      
        Query parameters:

      - depth: (Required) The focal depth of the earthquakes in kilometers (e.g., 10).
      - limit: (Optional) The number of events to return. Default is 10 if not specified.`,
      query: '?depth=10&limit=50',
      example: '/api/earthquakes/depth?depth=10&limit=50',
      method: 'GET',
    },
    {
      title: 'range-time',
      description: `
This endpoint retrieves all seismic events that occurred within a specific time range, using a custom start and end date.
It allows users to query historical earthquake data over any desired period, making it ideal for research, reports, or time-based visualizations.

        Query Parameters:

      - startdate: (Required) The start date of the time range (format: YYYY-MM-DD).
      - enddate: (Required) The end date of the time range (format: YYYY-MM-DD).
      - limit: (Optional) The number of earthquake events to return. Default is 50 if not specified.`,
      query: '?startdate=2025-01-01&enddate=2025-03-30&limit=50',
      example:
        '/api/earthquakes/range-time?startdate=2025-01-01&enddate=2025-03-30&limit=50',
      method: 'GET',
    },
    {
      title: 'magnitude',
      description: `
This endpoint retrieves all seismic events that have a specific or greater magnitude from the TerraQuake API.
It is useful for filtering earthquakes based on their strength and analyzing seismic intensity patterns over time or regions.
      
        Query Parameters:
      
      - mag: (Required) Minimum magnitude to filter by (e.g., 2 will return all events with magnitude ≥ 2.0).
      - limit: (Optional) Number of earthquake events to return. Default is 50 if not specified.`,
      query: '?mag=1&limit=50',
      example: '/api/earthquakes/magnitude?mag=1&limit=50',
      method: 'GET',
    },
    {
      title: 'eventId',
      description: `
This endpoint retrieves a specific seismic event by its unique event ID from the TerraQuake API.
It allows users to access detailed information about a single earthquake event, including magnitude, location, depth, and precise timestamp.
      
        Query Parameters:
      
      - eventId: (Required) The unique identifier of the earthquake event to retrieve.`,
			query: "?eventId=43410122",
			example: "/api/earthquakes/eventId?eventId=44061482",
			method: "GET"
		}
	];

	const handleTest = async (url) => {
		console.log(url);
		try {
			setLoading(true);
			const res = await fetch(`${BACKEND_URL}` + url);
			const data = await res.json();
			setResponseData(data);
		} catch (err) {
			setResponseData({ error: "Request failed" });
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className="min-h-screen text-white px-6 py-16">
			<div className="text-center mb-12">
				<h1 className="text-4xl md:text-6xl font-bold mb-4">TerraQuake API</h1>
				<p className="text-gray-400 text-lg max-w-2xl mx-auto">Explore real-time seismic data powered by INGV. Use the endpoints below to query earthquake events in Italy and beyond.</p>
			</div>

			<div className="p-5">
				<h2 className="text-center text-2xl">Earthquakes</h2>
			</div>

			<div className="max-w-5xl mx-auto">
				{/* Tabs */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
					{endpoints.map((ep) => (
						<button
							key={ep.title}
							onClick={() => {
								setActiveTab(ep.title);
								setResponseData(null);
							}}
							className={`py-2 px-4 rounded-xl font-semibold transition-colors ${activeTab === ep.title ? "bg-purple-700 text-white cursor-pointer" : "bg-white/10 hover:bg-purple-600 text-gray-300 cursor-pointer"}`}>
							{ep.title}
						</button>
					))}
				</div>

				{/* Content */}
				{endpoints.map((ep) =>
					activeTab === ep.title ? (
						<div key={ep.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
							<h2 className="text-md font-semibold text-purple-400 mb-2">
								<div className="flex flex-col gap-4">
									<span>
										{ep.method} {ep.title}
									</span>
									<span className="overflow-auto whitespace-pre">
										URL: {BACKEND_URL}
										{ep.example}
									</span>
								</div>
							</h2>
							<p className="text-gray-300 mt-4 mb-4 whitespace-pre-wrap">{ep.description}</p>

							<div className="mb-4">
								<p className="text-white font-medium mb-4">Query Parameters:</p>
								<pre className="bg-white/10 text-gray-300 rounded-md p-3 overflow-auto whitespace-pre">{ep.query}</pre>
							</div>

							<div className="mb-4">
								<p className="text-white font-medium">Example:</p>
								<pre className="bg-black/30 text-green-400 text-sm rounded-md p-4 overflow-auto whitespace-pre">
									{`fetch('${BACKEND_URL}${ep.example}')
      .then(res => res.json())
        .then(data => console.log(data));`
                  }
								</pre>
							</div>

							<div className="mb-6">
								<button onClick={() => handleTest(ep.example)} className="bg-purple-600 hover:bg-purple-800 transition-colors duration-300 text-white font-semibold py-2 px-6 rounded-full cursor-pointer">
									Test this endpoint
								</button>
							</div>

							{loading && (
								<p className="text-yellow-400 mb-2">
									<ImSpinner9 className="spinner" /> Loading...
								</p>
							)}

							{responseData && (
								<div className="bg-black/40 rounded-lg p-4 text-sm text-yellow-400 max-h-[400px] overflow-auto">
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
