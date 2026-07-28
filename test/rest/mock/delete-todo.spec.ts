import { del } from '../../../helpers/makeMockRequest';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';
import { mockTestData } from '../../../testData/mockTestData';

describe('DELETE /todos/{id} (WireMock)', function () {
    it('Test for DELETE - 204', async function () {
        const response = await del(todoUrls.todoById.valid(mockTestData.deleteTodo.id));
        response.expectStatus(HTTP_STATUS.NO_CONTENT);
    });
});
