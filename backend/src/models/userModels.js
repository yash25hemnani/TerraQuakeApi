import { Schema, model } from 'mongoose'
import MongooseDelete from 'mongoose-delete'
import { encrypt } from '../utils/handlePassword.js'

const usersSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      select: false
    },
    role: {
      type: ['user', 'admin'],
      default: 'user'
    }
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'users'
  }
)

usersSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await encrypt(this.password)
  next()
})

usersSchema.plugin(MongooseDelete, { deletedAt: true, overrideMethods: 'all' })

const User = model('users', usersSchema)

export default User
