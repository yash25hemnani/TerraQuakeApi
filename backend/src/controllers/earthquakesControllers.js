import handleHttpError from '../utils/handleError.js'

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi sismici più recenti
export const recent = async (req, res) => {
  try {
    const urlINGV = 'https://webservices.ingv.it/fdsnws/event/1/query?orderby=time&format=geojson'

    const response = await fetch(urlINGV)

    if (!response.ok) {
      handleHttpError(res, `HTTP error! Status: ${response.status}`, response.status)
      return
    }

    const data = await response.json()

    console.log(urlINGV)

    res.status(200).json({
      status: 'OK',
      code: 200,
      method: req.method,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      total: data.features.length,
      message: 'Eventi sismici recenti',
      data
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/event:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per la lettura da endpoint INGV e la restituzione degli eventi odierni
export const today = async (req, res) => {
  try {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    const dateStr = `${yyyy}-${mm}-${dd}`

    const urlINGV = `https://webservices.ingv.it/fdsnws/event/1/query?starttime=${dateStr}T00:00:00&endtime=${dateStr}T23:59:59&orderby=time&format=geojson`

    const response = await fetch(urlINGV)

    if (!response.ok) {
      handleHttpError(res, `HTTP error! Status: ${response.status}`, response.status)
      return
    }

    const data = await response.json()

    res.status(200).json({
      status: 'OK',
      code: 200,
      method: req.method,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      total: data.features.length,
      message: 'Eventi sismici data odierna',
      data
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/event:', error.message)
    handleHttpError(res)
  }
}

// NOTE: funzione per ottenere la lista completa eventi sismici dell'ultima settimana
export const lastWeek = async (req, res) => {
  try {
    const today = new Date()
    const endDate = today.toISOString().split('T')[0] // es: 2025-07-08

    const lastWeekDate = new Date(today)
    lastWeekDate.setDate(today.getDate() - 7)
    const startDate = lastWeekDate.toISOString().split('T')[0]

    const urlINGV = `https://webservices.ingv.it/fdsnws/event/1/query?starttime=${startDate}&endtime=${endDate}&orderby=time&format=geojson`

    const response = await fetch(urlINGV)

    if (!response.ok) {
      handleHttpError(res, `HTTP error! Status: ${response.status}`, response.status)
      return
    }

    const data = await response.json()

    res.status(200).json({
      status: 'OK',
      code: 200,
      method: req.method,
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
