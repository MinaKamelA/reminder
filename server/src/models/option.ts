/* eslint-disable @typescript-eslint/restrict-template-expressions */
import client from '../database';

// create OptionStore to consume options table from database
class OptionStore {
  // get all options
  index = async (): Promise <Option[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM options';
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get options (Error: ${error})`);
    }
  };

  // get single option
  show = async (id: string): Promise <Option[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM options WHERE id = $1';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get option (Error: ${error})`);
    }
  };

  // create new option
  create = async (option: Option): Promise <Option[]> => {
    try {
      const conn = await client.connect();
      const query = 'INSERT INTO options (option_name, option_description, periodic, event) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(query, [option.option_name, option.option_description, option.periodic, option.event]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot create option (Error: ${error})`);
    }
  };

  // delete an option
  delete = async (id: string): Promise <Option[]> => {
    try {
      const conn = await client.connect();
      const query = 'DELETE FROM options WHERE id = $1 RETURNING *';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot delete option (Error: ${error})`);
    }
  };

  // update an option
  edit = async (option: Option): Promise <Option[]> => {
    try {
      const conn = await client.connect();
      const query = 'UPDATE options SET option_name = $1, option_description = $2, periodic = $3, event = $4 WHERE id = $5 RETURNING *';
      const result = await conn.query(query, [option.option_name, option.option_description, option.periodic, option.event, option.id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot update option (Error: ${error})`);
    }
  };

  // get options of a specific event
  optionsByEvent = async (eventId: string): Promise <Option[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM options WHERE event = $1';
      const result = await conn.query(query, [eventId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get options for current event (Error: ${error})`);
    }
  };
}

export default OptionStore;
