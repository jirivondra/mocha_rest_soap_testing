import type { SchemaObject } from 'ajv';

export const todoSchema: SchemaObject = {
    type: 'object',
    properties: {
        id: { type: 'number' },
        title: { type: 'string' },
        description: { type: ['string', 'null'] },
        completed: { type: 'boolean' },
        due_date: { type: ['string', 'null'] },
    },
    required: ['id', 'title', 'completed'],
};
