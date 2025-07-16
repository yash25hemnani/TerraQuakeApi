import mongoose from 'mongoose'

const dbConnect = async () => {
  try {
    const DB_URI = process.env.DB_URI
    const conn = await mongoose.connect(DB_URI)
    console.log(`MongoDB connesso appName: ${conn.connection.name}`)
  } catch (error) {
    console.error('Errore di connessione a MongoDB:', error.message)
  }
}

export default dbConnect
