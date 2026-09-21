import { post, put, del } from '../../../helpers/makeRequest';
import { todoSchema } from '../../../schemas/todo.schema';
import type { Todo } from '../../../types/todo';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';
import { restTestData } from '../../../testData/restTestData';

describe('PUT /todos/{id}', function () {
    before(async function () {
        const response = await post(todoUrls.todos.base, restTestData.putTodo.create);
        this.todoId = (response.json as Todo).id;
    });

    after(async function () {
        await del(todoUrls.todoById.valid(this.todoId));
    });

    it('Test for PUT - 200', async function () {
        const response = await put(todoUrls.todoById.valid(this.todoId), restTestData.putTodo.update);
        response.expectStatus(HTTP_STATUS.OK).expectJsonSchema(todoSchema);
    });

    it('Test for PUT with due_date - 200', async function () {
        const response = await put(todoUrls.todoById.valid(this.todoId), restTestData.putTodo.updateWithDueDate);
        response.expectStatus(HTTP_STATUS.OK).expectJsonSchema(todoSchema);
    });

    it('Test for PUT - 401', async function () {
        const response = await put(todoUrls.todoById.valid(this.todoId), restTestData.putTodo.update, false);
        response.expectStatus(HTTP_STATUS.UNAUTHORIZED);
    });

    it('Test for PUT - 404', async function () {
        const response = await put(todoUrls.todoById.notFound, restTestData.putTodo.update);
        response.expectStatus(HTTP_STATUS.NOT_FOUND);
    });

    it('Test for PUT - 422', async function () {
        const response = await put(todoUrls.todoById.valid(this.todoId), restTestData.putTodo.invalidDescription);
        response.expectStatus(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    });
});
