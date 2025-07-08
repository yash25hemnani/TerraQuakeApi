import handleHttpError from '../utils/handleError.js'

export const getStart = async (req, res) => {
  try {
    // Simulazione errore
    // await Promise.reject(new Error('Errore asincrono simulato'))

    res.status(200).json({
      status: 'OK',
      code: 200,
      method: req.method,
      path: req.originalUrl,
      timestamp: new Date().toISOString(),
      success: true,
      message: 'Server avviato correttamente'
    })
  } catch (error) {
    console.error('Errore nel controller getStart:', error.message)
    handleHttpError(res)
  }
}
