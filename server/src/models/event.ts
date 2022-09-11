/* eslint-disable @typescript-eslint/restrict-template-expressions */
import client from '../database';

// create EventStore to consume events table from database
class EventStore {
  // get all events
  index = async (): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM events';
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get events (Error: ${error})`);
    }
  };

  // get single event
  show = async (id: string): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM events WHERE id = $1';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get event (Error: ${error})`);
    }
  };

  // create new event
  create = async (event: UserEvent): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect();
      const query = 'INSERT INTO events (event_name, event_description, user) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(query, [event.event_name, event.event_description, event.user]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot create event (Error: ${error})`);
    }
  };

  // delete an event
  delete = async (id: string): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect();
      const query = 'DELETE FROM events WHERE id = $1 RETURNING *';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot delete event (Error: ${error})`);
    }
  };

  // update an event
  edit = async (event: UserEvent): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect();
      const query = 'UPDATE events SET event_name = $1, event_description = $2, user = $3 WHERE id = $4 RETURNING *';
      const result = await conn.query(query, [event.event_name, event.event_description, event.user, event.id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot update event (Error: ${error})`);
    }
  };

  // get events of a specific user
  eventsByUser = async (userId: string): Promise <UserEvent[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM events WHERE user = $1';
      const result = await conn.query(query, [userId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get events for current user (Error: ${error})`);
    }
  };
}

export default EventStore;
