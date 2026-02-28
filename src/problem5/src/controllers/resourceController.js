"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.updateResource = exports.getResource = exports.listResources = exports.createResource = void 0;
const express_1 = require("express");
const database_1 = __importDefault(require("../config/database"));
const createResource = async (req, res) => {
    try {
        const { name, description, category, status } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        const [id] = await (0, database_1.default)('resources').insert({
            name,
            description,
            category,
            status: status ?? 1,
        });
        const resource = await (0, database_1.default)('resources').where({ id }).first();
        res.status(201).json(resource);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create resource' });
    }
};
exports.createResource = createResource;
const listResources = async (req, res) => {
    try {
        const { name, category, status } = req.query;
        let query = (0, database_1.default)('resources').select('*');
        if (name)
            query = query.where('name', 'like', `%${name}%`);
        if (category)
            query = query.where({ category });
        if (status)
            query = query.where({ status });
        const resources = await query;
        res.json(resources);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to list resources' });
    }
};
exports.listResources = listResources;
const getResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await (0, database_1.default)('resources').where({ id }).first();
        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.json(resource);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to get resource' });
    }
};
exports.getResource = getResource;
const updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, status } = req.body;
        const exists = await (0, database_1.default)('resources').where({ id }).first();
        if (!exists) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        await (0, database_1.default)('resources').where({ id }).update({
            name,
            description,
            category,
            status,
            updated_at: database_1.default.fn.now(),
        });
        const updatedResource = await (0, database_1.default)('resources').where({ id }).first();
        res.json(updatedResource);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update resource' });
    }
};
exports.updateResource = updateResource;
const deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCount = await (0, database_1.default)('resources').where({ id }).delete();
        if (deletedCount === 0) {
            return res.status(404).json({ error: 'Resource not found' });
        }
        res.json({ message: 'Resource deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete resource' });
    }
};
exports.deleteResource = deleteResource;
//# sourceMappingURL=resourceController.js.map