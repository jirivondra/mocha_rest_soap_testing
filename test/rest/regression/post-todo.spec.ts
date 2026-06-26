import { post, del } from '../../../helpers/makeRequest';
import { todoSchema } from '../../../schemas/todo.schema';
import type { Todo } from '../../../types/todo';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';
import { restTestData } from '../../../testData/restTestData';

describe('POST /todos', function () {
    let todoId: number;

    after(async function () {
        await del(todoUrls.todoById.valid(todoId));
    });

    it('Test for POST - 201', async function () {
        const response = await post(todoUrls.todos.base, restTestData.postTodo.valid);
        todoId = (response.json as Todo).id;
        response.expectStatus(HTTP_STATUS.CREATED).expectJsonSchema(todoSchema);
    });

    it('Test for POST - 401', async function () {
        const response = await post(todoUrls.todos.base, restTestData.postTodo.valid, false);
        response.expectStatus(HTTP_STATUS.UNAUTHORIZED);
    });

    it('Test for POST - 422', async function () {
        const response = await post(todoUrls.todos.base, restTestData.postTodo.invalidDescription);
        response.expectStatus(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    });
});
