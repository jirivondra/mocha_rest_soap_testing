import { callOperation } from '../../../helpers/makeSoapRequest';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { SOAP_OPERATIONS } from '../../../config/soapOperations';
import { soapTestData } from '../../../testData/soapTestData';

describe('SOAP - Subtract', function () {
    soapTestData.subtract.cases.forEach(({ a, b, expected }) => {
        it(`Subtract(${a}, ${b}) = ${expected}`, async function () {
            const response = await callOperation(SOAP_OPERATIONS.SUBTRACT, { a, b });
            response.expectStatus(HTTP_STATUS.OK).expectResult(expected);
        });
    });

    soapTestData.common.invalidCases.forEach(({ a, b, description }) => {
        it(`Subtract with ${description} → SOAP Fault`, async function () {
            const response = await callOperation(SOAP_OPERATIONS.SUBTRACT, { a, b });
            response
                .expectStatus(HTTP_STATUS.INTERNAL_SERVER_ERROR)
                .expectFaultContains(soapTestData.common.invalidTypeFault);
        });
    });
});
