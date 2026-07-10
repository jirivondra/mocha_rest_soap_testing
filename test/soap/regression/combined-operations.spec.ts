import { callOperation } from '../../../helpers/makeSoapRequest';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { SOAP_OPERATIONS } from '../../../config/soapOperations';
import { soapTestData } from '../../../testData/soapTestData';

describe('SOAP - Combined Operations', function () {
    describe('Round-trip: Add → Subtract', function () {
        soapTestData.roundTrip.forEach(({ a, b }) => {
            it(`Add(${a}, ${b}) → Subtract(result, ${b}) = ${a}`, async function () {
                const addResponse = await callOperation(SOAP_OPERATIONS.ADD, { a, b });
                const sum = addResponse.expectStatus(HTTP_STATUS.OK).getResult();
                const subtractResponse = await callOperation(SOAP_OPERATIONS.SUBTRACT, { a: sum, b });
                subtractResponse.expectStatus(HTTP_STATUS.OK).expectResult(a);
            });
        });
    });

    describe('Round-trip: Multiply → Divide', function () {
        soapTestData.roundTrip.forEach(({ a, b }) => {
            it(`Multiply(${a}, ${b}) → Divide(result, ${b}) = ${a}`, async function () {
                const mulResponse = await callOperation(SOAP_OPERATIONS.MULTIPLY, { a, b });
                const product = mulResponse.expectStatus(HTTP_STATUS.OK).getResult();
                const divResponse = await callOperation(SOAP_OPERATIONS.DIVIDE, { a: product, b });
                divResponse.expectStatus(HTTP_STATUS.OK).expectResult(a);
            });
        });
    });

    describe('Commutativity: Add', function () {
        soapTestData.commutativity.forEach(({ a, b, addExpected }) => {
            it(`Add(${a}, ${b}) = Add(${b}, ${a}) = ${addExpected}`, async function () {
                const r1 = await callOperation(SOAP_OPERATIONS.ADD, { a, b });
                const r2 = await callOperation(SOAP_OPERATIONS.ADD, { a: b, b: a });
                r1.expectStatus(HTTP_STATUS.OK).expectResult(addExpected);
                r2.expectStatus(HTTP_STATUS.OK).expectResult(addExpected);
            });
        });
    });

    describe('Commutativity: Multiply', function () {
        soapTestData.commutativity.forEach(({ a, b, multiplyExpected }) => {
            it(`Multiply(${a}, ${b}) = Multiply(${b}, ${a}) = ${multiplyExpected}`, async function () {
                const r1 = await callOperation(SOAP_OPERATIONS.MULTIPLY, { a, b });
                const r2 = await callOperation(SOAP_OPERATIONS.MULTIPLY, { a: b, b: a });
                r1.expectStatus(HTTP_STATUS.OK).expectResult(multiplyExpected);
                r2.expectStatus(HTTP_STATUS.OK).expectResult(multiplyExpected);
            });
        });
    });
});
