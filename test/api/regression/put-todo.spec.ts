import { post, put, del } from '../../../helpers/makeRequest';
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
    create: { title: faker.lorem.words(3), completed: false },
    update: { title: faker.lorem.words(3), completed: true },
    invalidDescription: { description: 'x'.repeat(5001) },
}

describe('PUT /todos/:id', function () {
    let todoId: number;

    before(async function () {
        const response = await post(url.base, testData.create);
        todoId = (response.json as Todo).id;
    });

    after(async function () {
        await del(url.byId(todoId));
    });

    it('Test for PUT - 200', async function () {
        const response = await put(url.byId(todoId), testData.update)
        response
            .expectStatus(200)
            .expectJsonSchema(todoSchema)
    })

    it('Test for PUT - 401', async function () {
        const response = await put(url.byId(todoId), testData.update, false)
        response.expectStatus(401)
    })

    it('Test for PUT - 404', async function () {
        const response = await put(url.url404, testData.update)
        response.expectStatus(404)
    })

    it('Test for PUT - 422', async function () {
        const response = await put(url.url422, testData.invalidDescription)
        response.expectStatus(422)
    })
});
