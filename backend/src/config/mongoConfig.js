import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    const DB_URI = process.env.DB_URI
    const conn = await mongoose.connect(DB_URI)
    console.log(`MongoDB connected to appName: ${conn.connection.name}`)
  } catch (error) {
    console.error('MongoDB connection error:', error.message)
  }
}

export default dbConnect
