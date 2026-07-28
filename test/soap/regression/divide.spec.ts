import { callOperation } from '../../../helpers/makeSoapRequest';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { SOAP_OPERATIONS } from '../../../config/soapOperations';
import { soapTestData } from '../../../testData/soapTestData';

describe('SOAP - Divide', function () {
    soapTestData.divide.cases.forEach(({ a, b, expected }) => {
        it(`Divide(${a}, ${b}) = ${expected}`, async function () {
            const response = await callOperation(SOAP_OPERATIONS.DIVIDE, { a, b });
            response.expectStatus(HTTP_STATUS.OK).expectResult(expected);
        });
    });

    const { a: dividend, b: divisor, faultString } = soapTestData.divide.divisionByZero;

    it(`Divide(${dividend}, ${divisor}) → SOAP Fault`, async function () {
        const response = await callOperation(SOAP_OPERATIONS.DIVIDE, { a: dividend, b: divisor });
        response.expectStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR).expectFault(faultString);
    });

    soapTestData.common.invalidCases.forEach(({ a, b, description }) => {
        it(`Divide with ${description} → SOAP Fault`, async function () {
            const response = await callOperation(SOAP_OPERATIONS.DIVIDE, { a, b });
            response
                .expectStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .expectFaultContains(soapTestData.common.invalidTypeFault);
        });
    });
});
