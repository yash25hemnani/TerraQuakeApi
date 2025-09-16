import { regionBoundingBoxes } from '../config/regionBoundingBoxes.js'
import handleHttpError from '../utils/handleHttpError.js'
import { getPositiveInt } from '../utils/httpQuery.js'
import { processFeatures } from '../utils/processFeatures.js'
import haversine from 'haversine-distance'

// Helper function to build standard response
const buildResponse = (req, message, data, total = null) => ({
  success: true,
  code: 200,
  status: 'OK',
  message,
  total: total ?? data.features?.length ?? data.length ?? 0,
  data,
  meta: {
    method: req.method.toUpperCase(),
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  }
})

// Helper function to fetch from INGV with error handling
const fetchINGV = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim())
  }
  return response.json()
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici più recenti
export const getEarthquakesByRecent = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const limit = getPositiveInt(req.query, 'limit')

    if (limit === null) {
      return handleHttpError(res, 'The limit parameter must be a positive integer greater than 0. Example: ?limit=10', 400)
    }

    let url = `${urlINGV}?orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(req, 'Recent seismic events', result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/recent controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi odierni
export const getEarthquakesByToday = async (req, res) => {
  try {
    const limit = getPositiveInt(req.query, 'limit')

    if (limit === null) {
      return handleHttpError(res, 'The limit parameter must be a positive integer greater than 0. Example: ?limit=10', 400)
    }

    const nowUTC = new Date()
    const dateStr = nowUTC.toISOString().split('T')[0]

    let url = `https://webservices.ingv.it/fdsnws/event/1/query?starttime=${dateStr}T00:00:00&endtime=${dateStr}T23:59:59&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(req, 'Seismic events for today', result.items, result.totalFetched),
      pagination: {
        page: result.page,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/today controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}

// NOTE: funzione per ottenere la lista completa eventi sismici dell'ultima settimana
export const getEarthquakesByLastWeek = async (req, res) => {
  try {
    const limit = getPositiveInt(req.query, 'limit')

    if (limit === null) {
      return handleHttpError(res, 'The limit parameter must be a positive integer greater than 0. Example:limit=10', 400)
    }

    const today = new Date()
    const endDate = today.toISOString().split('T')[0]

    const lastWeekDate = new Date(today)
    lastWeekDate.setDate(today.getDate() - 7)
    const startDate = lastWeekDate.toISOString().split('T')[0]

    let url = `https://webservices.ingv.it/fdsnws/event/1/query?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(req, `Seismic events from ${startDate} to ${endDate}`, result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/last-week controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}

// NOTE: funzione per ottenere una lista completa eventi sismici per mese specifico
export const getEarthquakesByMonth = async (req, res) => {
  try {
    const { year, month } = req.query
    const limit = getPositiveInt(req.query, 'limit')

    if (limit === null) {
      return handleHttpError(res, 'The limit parameter must be a positive integer greater than 0. Example: ?limit=10', 400)
    }

    if (!parseInt(year) || !parseInt(month)) {
      return handleHttpError(res, 'Year and month are required in the URL parameters (e.g., ?year=2025&month=03)', 400)
    }

    const startDate = `${year}-${month.padStart(2, '0')}-01`
    const nextMonth = new Date(`${startDate}T00:00:00Z`)
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    const yyyy = nextMonth.getFullYear()
    const mm = String(nextMonth.getMonth() + 1).padStart(2, '0')
    const endDate = `${yyyy}-${mm}-01`

    let url = `https://webservices.ingv.it/fdsnws/event/1/query?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(req, `Seismic events of ${year}-${month.padStart(2, '0')}`, result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/month controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}

// NOTE: funzione per ottenere una lista completa eventi sismici per regione italiana
export const getEarthquakesByRegion = async (req, res) => {
  try {
    const { region } = req.query
    const limit = getPositiveInt(req.query, 'limit')

    if (limit === null) {
      return handleHttpError(res, 'The limit parameter must be a positive integer greater than 0. Example: ?limit=10', 400)
    }

    if (!regionBoundingBoxes[region?.toLowerCase()?.trim()]) {
      return handleHttpError(res, `Region ${region} not supported`, 400)
    }

    const { minlatitude, maxlatitude, minlongitude, maxlongitude } = regionBoundingBoxes[region.toLowerCase().trim()]

    let url = `https://webservices.ingv.it/fdsnws/event/1/query?minlatitude=${minlatitude}&maxlatitude=${maxlatitude}&minlongitude=${minlongitude}&maxlongitude=${maxlongitude}&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(req, `Seismic events in region ${region}`, result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/region controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici filtrati per profondità
export const getEarthquakesByDepth = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { depth } = req.query
    const limit = getPositiveInt(req.query, 'limit')

    if (limit === null) {
      return handleHttpError(res, 'The limit parameter must be a positive integer greater than 0. Example: ?limit=10', 400)
    }

    let url = `${urlINGV}?orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    let { features } = data

    // Filter by minimum depth if provided
    if (depth && !isNaN(depth)) {
      features = features.filter((feature) => {
        const quakeDepth = feature.geometry.coordinates[2]
        return quakeDepth > parseFloat(depth)
      })
    }

    const result = processFeatures(features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(req, `Seismic events with depth > ${depth || 0} km`, result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/depth controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici filtrati per un intervallo di tempo
export const getEarthquakesByDateRange = async (req, res) => {
  try {
    const { startdate, enddate } = req.query
    const limit = getPositiveInt(req.query, 'limit')
    const urlINGV = process.env.URL_INGV

    if (limit === null) {
      return handleHttpError(res, 'The limit parameter must be a positive integer greater than 0. Example: ?limit=10', 400)
    }

    if (!startdate || !enddate) {
      return handleHttpError(res, 'The parameters startdate and enddate are required. Example: ?startdate=2024-01-01&enddate=2024-01-31', 400)
    }

    const isoRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!isoRegex.test(startdate) || !isoRegex.test(enddate)) {
      return handleHttpError(res, 'Use the ISO date format: YYYY-MM-DD. Example: ?starttime=2024-01-01', 400)
    }

    let url = `${urlINGV}?starttime=${startdate}&endtime=${enddate}&orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    const result = processFeatures(data.features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(req, `Seismic events between ${startdate} and ${enddate}`, result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/range-time controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici filtrati per magnitudo
export const getEarthquakesByMagnitude = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { mag } = req.query
    const limit = getPositiveInt(req.query, 'limit')

    if (limit === null) {
      return handleHttpError(res, 'The limit parameter must be a positive integer greater than 0. Example: ?limit=10', 400)
    }

    let url = `${urlINGV}?orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    let { features } = data

    // Filter by minimum magnitude if provided
    if (mag && !isNaN(mag)) {
      features = features.filter((feature) => {
        const quakeMag = feature.properties.mag
        return quakeMag >= parseFloat(mag)
      })
    }

    const result = processFeatures(features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(req, `Seismic events with magnitude >= ${mag || 0}`, result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/magnitude controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione di un singolo evento id con eventId
export const getEarthquakesById = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { eventId } = req.query

    const url = `${urlINGV}?orderby=time&format=geojson`
    const data = await fetchINGV(url)
    const { features } = data

    const filteredEvent = features.filter((feature) => feature.properties.eventId === parseInt(eventId))

    if (filteredEvent.length === 0) {
      return handleHttpError(res, `No event found with ID ${eventId}`, 404)
    }

    const result = processFeatures(filteredEvent, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    res.status(200).json({
      ...buildResponse(req, `Seismic event with id ${eventId}`, result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/eventId controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici filtrati per latitudine e longitudine
export const getEarthquakesLocation = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { lon, lat, radius } = req.query
    const limit = getPositiveInt(req.query, 'limit')
    const radiusNum = getPositiveInt(req.query, 'radius', { min: 0.1, def: 10 })

    if (limit === null) {
      return handleHttpError(res, 'The limit parameter must be a positive integer greater than 0. Example: ?limit=10', 400)
    }

    if (radiusNum === null) {
      return handleHttpError(res, 'The radius parameter must be a positive number', 400)
    }

    let url = `${urlINGV}?orderby=time&format=geojson`
    if (limit) url += `&limit=${limit}`

    const data = await fetchINGV(url)
    let { features } = data

    // Filter by geographic location if provided
    if (lat && !isNaN(lat) && lon && !isNaN(lon)) {
      const userLat = parseFloat(lat)
      const userLon = parseFloat(lon)
      const userPoint = { lat: userLat, lon: userLon }

      features = features.filter(({ geometry }) => {
        const [lonF, latF] = geometry.coordinates
        const quakePoint = { lat: latF, lon: lonF }
        const distanceMeters = haversine(userPoint, quakePoint)
        return distanceMeters / 1000 <= radiusNum
      })
    }

    const result = processFeatures(features, req.query, {
      defaultSort: '-time',
      sortWhitelist: ['time', 'magnitude', 'depth'],
      fieldWhitelist: ['time', 'magnitude', 'depth', 'place', 'coordinates']
    })

    const message = lat && lon ? `Seismic events near [${lat}, ${lon}] within ${radiusNum} km` : 'List of seismic events (not filtered by coordinates)'

    res.status(200).json({
      ...buildResponse(req, message, result.items, result.totalFetched),
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        limit: result.limit,
        hasMore: result.hasMore
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/location controller:', error.message)
    handleHttpError(res, error.message.includes('HTTP error') ? error.message : undefined)
  }
}
