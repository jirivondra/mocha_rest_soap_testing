import { get, post, del } from '../../../helpers/makeRequest';
import { todoSchema } from '../../../schemas/todo.schema';
import { faker } from '@faker-js/faker';
import type { Todo } from '../../../types/todo';

const url = {
    base: '/todos',
    byId: (id: number) => `/todos/${id}`,
    url404: '/todos/99999',
    url422: '/todos/:id',
}

const testData = {
    title: faker.lorem.words(3),
    completed: false,
}

describe('GET /todos/:id', function () {
    let todoId: number;

    before(async function () {
        const response = await post(url.base, testData);
        todoId = (response.json as Todo).id;
    });

    after(async function () {
        await del(url.byId(todoId));
    });

    it('Test for GET - 200', async function () {
        const response = await get(url.byId(todoId))
        response
            .expectStatus(200)
            .expectJsonSchema(todoSchema)
    })

    it('Test for GET - 401', async function () {
        const response = await get(url.byId(todoId), false)
        response.expectStatus(401)
    })

    it('Test for GET - 404', async function () {
        const response = await get(url.url404)
        response.expectStatus(404)
    })

    it('Test for GET - 422', async function () {
        const response = await get(url.url422)
        response.expectStatus(422)
    })
});
