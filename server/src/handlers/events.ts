import express from 'express';
import EventStore from '../models/event';

const store = new EventStore();

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
    const newEvent: UserEvent = {
      event_name: req.body.event_name,
      event_description: req.body.event_description,
      user: parseInt(req.userId)
    };
    const result = await store.create(newEvent);
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
    const newEvent: UserEvent = {
      id: parseInt(req.params.id),
      event_name: req.body.event_name,
      event_description: req.body.event_description,
      user: req.body.id
    };
    const result = await store.edit(newEvent);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const userEvents = async (req: express.Request, res: express.Response): Promise <void> => {
  try {
    if (req.userId !== req.params.id) {
      res.status(403);
      res.json('You don\'t have permission to perform this action (Unauthorized)');
    }
    const result = await store.eventsByUser(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

export { index, show, create, destroy, edit, userEvents };
