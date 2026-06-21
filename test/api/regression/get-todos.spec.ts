import { get } from '../../../helpers/makeRequest';
import { todoSchema } from '../../../schemas/todo.schema';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';

describe('GET /todos', function () {
    it('Test for GET - 200', async function () {
        const response = await get(todoUrls.todos.base);
        response.expectStatus(HTTP_STATUS.OK).expectJsonSchema(todoSchema);
    });

    it('Test for GET - 401', async function () {
        const response = await get(todoUrls.todos.base, false);
        response.expectStatus(HTTP_STATUS.UNAUTHORIZED);
    });
});
