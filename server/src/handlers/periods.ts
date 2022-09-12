import express from 'express';
import PeriodStore from '../models/period';

const store = new PeriodStore();

const index = async (_req: express.Request, res: express.Response): Promise <void> => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: express.Request, res: express.Response): Promise <void> => {
  try {
    const result = await store.show(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: express.Request, res: express.Response): Promise <void> => {
  try {
    const period: Period = {
      interval: req.body.interval,
      every: req.body.every,
      option: req.body.option
    };
    const result = await store.create(period);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const destroy = async (req: express.Request, res: express.Response): Promise <void> => {
  try {
    const result = await store.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const edit = async (req: express.Request, res: express.Response): Promise <void> => {
  try {
    const period: Period = {
      id: parseInt(req.params.id),
      interval: req.body.interval,
      every: req.body.every,
      option: req.body.option
    };
    const result = await store.edit(period);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const optionPeriods = async (req: express.Request, res: express.Response): Promise <void> => {
  try {
    const result = await store.periodsByOption(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export { index, show, create, destroy, edit, optionPeriods };
