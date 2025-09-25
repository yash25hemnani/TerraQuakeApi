import handleHttpError from '../utils/handleHttpError.js'
import { buildResponse } from '../utils/buildResponse.js'

export const getStart = async (req, res) => {
  try {
    res.status(200).json(
      buildResponse(req, 'Server started successfully', undefined, null, {
        author: 'Gianluca Chiaravalloti',
        version: '1.0.0',
        date: '01.01.2025',
        description:
          'This is the test endpoint for TerraQuake API, used to verify server status and basic configuration.',
        project: 'TerraQuake API — Open-source seismic data API',
        documentation: 'https://github.com/nagcas/TerraQuakeAPI#readme',
        contact: 'terraquakeapi@gmail.com',
        status: 'stable',
        environment: process.env.NODE_ENV || 'development'
      })
    )
  } catch (error) {
    console.error('Error in the getStart controller:', error.message)
    handleHttpError(res)
  }
}
