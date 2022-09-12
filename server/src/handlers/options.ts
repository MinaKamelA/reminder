import express from 'express';
import OptionStore from '../models/option';

const store = new OptionStore();

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
    const option: Option = {
      option_name: req.body.option_name,
      option_description: req.body.option_description,
      periodic: req.body.periodic,
      event: req.body.event
    };
    const result = await store.create(option);
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
    const option: Option = {
      id: parseInt(req.params.id),
      option_name: req.body.option_name,
      option_description: req.body.option_description,
      periodic: req.body.periodic,
      event: req.body.event
    };
    const result = await store.edit(option);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const eventOptions = async (req: express.Request, res: express.Response): Promise <void> => {
  try {
    const result = await store.optionsByEvent(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export { index, show, create, destroy, edit, eventOptions };
