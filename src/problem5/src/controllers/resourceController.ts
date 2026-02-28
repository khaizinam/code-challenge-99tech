import { Request, Response } from 'express';
import db from '../config/database';
import { sendSuccess, sendError } from '../utils/response';

export const createResource = async (req: Request, res: Response) => {
    try {
        const { name, description, category, status } = req.body;

        if (!name) {
            return sendError(res, 'Name is required', 400);
        }

        const [id] = await db('resources').insert({
            name,
            description,
            category,
            status: status ?? 1,
        });

        const resource = await db('resources').where({ id }).first();
        return sendSuccess(res, resource, 'Resource created successfully', 201);
    } catch (error: any) {
        console.error('Create Resource Error:', error);
        return sendError(res, error.message || 'Failed to create resource');
    }
};

export const listResources = async (req: Request, res: Response) => {
    try {
        const { name, category, status, page = 1, limit = 10 } = req.query;
        const pageNum = Number(page);
        const limitNum = Number(limit);
        const offset = (pageNum - 1) * limitNum;

        let query = db('resources');

        if (name) query = query.where('name', 'like', `%${name}%`);
        if (category) query = query.where({ category });
        if (status) query = query.where({ status });

        // Get total count for pagination
        const countResult = await query.clone().count('id as total');
        const totalItem = Number(countResult[0]?.total || 0);
        const totalPage = Math.ceil(totalItem / limitNum);

        const resources = await query
            .select('*')
            .limit(limitNum)
            .offset(offset);

        return sendSuccess(
            res,
            resources,
            'Resources listed successfully',
            200,
            {
                page: pageNum,
                total_item: totalItem,
                total_page: totalPage,
            },
        );
    } catch (error: any) {
        console.error('List Resources Error:', error);
        return sendError(res, error.message || 'Failed to list resources');
    }
};

export const getResource = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const resource = await db('resources').where({ id }).first();

        if (!resource) {
            return sendError(res, 'Resource not found', 404);
        }

        return sendSuccess(res, resource, 'Resource fetched successfully');
    } catch (error: any) {
        console.error('Get Resource Error:', error);
        return sendError(res, error.message || 'Failed to get resource');
    }
};

export const updateResource = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, category, status } = req.body;

        const exists = await db('resources').where({ id }).first();
        if (!exists) {
            return sendError(res, 'Resource not found', 404);
        }

        await db('resources').where({ id }).update({
            name,
            description,
            category,
            status,
            updated_at: db.fn.now(),
        });

        const updatedResource = await db('resources').where({ id }).first();
        return sendSuccess(
            res,
            updatedResource,
            'Resource updated successfully',
        );
    } catch (error: any) {
        console.error('Update Resource Error:', error);
        return sendError(res, error.message || 'Failed to update resource');
    }
};

export const deleteResource = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedCount = await db('resources').where({ id }).delete();

        if (deletedCount === 0) {
            return sendError(res, 'Resource not found', 404);
        }

        return sendSuccess(res, null, 'Resource deleted successfully');
    } catch (error: any) {
        console.error('Delete Resource Error:', error);
        return sendError(res, error.message || 'Failed to delete resource');
    }
};
