import { expect } from 'chai';

const RESULT_NOT_FOUND = 'Result element not found in response';
const FAULT_NOT_FOUND = 'Fault element not found in response';

export class SoapResponse {
    status: number;
    body: string;

    constructor({ status, body }: { status: number; body: string }) {
        this.status = status;
        this.body = body;
    }

    expectStatus(code: number): this {
        expect(this.status).to.equal(code);
        return this;
    }

    getResult(): number {
        const match = this.body.match(/<tns:[A-Za-z]+Result>([-\d.]+)<\/tns:[A-Za-z]+Result>/);
        if (!match) throw new Error(RESULT_NOT_FOUND);
        return parseFloat(match[1]!);
    }

    expectResult(expected: number): this {
        expect(this.getResult()).to.be.closeTo(expected, 0.001);
        return this;
    }

    expectFault(faultString: string): this {
        const match = this.body.match(/<faultstring>(.*?)<\/faultstring>/);
        if (!match) throw new Error(FAULT_NOT_FOUND);
        expect(match[1]!).to.equal(faultString);
        return this;
    }

    expectFaultContains(substring: string): this {
        const match = this.body.match(/<faultstring>(.*?)<\/faultstring>/);
        if (!match) throw new Error(FAULT_NOT_FOUND);
        expect(match[1]!).to.include(substring);
        return this;
    }
}
