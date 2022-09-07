/* eslint-disable @typescript-eslint/restrict-template-expressions */
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import client from '../database'

dotenv.config()
const {
  BCRYPT_PASSWORD,
  SALT_ROUND
} = process.env

class UserStore {
  index = async (): Promise <User[]> => {
    try {
      const conn = await client.connect()
      const query = 'SELECT * FROM users'
      const result = await conn.query(query)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get users (Error: ${error})`)
    }
  }

  show = async (id: string): Promise <User[]> => {
    try {
      const conn = await client.connect()
      const query = 'SELECT FROM users WHERE id = $1'
      const result = await conn.query(query, [id])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get user (Error: ${error})`)
    }
  }

  create = async (user: User): Promise <User[]> => {
    try {
      const conn = await client.connect()
      const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *'
      const hashedPass = await bcrypt.hash(user.password + (BCRYPT_PASSWORD as string), parseInt(SALT_ROUND as string))
      const result = await conn.query(query, [user.first_name, user.last_name, user.email, hashedPass])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot create user account (Error: ${error})`)
    }
  }

  delete = async (id: string): Promise <User[]> => {
    try {
      const conn = await client.connect()
      const query = 'DELETE FROM users WHERE id = $1 RETURNING *'
      const result = await conn.query(query, [id])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot delete user (Error: ${error})`)
    }
  }

  edit = async (user: User): Promise <User[]> => {
    try {
      const conn = await client.connect()
      const query = 'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *'
      const hashedPass = await bcrypt.hash(user.password + (BCRYPT_PASSWORD as string), parseInt(SALT_ROUND as string))
      const result = await conn.query(query, [user.first_name, user.last_name, user.email, hashedPass, user.id])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot update user (Error: ${error})`)
    }
  }
}

export default UserStore
