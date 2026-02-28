import { Request, Response } from 'express';
import db from '../config/database';

export const createResource = async (req: Request, res: Response) => {
  try {
    const { name, description, category, status } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const [id] = await db('resources').insert({
      name,
      description,
      category,
      status: status ?? 1,
    });
    const resource = await db('resources').where({ id }).first();
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource' });
  }
};

export const listResources = async (req: Request, res: Response) => {
  try {
    const { name, category, status } = req.query;
    let query = db('resources').select('*');

    if (name) query = query.where('name', 'like', `%${name}%`);
    if (category) query = query.where({ category });
    if (status) query = query.where({ status });

    const resources = await query;
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list resources' });
  }
};

export const getResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resource = await db('resources').where({ id }).first();
    if (!resource) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get resource' });
  }
};

export const updateResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, category, status } = req.body;
    
    const exists = await db('resources').where({ id }).first();
    if (!exists) {
      return res.status(404).json({ error: 'Resource not found' });
    }

    await db('resources').where({ id }).update({
      name,
      description,
      category,
      status,
      updated_at: db.fn.now(),
    });

    const updatedResource = await db('resources').where({ id }).first();
    res.json(updatedResource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update resource' });
  }
};

export const deleteResource = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedCount = await db('resources').where({ id }).delete();
    if (deletedCount === 0) {
      return res.status(404).json({ error: 'Resource not found' });
    }
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resource' });
  }
};
