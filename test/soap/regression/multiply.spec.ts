import { callOperation } from '../../../helpers/makeSoapRequest';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { SOAP_OPERATIONS } from '../../../config/soapOperations';
import { soapTestData } from '../../../testData/soapTestData';

describe('SOAP - Multiply', function () {
    soapTestData.multiply.cases.forEach(({ a, b, expected }) => {
        it(`Multiply(${a}, ${b}) = ${expected}`, async function () {
            const response = await callOperation(SOAP_OPERATIONS.MULTIPLY, { a, b });
            response.expectStatus(HTTP_STATUS.OK).expectResult(expected);
        });
    });

    soapTestData.common.invalidCases.forEach(({ a, b, description }) => {
        it(`Multiply with ${description} → SOAP Fault`, async function () {
            const response = await callOperation(SOAP_OPERATIONS.MULTIPLY, { a, b });
            response
                .expectStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .expectFaultContains(soapTestData.common.invalidTypeFault);
        });
    });
});
