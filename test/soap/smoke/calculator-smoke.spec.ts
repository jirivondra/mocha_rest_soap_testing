import { callOperation } from '../../../helpers/makeSoapRequest';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { SOAP_OPERATIONS } from '../../../config/soapOperations';
import { soapTestData } from '../../../testData/soapTestData';

describe('Smoke - Calculator SOAP', function () {
    it('Add', async function () {
        const { a, b, expected } = soapTestData.add.cases[0]!;
        const response = await callOperation(SOAP_OPERATIONS.ADD, { a, b });
        response.expectStatus(HTTP_STATUS.OK).expectResult(expected);
    });

    it('Subtract', async function () {
        const { a, b, expected } = soapTestData.subtract.cases[0]!;
        const response = await callOperation(SOAP_OPERATIONS.SUBTRACT, { a, b });
        response.expectStatus(HTTP_STATUS.OK).expectResult(expected);
    });

    it('Multiply', async function () {
        const { a, b, expected } = soapTestData.multiply.cases[0]!;
        const response = await callOperation(SOAP_OPERATIONS.MULTIPLY, { a, b });
        response.expectStatus(HTTP_STATUS.OK).expectResult(expected);
    });

    it('Divide', async function () {
        const { a, b, expected } = soapTestData.divide.cases[0]!;
        const response = await callOperation(SOAP_OPERATIONS.DIVIDE, { a, b });
        response.expectStatus(HTTP_STATUS.OK).expectResult(expected);
    });
});
