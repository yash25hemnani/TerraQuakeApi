import { getPositiveInt } from '../utils/httpQuery.js'

/**
 * Controller: List all users.
 *
 * - Requires `admin` role (checked via req.user).
 * - Accepts optional `limit` query param (validated via getPositiveInt).
 * - Returns all users up to `limit`, excluding password field.
 * - Responds with `400 Unauthorized` if requester is not admin.
 */
export const listAllUsers = ({
  User,
  buildResponse,
  handleHttpError
}) => {
  return async (req, res) => {
    if (!req.user || req.user.role.length === 0 || req.user.role[0] !== 'admin') {
      return handleHttpError(
        res,
        'Unauthorized',
        400
      )
    }
    const limit = getPositiveInt(req.query, 'limit', {
      max: 100,
      def: 50
    })

    if (!limit) {
      return handleHttpError(
        res,
        'Not Found',
        400
      )
    }
    try {
      const documents = await User.find({})
        .limit(limit)
        .lean()

      res.status(200).json(buildResponse(req, '', documents, null, {}))
    } catch (error) {
      console.error('Error in the userControllers/listAllUsers controller:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * Controller: Update a user's role by ID.
 *
 * - Requires `admin` role.
 * - Reads `id` param from the URL.
 * - Returns user document without password.
 * - Responds with `400 Not Found` if no such user exists.
 */
export const updateRoleById = ({
  User,
  buildResponse,
  handleHttpError
}) => {
  return async (req, res) => {
    if (!req.user || req.user.role.length === 0 || req.user.role[0] !== 'admin') {
      return handleHttpError(
        res,
        'Unauthorized',
        400
      )
    }

    const { id } = req.params

    try {
      const user = await User.findById(id)
      if (!user) {
        return handleHttpError(
          res,
          'Not Found',
          400
        )
      }
      user.role = [req.body.role]
      await user.save()

      res.status(200).json(buildResponse(req, '', user, null, {}))
    } catch (error) {
      console.error('Error in the userControllers/getRoleById controller:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * Controller: Get current authenticated user's data.
 *
 * - Requires a valid authenticated user (req.user).
 * - Returns user document without password.
 * - Responds with `400 Unauthorized` if no user is attached to request.
 * - Responds with `400 Not Found` if the user record does not exist.
 */
export const getCurrentUserData = ({
  User,
  buildResponse,
  handleHttpError
}) => {
  return async (req, res) => {
    if (!req.user || req.user?.role.length === 0) {
      return handleHttpError(
        res,
        'Unauthorized',
        400
      )
    }

    try {
      const user = await User.findById(req.user._id).lean()
      if (!user) {
        return handleHttpError(
          res,
          'Not Found',
          400
        )
      }
      res.status(200).json(buildResponse(req, '', user, null, {}))
    } catch (error) {
      console.error('Error in the userControllers/getCurrentUserData controller:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * Controller: Update current authenticated user's data.
 *
 * - Requires a valid authenticated user.
 * - Reads update fields from request body.
 * - Updates user document with Mongoose validation and returns the updated record.
 * - Excludes password field in response.
 * - Responds with `400` if user not found or validation fails.
 */
export const updateCurrentUserData = ({
  User,
  buildResponse,
  handleHttpError,
  matchedData
}) => {
  return async (req, res) => {
    if (!req.user || req.user.role.length === 0) {
      return handleHttpError(
        res,
        'Unauthorized',
        400
      )
    }
    const updates = matchedData(req)
    try {
      const user = await User.findById(req.user._id).select('+password')

      if (!user) {
        return handleHttpError(
          res,
          'Not Found',
          400
        )
      }

      user.set(updates)
      const savedUser = await user.save()
      const userResponse = savedUser.toObject()
      delete userResponse.password

      res.status(200).json(buildResponse(req, '', userResponse, null, {}))
    } catch (error) {
      console.error('Error in the userControllers/updateCurrentUserData controller:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}

/**
 * Controller: Delete current authenticated user's account.
 *
 * - Requires a valid authenticated user.
 * - Deletes the user document based on req.user._id.
 * - Responds with deletion result.
 * - Responds with `400 Not Found` if user does not exist.
 */
export const deleteCurrentUser = ({
  User,
  buildResponse,
  handleHttpError
}) => {
  return async (req, res) => {
    if (!req.user || req.user.role.length === 0) {
      return handleHttpError(
        res,
        'Unauthorized',
        400
      )
    }
    try {
      const user = await User.deleteOne({ _id: req.user._id })
      if (!user) {
        return handleHttpError(
          res,
          'Not Found',
          400
        )
      }
      res.status(200).json(buildResponse(req, '', user, null, {}))
    } catch (error) {
      console.error('Error in the userControllers/getCurrentUserData controller:', error.message)
      handleHttpError(
        res,
        error.message.includes('HTTP error') ? error.message : undefined
      )
    }
  }
}
