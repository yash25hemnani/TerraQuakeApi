import handleHttpError from '../utils/handleError.js'

export const getStart = async (req, res) => {
  try {
    // Simulazione errore
    // await Promise.reject(new Error('Errore asincrono simulato'))

    res.status(200).json(
      {
        success: true,
        code: 200,
        status: 'OK',
        message: 'Server started successfully',
        data: null,
        meta: {
          method: req.method,
          path: req.originalUrl,
          timestamp: new Date().toISOString()
        }
      }
    )
  } catch (error) {
    console.error('Error in the getStart controller:', error.message)
    handleHttpError(res)
  }
}
