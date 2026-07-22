import { expect } from 'chai';
import Ajv, { SchemaObject, ValidateFunction } from 'ajv';

const ajv = new Ajv({ allErrors: true });

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

    expectJsonSchema(schema: SchemaObject): this {
        const validate = ajv.compile(schema);
        this.normalizeToArray(this.json).forEach((item) => this.assertValid(validate, item));
        return this;
    }

    private normalizeToArray(json: unknown): unknown[] {
        return Array.isArray(json) ? json : [json];
    }

    private assertValid(validate: ValidateFunction, item: unknown): void {
        expect(validate(item), ajv.errorsText(validate.errors)).to.equal(true);
    }
}
