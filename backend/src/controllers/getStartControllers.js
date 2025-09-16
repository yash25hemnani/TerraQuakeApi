import handleHttpError from '../utils/handleHttpError.js'

export const getStart = async (req, res) => {
  try {
    // Simulazione errore
    // await Promise.reject(new Error('Errore asincrono simulato'))

    res.status(200).json({
      success: true,
      code: 200,
      status: 'OK',
      message: 'Server started successfully',
      data: null,
      meta: {
        method: req.method,
        path: req.originalUrl,
        timestamp: new Date().toISOString()
      },
      author: 'Gianluca Chiaravalloti',
      version: '1.0.0',
      date: '01.01.2025'
    })
  } catch (error) {
    console.error('Error in the getStart controller:', error.message)
    handleHttpError(res)
  }
}
