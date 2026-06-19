import { get, post, put, del } from '../../../helpers/makeRequest';
import { faker } from '@faker-js/faker';
import type { Todo } from '../../../types/todo';

const url = {
    base: '/todos',
    byId: (id: number) => `/todos/${id}`,
}

const testData = {
    create: { title: faker.lorem.words(3), completed: false },
    update: { title: faker.lorem.words(3), completed: true },
}

describe('Smoke - TODO flow', function () {
    let todoId: number;

    it('POST /todos - 201', async function () {
        const response = await post(url.base, testData.create);
        todoId = (response.json as Todo).id;
        response.expectStatus(201);
    });

    it('GET /todos - 200', async function () {
        const response = await get(url.base);
        response.expectStatus(200);
    });

    it('GET /todos/:id - 200', async function () {
        const response = await get(url.byId(todoId));
        response.expectStatus(200);
    });

    it('PUT /todos/:id - 200', async function () {
        const response = await put(url.byId(todoId), testData.update);
        response.expectStatus(200);
    });

    it('DELETE /todos/:id - 204', async function () {
        const response = await del(url.byId(todoId));
        response.expectStatus(204);
    });
});
