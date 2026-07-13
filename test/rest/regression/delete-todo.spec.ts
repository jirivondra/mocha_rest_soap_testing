import { post, del } from '../../../helpers/makeRequest';
import type { Todo } from '../../../types/todo';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';
import { restTestData } from '../../../testData/restTestData';

describe('DELETE /todos/{id}', function () {
    let todoId: number;

    beforeEach(async function () {
        const response = await post(todoUrls.todos.base, restTestData.deleteTodo.create);
        todoId = (response.json as Todo).id;
    });

    afterEach(async function () {
        await del(todoUrls.todoById.valid(todoId));
    });

    it('Test for DELETE - 204', async function () {
        const response = await del(todoUrls.todoById.valid(todoId));
        response.expectStatus(HTTP_STATUS.NO_CONTENT);
    });

    it('Test for DELETE - 401', async function () {
        const response = await del(todoUrls.todoById.valid(todoId), false);
        response.expectStatus(HTTP_STATUS.UNAUTHORIZED);
    });

    it('Test for DELETE - 404', async function () {
        const response = await del(todoUrls.todoById.notFound);
        response.expectStatus(HTTP_STATUS.NOT_FOUND);
    });

    it('Test for DELETE - 422', async function () {
        const response = await del(todoUrls.todoById.invalidId);
        response.expectStatus(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    });
});
