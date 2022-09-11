/* eslint-disable @typescript-eslint/restrict-template-expressions */
import client from '../database';

// create PeriodStore to consume periods table from database
class PeriodStore {
  // get all periods
  index = async (): Promise <Period[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM periods';
      const result = await conn.query(query);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get periods (Error: ${error})`);
    }
  };

  // get single period
  show = async (id: string): Promise <Period[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM periods WHERE id = $1';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get period (Error: ${error})`);
    }
  };

  // create new period
  create = async (period: Period): Promise <Period[]> => {
    try {
      const conn = await client.connect();
      const query = 'INSERT INTO periods (interval, every, option) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(query, [period.interval, period.every, period.option]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot create period (Error: ${error})`);
    }
  };

  // delete a period
  delete = async (id: string): Promise <Period[]> => {
    try {
      const conn = await client.connect();
      const query = 'DELETE FROM periods WHERE id = $1 RETURNING *';
      const result = await conn.query(query, [id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot delete period (Error: ${error})`);
    }
  };

  // update a period
  edit = async (period: Period): Promise <Period[]> => {
    try {
      const conn = await client.connect();
      const query = 'UPDATE periods SET interval = $1, every = $2, option = $3 WHERE id = $4 RETURNING *';
      const result = await conn.query(query, [period.interval, period.every, period.option, period.id]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot update period (Error: ${error})`);
    }
  };

  // get periods of a specific option
  periodsByUser = async (optionId: string): Promise <Period[]> => {
    try {
      const conn = await client.connect();
      const query = 'SELECT * FROM periods WHERE option = $1';
      const result = await conn.query(query, [optionId]);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get periods for current option (Error: ${error})`);
    }
  };
}

export default PeriodStore;
