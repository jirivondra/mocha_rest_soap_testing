import { expect } from 'chai';

const RESULT_NOT_FOUND = 'Result element not found in response';
const FAULT_NOT_FOUND = 'Fault element not found in response';

export class SoapResponse {
    status: number;
    result: number | null;
    fault: string | null;

    constructor({ status, result, fault }: { status: number; result: number | null; fault: string | null }) {
        this.status = status;
        this.result = result;
        this.fault = fault;
    }

    expectStatus(code: number): this {
        expect(this.status).to.equal(code);
        return this;
    }

    getResult(): number {
        if (this.result === null) throw new Error(RESULT_NOT_FOUND);
        return this.result;
    }

    expectResult(expected: number): this {
        expect(this.getResult()).to.be.closeTo(expected, 0.001);
        return this;
    }

    expectFault(faultString: string): this {
        expect(this.getFault()).to.equal(faultString);
        return this;
    }

    expectFaultContains(substring: string): this {
        expect(this.getFault()).to.include(substring);
        return this;
    }

    private getFault(): string {
        if (this.fault === null) throw new Error(FAULT_NOT_FOUND);
        return this.fault;
    }
}
