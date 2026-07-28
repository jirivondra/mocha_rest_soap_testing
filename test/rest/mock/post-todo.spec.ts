import { post } from '../../../helpers/makeMockRequest';
import { todoSchema } from '../../../schemas/todo.schema';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';
import { mockTestData } from '../../../testData/mockTestData';

describe('POST /todos (WireMock)', function () {
    it('Test for POST - 201', async function () {
        const response = await post(todoUrls.todos.base, mockTestData.postTodo.valid);
        response.expectStatus(HTTP_STATUS.CREATED).expectJsonSchema(todoSchema);
    });
});
