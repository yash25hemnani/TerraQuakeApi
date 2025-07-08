import handleHttpError from '../utils/handleError.js'

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
      message: 'Lista terremoti più recenti',
      data
    })
  } catch (error) {
    console.error('Errore nel controller earthquakes/event:', error.message)
    handleHttpError(res)
  }
}
