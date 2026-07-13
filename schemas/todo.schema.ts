export interface SchemaField {
    type: string;
    required: boolean;
    nullable: boolean;
}

export const todoSchema: Record<string, SchemaField> = {
    id: { type: 'number', required: true, nullable: false },
    title: { type: 'string', required: true, nullable: false },
    description: { type: 'string', required: false, nullable: true },
    completed: { type: 'boolean', required: true, nullable: false },
    due_date: { type: 'string', required: false, nullable: true },
};
