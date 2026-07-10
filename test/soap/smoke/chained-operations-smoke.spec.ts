import { callOperation } from '../../../helpers/makeSoapRequest';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { SOAP_OPERATIONS } from '../../../config/soapOperations';
import { soapTestData } from '../../../testData/soapTestData';

describe('Smoke - Chained Operations', function () {
    let result: number;

    it('Add - step 1', async function () {
        const { a, b } = soapTestData.chained.add;
        const response = await callOperation(SOAP_OPERATIONS.ADD, { a, b });
        result = response.expectStatus(HTTP_STATUS.OK).getResult();
    });

    it('Subtract - step 2', async function () {
        const response = await callOperation(SOAP_OPERATIONS.SUBTRACT, {
            a: result,
            b: soapTestData.chained.subtract.b,
        });
        result = response.expectStatus(HTTP_STATUS.OK).getResult();
    });

    it('Multiply - step 3', async function () {
        const response = await callOperation(SOAP_OPERATIONS.MULTIPLY, {
            a: result,
            b: soapTestData.chained.multiply.b,
        });
        result = response.expectStatus(HTTP_STATUS.OK).getResult();
    });

    it('Divide - step 4', async function () {
        const response = await callOperation(SOAP_OPERATIONS.DIVIDE, { a: result, b: soapTestData.chained.divide.b });
        response.expectStatus(HTTP_STATUS.OK);
    });
});
