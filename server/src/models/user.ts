/* eslint-disable @typescript-eslint/restrict-template-expressions */
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import client from '../database';

// getting env variables
dotenv.config();
const {
  BCRYPT_PASSWORD,
  SALT_ROUND
} = process.env;

// create UserStore to consume users table from database
class UserStore {
  // get all users
  index = async (): Promise <User[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM users';
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users (Error: ${error})`);
    }
  };

  // get single user
  show = async (id: string): Promise <User[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT FROM users WHERE id = $1';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get user (Error: ${error})`);
    }
  };

  // create new user
  create = async (user: User): Promise <User[]> => {
    try {
      const conn = await client.connect();
      const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
      const hashedPass = await bcrypt.hash(user.password + (BCRYPT_PASSWORD as string), parseInt(SALT_ROUND as string));
      const result = await conn.query(query, [user.first_name, user.last_name, user.email, hashedPass]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot create user account (Error: ${error})`);
    }
  };

  // delete an user
  delete = async (id: string): Promise <User[]> => {
    try {
      const conn = await client.connect();
      const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot delete user (Error: ${error})`);
    }
  };

  // update an user
  edit = async (user: User): Promise <User[]> => {
    try {
      const conn = await client.connect();
      const query = 'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *';
      const hashedPass = await bcrypt.hash(user.password + (BCRYPT_PASSWORD as string), parseInt(SALT_ROUND as string));
      const result = await conn.query(query, [user.first_name, user.last_name, user.email, hashedPass, user.id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot update user (Error: ${error})`);
    }
  };

  // login an user
  login = async (email: string, password: string): Promise <object> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT id, password FROM users WHERE email = $1';
      const result = await conn.query(query, [email]);
      if (result.rows !== null) {
        const good = await bcrypt.compare(result.rows[1], password);
        if (good) {
          return {
            id: result.rows[0],
            email
          };
        } else {
          const err = new Error();
          err.name = 'password';
          err.message = 'Wrong password, please insert correct password.';
          throw err;
        }
      } else {
        const err = new Error();
        err.name = 'email';
        err.message = 'This email is not registered.';
        throw err;
      }
    } catch (error) {
      throw new Error('Wrong email or password');
    }
  };
}

export default UserStore;
