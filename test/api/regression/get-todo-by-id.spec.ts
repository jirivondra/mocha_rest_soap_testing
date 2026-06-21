import { get, post, del } from '../../../helpers/makeRequest';
import { todoSchema } from '../../../schemas/todo.schema';
import { faker } from '@faker-js/faker';
import type { Todo } from '../../../types/todo';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';

const testData = {
    title: faker.lorem.words(3),
    completed: false,
};

describe('GET /todos/{id}', function () {
    let todoId: number;

    before(async function () {
        const response = await post(todoUrls.todos.base, testData);
        todoId = (response.json as Todo).id;
    });

    after(async function () {
        await del(todoUrls.todoById.valid(todoId));
    });

    it('Test for GET - 200', async function () {
        const response = await get(todoUrls.todoById.valid(todoId));
        response.expectStatus(HTTP_STATUS.OK).expectJsonSchema(todoSchema);
    });

    it('Test for GET - 401', async function () {
        const response = await get(todoUrls.todoById.valid(todoId), false);
        response.expectStatus(HTTP_STATUS.UNAUTHORIZED);
    });

    it('Test for GET - 404', async function () {
        const response = await get(todoUrls.todoById.notFound);
        response.expectStatus(HTTP_STATUS.NOT_FOUND);
    });

    it('Test for GET - 422', async function () {
        const response = await get(todoUrls.todoById.invalidId);
        response.expectStatus(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    });
});
