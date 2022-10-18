import { MongoClient, ObjectId } from '../deps.ts'
import type { User } from '../types/users.ts'

const DB_NAME = '30965_clase48'
const URI = 'mongodb+srv://pia:EyBuOppa7XvDu65z@cluster0.5z86n.mongodb.net/?retryWrites=true&w=majority'

const client = new MongoClient()

try {
  await client.connect(URI)
  console.log(`Base de datos conectada: ${URI}`)
} catch (e) {
  console.log(e)
}

const db = client.database(DB_NAME)
const users = db.collection<User>('users')

export const getUsers = async (): Promise<User[]> => {
  return await users.find({}).toArray()
}

export const getUser = async (id: string): Promise<User> => {
  const user: User|undefined = await users.findOne({ _id: new ObjectId(id) })

  if (user) {
    return await Promise.resolve(user)
  }

  throw new Error('User not found')

}

export const createUser = async (name: string, birthDate: string) => {
  const user: User = {
    name,
    birthDate: new Date(birthDate)
  }

  user._id = await users.insertOne(user)

  return user
}