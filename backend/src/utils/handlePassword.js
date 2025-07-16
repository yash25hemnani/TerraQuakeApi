import bcryptjs from 'bcryptjs'

export const encrypt = async (passwordPlain) => {
  const hash = await bcryptjs.hash(passwordPlain, 10)
  return hash
}

export const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword)
}
