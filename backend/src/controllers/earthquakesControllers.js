import { regionBoundingBoxes } from '../config/regionBoundingBoxes.js'
import handleHttpError from '../utils/handleError.js'
import haversine from 'haversine-distance'

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici più recenti
export const getEarthquakesByRecent = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { limit } = req.query

    let url = `${urlINGV}?orderby=time&format=geojson`

    if (limit !== undefined) {
      // Se è stato inserito, valida
      if (
        typeof limit !== 'string' ||
        limit.trim() === '' ||
        isNaN(limit) ||
        parseInt(limit) <= 0
      ) {
        return handleHttpError(
          res,
          'The limit parameter, if provided, must be a positive integer greater than 0. Example: ?limit=10',
          400
        )
      }

      // Se valido, aggiungilo all’URL
      const parsedLimit = parseInt(limit)
      url += `&limit=${parsedLimit}`
    }

    // const urlINGV = `https://webservices.ingv.it/fdsnws/event/1/query?orderby=time&limit=${limit}&format=geojson`

    const response = await fetch(url)

    if (!response.ok) {
      return handleHttpError(
        res,
        `HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json({
      success: true,
      code: 200,
      status: 'OK',
      message: 'Recent seismic events',
      data,
      total: data.features.length,
      meta: {
        method: req.method.toUpperCase(),
        path: req.originalUrl,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error in the earthquakes/recent controller:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi odierni
export const getEarthquakesByToday = async (req, res) => {
  try {
    const { limit } = req.query

    const nowUTC = new Date()
    const yyyy = nowUTC.getUTCFullYear()
    const mm = String(nowUTC.getUTCMonth() + 1).padStart(2, '0')
    const dd = String(nowUTC.getUTCDate()).padStart(2, '0')
    const dateStr = `${yyyy}-${mm}-${dd}`
    console.log(dateStr)

    let url = `https://webservices.ingv.it/fdsnws/event/1/query?starttime=${dateStr}T00:00:00&endtime=${dateStr}T23:59:59&orderby=time&format=geojson`

    if (limit !== undefined) {
      // Se è stato inserito, valida
      if (
        typeof limit !== 'string' ||
        limit.trim() === '' ||
        isNaN(limit) ||
        parseInt(limit) <= 0
      ) {
        return handleHttpError(
          res,
          'The limit parameter, if provided, must be a positive integer greater than 0. Example: ?limit=10',
          400
        )
      }

      // Se valido, aggiungilo all’URL
      const parsedLimit = parseInt(limit)
      url += `&limit=${parsedLimit}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      return handleHttpError(
        res,
        `HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: 'Seismic events for today',
        total: data.features.length,
        data,
        meta: {
          method: req.method.toUpperCase(),
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Error in the earthquakes/today controller:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per ottenere la lista completa eventi sismici dell'ultima settimana
export const getEarthquakesByLastWeek = async (req, res) => {
  try {
    const { limit } = req.query

    const today = new Date()
    const endDate = today.toISOString().split('T')[0] // es: 2025-07-08

    const lastWeekDate = new Date(today)
    lastWeekDate.setDate(today.getDate() - 7)
    const startDate = lastWeekDate.toISOString().split('T')[0]

    let url = `https://webservices.ingv.it/fdsnws/event/1/query?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

    if (limit !== undefined) {
      // Se è stato inserito, valida
      if (
        typeof limit !== 'string' ||
        limit.trim() === '' ||
        isNaN(limit) ||
        parseInt(limit) <= 0
      ) {
        return handleHttpError(
          res,
          'The limit parameter, if provided, must be a positive integer greater than 0. Example: ?limit=10',
          400
        )
      }

      // Se valido, aggiungilo all’URL
      const parsedLimit = parseInt(limit)
      url += `&limit=${parsedLimit}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      return handleHttpError(
        res,
        `HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: `Seismic events from ${startDate} to ${endDate}`,
        total: data.features?.length || 0,
        data,
        meta: {
          method: req.method.toUpperCase(),
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Error in the earthquakes/last-week controller:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per ottenere una lista completa eventi sismici per mese specifico (es. marzo 2025)
export const getEarthquakesByMonth = async (req, res) => {
  try {
    const { year, month, limit } = req.query

    if (!parseInt(year) || !parseInt(month)) {
      handleHttpError(res, 'Year and month are required in the URL parameters (e.g., ?year=2025&month=03)', 400)
      return
    }

    // Start: primo giorno del mese
    const startDate = `${year}-${month.padStart(2, '0')}-01`

    // End: primo giorno del mese successivo
    const nextMonth = new Date(`${startDate}T00:00:00Z`)
    nextMonth.setMonth(nextMonth.getMonth() + 1)

    const yyyy = nextMonth.getFullYear()
    const mm = String(nextMonth.getMonth() + 1).padStart(2, '0')
    const endDate = `${yyyy}-${mm}-01`

    let url = `https://webservices.ingv.it/fdsnws/event/1/query?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

    if (limit !== undefined) {
      // Se è stato inserito, valida
      if (
        typeof limit !== 'string' ||
        limit.trim() === '' ||
        isNaN(limit) ||
        parseInt(limit) <= 0
      ) {
        return handleHttpError(
          res,
          'The limit parameter, if provided, must be a positive integer greater than 0. Example: ?limit=10',
          400
        )
      }

      // Se valido, aggiungilo all’URL
      const parsedLimit = parseInt(limit)
      url += `&limit=${parsedLimit}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      return handleHttpError(
        res,
        `HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: `Seismic events of ${year}-${month.padStart(2, '0')}`,
        total: data.features?.length || 0,
        data,
        meta: {
          method: req.method.toUpperCase(),
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Error in the earthquakes/month controller:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per ottenere una lista completa eventi sismici per regione italiana
export const getEarthquakesByRegion = async (req, res) => {
  try {
    const { region, limit } = req.query

    if (!regionBoundingBoxes[region.toLowerCase().trim()]) {
      handleHttpError(res, `Region ${region} not supported`, 400)
      return
    }

    const { minlatitude, maxlatitude, minlongitude, maxlongitude } = regionBoundingBoxes[region.toLowerCase().trim()]

    let url = `https://webservices.ingv.it/fdsnws/event/1/query?minlatitude=${minlatitude}&maxlatitude=${maxlatitude}&minlongitude=${minlongitude}&maxlongitude=${maxlongitude}&orderby=time&format=geojson`

    if (limit !== undefined) {
      // Se è stato inserito, valida
      if (
        typeof limit !== 'string' ||
        limit.trim() === '' ||
        isNaN(limit) ||
        parseInt(limit) <= 0
      ) {
        return handleHttpError(
          res,
          'The limit parameter, if provided, must be a positive integer greater than 0. Example: ?limit=10',
          400
        )
      }

      // Se valido, aggiungilo all’URL
      const parsedLimit = parseInt(limit)
      url += `&limit=${parsedLimit}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      return handleHttpError(
        res,
        `HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: `Seismic events in region ${region}`,
        total: data.features?.length || 0,
        data,
        meta: {
          method: req.method.toUpperCase(),
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Error in the earthquakes/region controller:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici filtrati per profondità
export const getEarthquakesByDepth = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { depth, limit } = req.query

    let url = `${urlINGV}?orderby=time&format=geojson`

    if (limit !== undefined) {
      // Se è stato inserito, valida
      if (
        typeof limit !== 'string' ||
        limit.trim() === '' ||
        isNaN(limit) ||
        parseInt(limit) <= 0
      ) {
        return handleHttpError(
          res,
          'The limit parameter, if provided, must be a positive integer greater than 0. Example: ?limit=10',
          400
        )
      }

      // Se valido, aggiungilo all’URL
      const parsedLimit = parseInt(limit)
      url += `&limit=${parsedLimit}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      return handleHttpError(
        res,
        `HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()
    const { features } = data

    // Filtro per profondità minima (se fornita)
    let filteredFeatures = features
    if (depth && !isNaN(depth)) {
      filteredFeatures = features.filter((feature) => {
        const quakeDepth = feature.geometry.coordinates[2] // profondità in km
        return quakeDepth > parseFloat(depth)
      })
    }

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: `Seismic events with depth > ${depth || 0} km`,
        total: filteredFeatures.length,
        data: filteredFeatures,
        meta: {
          method: req.method.toUpperCase(),
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Error in the earthquakes/depth controller:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici filtrati per un intervallo di tempo startdate e enddate
export const getEarthquakesByDateRange = async (req, res) => {
  try {
    const { startdate, enddate, limit } = req.query
    const urlINGV = process.env.URL_INGV

    // Validazione base
    if (!startdate || !enddate) {
      return handleHttpError(res, 'The parameters startdate and enddate are required. Example: ?startdate=2024-01-01&enddate=2024-01-31', 400)
    }

    // Validazione formato ISO (opzionale ma utile)
    const isoRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!isoRegex.test(startdate) || !isoRegex.test(enddate)) {
      return handleHttpError(res, 'Use the ISO date format: YYYY-MM-DD. Example: ?starttime=2024-01-01', 400)
    }

    // Costruisci URL INGV con filtro temporale
    let url = `${urlINGV}?starttime=${startdate}&endtime=${enddate}&orderby=time&format=geojson`

    if (limit !== undefined) {
      // Se è stato inserito, valida
      if (
        typeof limit !== 'string' ||
        limit.trim() === '' ||
        isNaN(limit) ||
        parseInt(limit) <= 0
      ) {
        return handleHttpError(
          res,
          'The limit parameter, if provided, must be a positive integer greater than 0. Example: ?limit=10',
          400
        )
      }

      // Se valido, aggiungilo all’URL
      const parsedLimit = parseInt(limit)
      url += `&limit=${parsedLimit}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      return handleHttpError(
        res,
        `HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: `Seismic events between ${startdate} and ${enddate}`,
        total: data.features.length,
        data,
        meta: {
          method: req.method.toUpperCase(),
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Error in the earthquakes/range-time controller:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici filtrati per magnitudo
export const getEarthquakesByMagnitude = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { mag, limit } = req.query

    let url = `${urlINGV}?orderby=time&format=geojson`

    if (limit !== undefined) {
      // Se è stato inserito, valida
      if (
        typeof limit !== 'string' ||
        limit.trim() === '' ||
        isNaN(limit) ||
        parseInt(limit) <= 0
      ) {
        return handleHttpError(
          res,
          'The limit parameter, if provided, must be a positive integer greater than 0. Example: ?limit=10',
          400
        )
      }

      // Se valido, aggiungilo all’URL
      const parsedLimit = parseInt(limit)
      url += `&limit=${parsedLimit}`
    }

    const response = await fetch(url)

    if (!response.ok) {
      return handleHttpError(
        res,
        `HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()
    const { features } = data

    // Filtro per profondità minima (se fornita)
    let filteredMagnitude = features
    if (mag && !isNaN(mag)) {
      filteredMagnitude = features.filter((feature) => {
        const quakeMag = feature.properties.mag // magnitudo
        return quakeMag >= parseFloat(mag)
      })
    }

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: `Seismic events with magnitude >= ${mag || 0}`,
        total: filteredMagnitude.length,
        data: filteredMagnitude,
        meta: {
          method: req.method.toUpperCase(),
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Error in the earthquakes/magnitude controller:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione di un singolo evento id con eventId
export const getEarthquakesById = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { eventId } = req.query
    console.log(eventId)

    const url = `${urlINGV}?orderby=time&format=geojson`

    const response = await fetch(url)

    if (!response.ok) {
      return handleHttpError(
        res,
        `HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()
    const { features } = data

    // Filtra per eventId esatto
    const filteredEvent = features.filter(
      (feature) => feature.properties.eventId === parseInt(eventId)
    )

    if (filteredEvent.length === 0) {
      return handleHttpError(res, `No event found with ID ${eventId}`, 404)
    }

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: `Seismic event with id ${eventId}`,
        total: filteredEvent.length,
        data: filteredEvent,
        meta: {
          method: req.method.toUpperCase(),
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Error in the earthquakes/eventId controller:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici filtrati per latitudine e longitugine
export const getEarthquakesLocation = async (req, res) => {
  try {
    const urlINGV = process.env.URL_INGV
    const { lon, lat, radius, limit } = req.query

    let url = `${urlINGV}?orderby=time&format=geojson`

    // Validazione del parametro limit
    if (limit !== undefined) {
      if (
        typeof limit !== 'string' ||
        limit.trim() === '' ||
        isNaN(limit) ||
        parseInt(limit) <= 0
      ) {
        return handleHttpError(
          res,
          'The limit parameter, if provided, must be a positive integer greater than 0. Example: ?limit=10',
          400
        )
      }
      url += `&limit=${parseInt(limit)}`
    }

    // Validazione del parametro radius
    if (radius !== undefined && (isNaN(radius) || parseFloat(radius) <= 0)) {
      return handleHttpError(res, 'The radius parameter must be a positive number', 400)
    }

    const response = await fetch(url)

    if (!response.ok) {
      return handleHttpError(
        res,
        `HTTP error from the INGV source: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()
    const { features } = data

    // Filtro per posizione geografica se fornita
    let filteredLocation = features
    if (lat && !isNaN(lat) && lon && !isNaN(lon)) {
      const userLat = parseFloat(lat)
      const userLon = parseFloat(lon)
      const userPoint = { lat: userLat, lon: userLon }
      const kmRadius = radius ? parseFloat(radius) : 10 // default 10 km

      filteredLocation = features.filter(({ geometry }) => {
        const [lonF, latF] = geometry.coordinates
        const quakePoint = { lat: latF, lon: lonF }
        const distanceMeters = haversine(userPoint, quakePoint)
        return distanceMeters / 1000 <= kmRadius
      })
    }

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: lat && lon
          ? `Seismic events near [${lat}, ${lon}] within ${radius || 10} km`
          : 'List of seismic events (not filtered by coordinates)',
        total: filteredLocation.length,
        data: filteredLocation,
        meta: {
          method: req.method.toUpperCase(),
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Error in the earthquakes/location controller:', error.message)
    handleHttpError(res)
  }
}
