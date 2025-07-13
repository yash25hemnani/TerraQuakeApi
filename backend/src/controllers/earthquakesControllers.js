import { regionBoundingBoxes } from '../config/regionBoundingBoxes.js'
import handleHttpError from '../utils/handleError.js'

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
          'Il parametro limit, se fornito, deve essere un numero intero positivo maggiore di 0. Esempio: ?limit=10',
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
        `Errore HTTP dalla sorgente INGV: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json({
      status: 'ok',
      code: 200,
      method: req.method.toLowerCase(),
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      total: data.features.length,
      message: 'Eventi sismici recenti',
      data
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/recent:', error.message)
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
          'Il parametro limit, se fornito, deve essere un numero intero positivo maggiore di 0. Esempio: ?limit=10',
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
        `Errore HTTP dalla sorgente INGV: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json({
      status: 'ok',
      code: 200,
      method: req.method.toLowerCase(),
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      total: data.features.length,
      message: 'Eventi sismici data odierna',
      data
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/today:', error.message)
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
          'Il parametro limit, se fornito, deve essere un numero intero positivo maggiore di 0. Esempio: ?limit=10',
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
        `Errore HTTP dalla sorgente INGV: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json({
      status: 'ok',
      code: 200,
      method: req.method.toLowerCase(),
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      total: data.features?.length || 0,
      message: `Eventi sismici dal ${startDate} al ${endDate}`,
      data
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/last-week:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per ottenere una lista completa eventi sismici per mese specifico (es. marzo 2025)
export const getEarthquakesByMonth = async (req, res) => {
  try {
    const { year, month, limit } = req.query

    if (!parseInt(year) || !parseInt(month)) {
      handleHttpError(res, 'Anno e mese sono obbligatori nei parametri URL (es. ?year=2025&month=03)', 400)
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
          'Il parametro limit, se fornito, deve essere un numero intero positivo maggiore di 0. Esempio: ?limit=10',
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
        `Errore HTTP dalla sorgente INGV: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json({
      status: 'ok',
      code: 200,
      method: req.method.toLowerCase(),
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      total: data.features?.length || 0,
      message: `Eventi sismici di ${year}-${month.padStart(2, '0')}`,
      data
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/month:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per ottenere una lista completa eventi sismici per regione italiana
export const getEarthquakesByRegion = async (req, res) => {
  try {
    const { region, limit } = req.query

    if (!regionBoundingBoxes[region.toLowerCase().trim()]) {
      handleHttpError(res, `Regione ${region} non supportata`, 400)
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
          'Il parametro limit, se fornito, deve essere un numero intero positivo maggiore di 0. Esempio: ?limit=10',
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
        `Errore HTTP dalla sorgente INGV: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json({
      status: 'ok',
      code: 200,
      method: req.method.toLowerCase(),
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      total: data.features?.length || 0,
      message: `Eventi sismici regione ${region}`,
      data
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/region:', error.message)
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
          'Il parametro limit, se fornito, deve essere un numero intero positivo maggiore di 0. Esempio: ?limit=10',
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
        `Errore HTTP dalla sorgente INGV: ${response.status} ${response.statusText || ''}`.trim(),
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

    res.status(200).json({
      status: 'ok',
      code: 200,
      method: req.method.toLowerCase(),
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      total: filteredFeatures.length,
      message: `Eventi sismici con profondità > ${depth || 0} km`,
      data: filteredFeatures
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/depth:', error.message)
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
      return handleHttpError(res, 'I parametri startdate e enddate sono obbligatori. Esempio: ?startdate=2024-01-01&enddate=2024-01-31', 400)
    }

    // Validazione formato ISO (opzionale ma utile)
    const isoRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!isoRegex.test(startdate) || !isoRegex.test(enddate)) {
      return handleHttpError(res, 'Usare il formato data ISO: YYYY-MM-DD. Esempio: ?starttime=2024-01-01', 400)
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
          'Il parametro limit, se fornito, deve essere un numero intero positivo maggiore di 0. Esempio: ?limit=10',
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
        `Errore HTTP dalla sorgente INGV: ${response.status} ${response.statusText || ''}`.trim(),
        response.status
      )
    }

    const data = await response.json()

    res.status(200).json({
      status: 'ok',
      success: true,
      code: 200,
      method: req.method.toLowerCase(),
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      total: data.features.length,
      message: `Eventi sismici tra ${startdate} e ${enddate}`,
      data
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/range-time:', error.message)
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
          'Il parametro limit, se fornito, deve essere un numero intero positivo maggiore di 0. Esempio: ?limit=10',
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
        `Errore HTTP dalla sorgente INGV: ${response.status} ${response.statusText || ''}`.trim(),
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

    res.status(200).json({
      status: 'ok',
      code: 200,
      method: req.method.toLowerCase(),
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      total: filteredMagnitude.length,
      message: `Eventi sismici con magnitudo >= ${mag || 0}`,
      data: filteredMagnitude
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/magnitude:', error.message)
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
        `Errore HTTP dalla sorgente INGV: ${response.status} ${response.statusText || ''}`.trim(),
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
      return handleHttpError(res, `Nessun evento trovato con ID ${eventId}`, 404)
    }

    res.status(200).json({
      status: 'ok',
      code: 200,
      method: req.method.toLowerCase(),
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      total: filteredEvent.length,
      message: `Evento sismico con id ${eventId}`,
      data: filteredEvent
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/eventId:', error.message)
    handleHttpError(res)
  }
}
