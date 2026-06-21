import { get, post, put, del } from '../../../helpers/makeRequest';
import { faker } from '@faker-js/faker';
import type { Todo } from '../../../types/todo';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';

const testData = {
    create: { title: faker.lorem.words(3), completed: false },
    update: { title: faker.lorem.words(3), completed: true },
};

describe('Smoke - TODO flow', function () {
    let todoId: number;

    it('POST /todos - 201', async function () {
        const response = await post(todoUrls.todos.base, testData.create);
        todoId = (response.json as Todo).id;
        response.expectStatus(HTTP_STATUS.CREATED);
    });

    it('GET /todos - 200', async function () {
        const response = await get(todoUrls.todos.base);
        response.expectStatus(HTTP_STATUS.OK);
    });

    it('GET /todos/{id}- 200', async function () {
        const response = await get(todoUrls.todoById.valid(todoId));
        response.expectStatus(HTTP_STATUS.OK);
    });

    it('PUT /todos/{id} - 200', async function () {
        const response = await put(todoUrls.todoById.valid(todoId), testData.update);
        response.expectStatus(HTTP_STATUS.OK);
    });

    it('DELETE /todos/{id} - 204', async function () {
        const response = await del(todoUrls.todoById.valid(todoId));
        response.expectStatus(HTTP_STATUS.NO_CONTENT);
    });
});
