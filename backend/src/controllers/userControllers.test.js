import {
  listAllUsers,
  updateRoleById,
  getCurrentUserData,
  updateCurrentUserData,
  deleteCurrentUser
} from './userControllers.js'
import { test, describe, beforeEach } from 'node:test'
import assert from 'node:assert'

const handleHttpError = (res, message = 'Internal server error. Your request cannot be processed at this time', code = 500) => {
  res.status(code).json({
    success: false,
    status: code,
    message
  }
  )
}

const buildResponse = (req, message, data) => ({
  success: true,
  code: 200,
  status: 'OK',
  data,
  message
})

const makeRes = () => ({
  _status: null,
  _json: null,
  status (code) {
    this._status = code
    return this
  },
  json (data) {
    this._json = data
    return this
  }
})

const matchedData = (req) => ({ ...req.body })

const data = [
  { id: 1, name: 'Alice', email: 'alice.sample@gmail.com', password: '12345678', role: ['admin'] },
  { id: 2, name: 'Bob', email: 'bob.sample@gmail.com', password: 'abcd@1234', role: ['user'] }
]

describe('listAllUsers Controller', () => {
  const baseReq = {
    user: { role: ['admin'] },
    query: {}
  }

  const makeReq = (overrides = {}) => ({
    ...baseReq,
    ...overrides
  })
  const mockUser = {
    find: () => ({
      limit: (dataLimit) => ({
        lean: async () => data.slice(0, dataLimit)
      })
    })
  }

  let handler
  beforeEach(() => {
    handler = listAllUsers({ User: mockUser, buildResponse, handleHttpError })
  })

  test('returns 200 with exactly 2 users', async () => {
    const req = makeReq({ query: { limit: 2 } })
    const res = makeRes()

    await handler(req, res)

    assert.strictEqual(res._status, 200)
    assert.deepStrictEqual(res._json, buildResponse(req, '', data))
  })

  test('returns 200 with exactly 1 user', async () => {
    const req = makeReq({ query: { limit: 1 } })
    const res = makeRes()

    await handler(req, res)

    assert.strictEqual(res._status, 200)
    assert.deepStrictEqual(res._json, buildResponse(req, '', [data[0]]))
  })

  test('caps limit at 100, defaults to 50', async () => {
    const req = makeReq({ query: { limit: 101 } })
    const res = makeRes()

    await handler(req, res)

    assert.strictEqual(res._status, 200)
    assert.deepStrictEqual(res._json, buildResponse(req, '', data))
  })

  test('returns 400 for invalid limits', async (t) => {
    for (const invalidLimit of [-1, 'a']) {
      await t.test(`limit = ${invalidLimit}`, async () => {
        const req = makeReq({ query: { limit: invalidLimit } })
        const res = makeRes()

        await handler(req, res)

        assert.strictEqual(res._status, 400)
        assert.strictEqual(res._json.message, 'Not Found')
      })
    }
  })

  test('returns 400 if user is not admin', async (t) => {
    for (const role of [['user'], []]) {
      await t.test(`role=${JSON.stringify(role)}`, async () => {
        const req = makeReq({ user: { role } })
        const res = makeRes()

        await handler(req, res)

        assert.strictEqual(res._status, 400)
        assert.strictEqual(res._json.message, 'Unauthorized')
      })
    }
  })

  test('returns 500 on thrown error', async () => {
    const failingHandler = listAllUsers({
      User: { find: () => { throw new Error('HTTP error: Internal Server Error') } },
      buildResponse,
      handleHttpError
    })
    const req = makeReq()
    const res = makeRes()

    await failingHandler(req, res)

    assert.strictEqual(res._status, 500)
    assert.strictEqual(res._json.message, 'HTTP error: Internal Server Error')
  })
})

describe('updateRoleById Controller', () => {
  let handler
  let res

  const mockUser = {
    findById: (id) => {
      const matched = data.find((u) => u.id === id)
      if (!matched) return null
      return {
        ...matched,
        save: async () => {},
        select () { return this }
      }
    }
  }

  const baseReq = {
    user: { role: ['admin'] },
    body: { role: 'admin' },
    params: { id: 2 }
  }

  const makeReq = (overrides = {}) => ({ ...baseReq, ...overrides })

  beforeEach(() => {
    handler = updateRoleById({ User: mockUser, buildResponse, handleHttpError })
    res = makeRes()
  })

  test('returns 400 if non-admin role calls this endpoint', async () => {
    const req = makeReq({ user: { role: ['user'] } })

    await handler(req, res)

    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Unauthorized')
  })

  test('returns 400 if user has empty role list', async () => {
    const req = makeReq({ user: { role: [] } })

    await handler(req, res)

    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Unauthorized')
  })

  test('returns 400 if user property is absent from request', async () => {
    await handler({}, res)

    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Unauthorized')
  })

  test('returns 400 if user with given id does not exist', async () => {
    const req = makeReq({ params: { id: 3 } })

    await handler(req, res)

    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Not Found')
  })

  test('returns 200 with updated user if user exists', async () => {
    const req = makeReq({ params: { id: 2 } })

    await handler(req, res)

    assert.strictEqual(res._status, 200)
    assert.strictEqual(res._json.success, true)
    assert.strictEqual(res._json.code, 200)
    assert.strictEqual(res._json.data.id, 2)
    assert.deepStrictEqual(res._json.data.role, ['admin'])
  })

  test('returns 500 on thrown error', async () => {
    const failingHandler = updateRoleById({
      User: { findById () { throw new Error('HTTP error: Internal Server Error') } },
      buildResponse,
      handleHttpError
    })
    const req = makeReq()

    await failingHandler(req, res)

    assert.strictEqual(res._status, 500)
    assert.strictEqual(res._json.message, 'HTTP error: Internal Server Error')
  })
})

describe('getCurrentUserData Controller', () => {
  let handler, res
  const baseReq = { user: { _id: 1, role: ['user'] } }

  const makeReq = (overrides = {}) => ({ ...baseReq, ...overrides })

  const mockUser = {
    findById (id) {
      const match = data.find((u) => u.id === id)
      if (!match) {
        return {
          lean: async () => null
        }
      }
      return {
        lean: async () => ({ ...match })
      }
    }
  }

  beforeEach(() => {
    handler = getCurrentUserData({ User: mockUser, buildResponse, handleHttpError })
    res = makeRes()
  })

  test('returns 400 when user property is absent', async () => {
    await handler({}, res)

    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Unauthorized')
  })

  test('returns 400 when role list is empty', async () => {
    const req = makeReq({ user: { _id: 1, role: [] } })

    await handler(req, res)

    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Unauthorized')
  })

  test('returns 400 when user is not found', async () => {
    const req = makeReq({ user: { _id: 3, role: ['user'] } })

    await handler(req, res)

    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Not Found')
  })

  test('returns 200 with user data when found', async () => {
    const req = makeReq({ user: { _id: 1, role: ['user'] } })

    await handler(req, res)

    assert.strictEqual(res._status, 200)
    assert.strictEqual(res._json.success, true)
    assert.strictEqual(res._json.code, 200)
    assert.deepStrictEqual(res._json.data, data[0])
  })

  test('returns 500 on thrown error', async () => {
    const failingHandler = getCurrentUserData({
      User: { findById: () => { throw new Error('HTTP error: Internal Server Error') } },
      buildResponse,
      handleHttpError
    })
    const req = makeReq()

    await failingHandler(req, res)

    assert.strictEqual(res._status, 500)
    assert.strictEqual(res._json.message, 'HTTP error: Internal Server Error')
  })
})

describe('updateCurrentUserData Controller', () => {
  test('return 400 when user property is absent', async () => {
    const res = makeRes()

    const handler = updateCurrentUserData({ User: {}, buildResponse, handleHttpError, matchedData })
    await handler({}, res)

    assert.strictEqual(res._json.success, false)
    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Unauthorized')
  })

  test('return 400 when role list is empty', async () => {
    const res = makeRes()

    const handler = updateCurrentUserData({ User: {}, buildResponse, handleHttpError, matchedData })
    await handler({ user: { _id: 1, role: [] } }, res)

    assert.strictEqual(res._json.success, false)
    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Unauthorized')
  })

  test('return 400 when user is not found', async () => {
    const res = makeRes()

    const mockUser = {
      findById: () => ({ select: () => {} })
    }

    const handler = updateCurrentUserData({ User: mockUser, buildResponse, handleHttpError, matchedData })
    await handler({ user: { _id: 3, role: ['user'] }, body: {} }, res)

    assert.strictEqual(res._json.success, false)
    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Not Found')
  })

  test('return 200 update email and respond with updated user document', async () => {
    const res = makeRes()

    const mockUser = {
      findById: () => ({
        set: (updates) => Object.assign(data[1], updates),
        save () {
          return this
        },
        select (params) {
          return this
        },
        toObject: () => data[1]
      })
    }

    const handler = updateCurrentUserData({ User: mockUser, buildResponse, handleHttpError, matchedData })
    await handler({
      user: { _id: 2, role: ['user'] },
      body: { email: 'bob.sample@hotmail.com' }
    }, res)

    assert.strictEqual(res._status, 200)
    assert.strictEqual(res._json.success, true)
    assert.deepStrictEqual(res._json.data, data[1])
  })

  test('return 500 on throwing error', async () => {
    const res = makeRes()

    const mockUser = {
      findById: () => { throw new Error('HTTP error: Internal Server Error') }
    }

    const handler = updateCurrentUserData({ User: mockUser, buildResponse, handleHttpError, matchedData })
    await handler({
      user: { _id: 2, role: ['user'] },
      body: { name: 'Alice' }
    }, res)

    assert.strictEqual(res._json.success, false)
    assert.strictEqual(res._status, 500)
    assert.strictEqual(res._json.message, 'HTTP error: Internal Server Error')
  })
})

describe('deleteCurrentUser Controller', () => {
  test('return 400 when user property is absent', async () => {
    const res = makeRes()

    const handler = deleteCurrentUser({ User: {}, buildResponse, handleHttpError })
    await handler({}, res)

    assert.strictEqual(res._json.success, false)
    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Unauthorized')
  })

  test('return 400 when role list is empty', async () => {
    const res = makeRes()

    const handler = deleteCurrentUser({ User: {}, buildResponse, handleHttpError })
    await handler({ user: { _id: 1, role: [] } }, res)

    assert.strictEqual(res._json.success, false)
    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Unauthorized')
  })

  test('return 400 when user is not found', async () => {
    const res = makeRes()

    const mockUser = {
      deleteOne: () => null
    }

    const handler = deleteCurrentUser({ User: mockUser, buildResponse, handleHttpError })
    await handler({ user: { _id: 3, role: ['user'] } }, res)

    assert.strictEqual(res._json.success, false)
    assert.strictEqual(res._status, 400)
    assert.strictEqual(res._json.message, 'Not Found')
  })

  test('return 200 with deleted user document', async () => {
    const res = makeRes()

    const mockUser = {
      deleteOne: ({ _id }) => {
        const match = data.find((obj) => obj.id === _id)
        return match ?? null
      }
    }

    const handler = deleteCurrentUser({ User: mockUser, buildResponse, handleHttpError })
    await handler({ user: { _id: 2, role: ['user'] } }, res)

    assert.strictEqual(res._status, 200)
    assert.strictEqual(res._json.success, true)
    assert.deepStrictEqual(res._json.data, data[1])
  })

  test('return 500 on throwing error', async () => {
    const res = makeRes()

    const mockUser = {
      deleteOne: () => { throw new Error('HTTP error: Internal Server Error') }
    }

    const handler = deleteCurrentUser({ User: mockUser, buildResponse, handleHttpError })
    await handler({ user: { _id: 2, role: ['user'] } }, res)

    assert.strictEqual(res._json.success, false)
    assert.strictEqual(res._status, 500)
    assert.strictEqual(res._json.message, 'HTTP error: Internal Server Error')
  })
})
