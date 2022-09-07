/* eslint-disable @typescript-eslint/restrict-template-expressions */
import client from '../database'

class EventStore {
  index = async (): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect()
      const query = 'SELECT * FROM events'
      const result = await conn.query(query)
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get events (Error: ${error})`)
    }
  }

  show = async (id: string): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect()
      const query = 'SELECT * FROM events WHERE id = $1'
      const result = await conn.query(query, [id])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get event (Error: ${error})`)
    }
  }

  create = async (event: UserEvent): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect()
      const query = 'INSERT INTO events (event_name, event_description, user) VALUES ($1, $2, $3) RETURNING *'
      const result = await conn.query(query, [event.event_name, event.event_description, event.user])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot create event (Error: ${error})`)
    }
  }

  delete = async (id: string): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect()
      const query = 'DELETE FROM events WHERE id = $1 RETURNING *'
      const result = await conn.query(query, [id])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot delete event (Error: ${error})`)
    }
  }

  edit = async (event: UserEvent): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect()
      const query = 'UPDATE events SET event_name = $1, event_description = $2, user = $3 WHERE id = $4 RETURNING *'
      const result = await conn.query(query, [event.event_name, event.event_description, event.user, event.id])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot update event (Error: ${error})`)
    }
  }

  eventsByUser = async (userId: string): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect()
      const query = 'SELECT * FROM events WHERE user = $1'
      const result = await conn.query(query, [userId])
      conn.release()
      return result.rows
    } catch (error) {
      throw new Error(`Cannot get events for current user (Error: ${error})`)
    }
  }
}

export default EventStore
