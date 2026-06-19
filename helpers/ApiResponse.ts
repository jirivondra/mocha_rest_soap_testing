import { expect } from 'chai';
import type { SchemaField } from '../schemas/todo.schema';

export class ApiResponse {
  status: number;
  json: unknown;

  constructor({ status, json }: { status: number; json: unknown }) {
    this.status = status;
    this.json = json;
  }

  expectStatus(code: number): this {
    expect(this.status).to.equal(code);
    return this;
  }

expectJsonSchema(schema: Record<string, SchemaField>): this {
    this.normalizeToArray(this.json).forEach((item) => {
      this.validateRequiredKeys(item, schema);
      this.validateFieldTypes(item, schema);
    });
    return this;
  }

  private normalizeToArray(json: unknown): Record<string, unknown>[] {
    return Array.isArray(json) ? json : [json as Record<string, unknown>];
  }

  private validateRequiredKeys(json: Record<string, unknown>, schema: Record<string, SchemaField>): void {
    const requiredKeys = Object.entries(schema)
      .filter(([, field]) => field.required)
      .map(([key]) => key);
    expect(json).to.include.all.keys(requiredKeys);
  }

  private validateFieldTypes(json: Record<string, unknown>, schema: Record<string, SchemaField>): void {
    Object.entries(schema)
      .filter(([key]) => key in json && json[key] !== null)
      .forEach(([key, field]) => expect(json[key], `property "${key}"`).to.be.a(field.type));

    Object.entries(schema)
      .filter(([key, field]) => key in json && json[key] === null && !field.nullable)
      .forEach(([key]) => expect.fail(`property "${key}" is null but not nullable`));
  }
}
