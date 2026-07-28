import { put } from '../../../helpers/makeMockRequest';
import { todoSchema } from '../../../schemas/todo.schema';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';
import { mockTestData } from '../../../testData/mockTestData';

describe('PUT /todos/{id} (WireMock)', function () {
    it('Test for PUT - 200', async function () {
        const response = await put(todoUrls.todoById.valid(mockTestData.putTodo.id), mockTestData.putTodo.update);
        response.expectStatus(HTTP_STATUS.OK).expectJsonSchema(todoSchema);
    });
});
