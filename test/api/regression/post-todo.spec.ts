import { post, del } from '../../../helpers/makeRequest';
import { todoSchema } from '../../../schemas/todo.schema';
import { faker } from '@faker-js/faker';
import type { Todo } from '../../../types/todo';

const url = {
    base: '/todos',
    byId: (id: number) => `/todos/${id}`,
}

const testData = {
    valid: { title: faker.lorem.words(3), completed: false },
    invalidDescription: { title: faker.lorem.words(3), description: 'x'.repeat(5001), completed: false },
}

describe('POST /todos', function () {
    let todoId: number;

    after(async function () {
        await del(url.byId(todoId));
    });

    it('Test for POST - 201', async function () {
        const response = await post(url.base, testData.valid)
        todoId = (response.json as Todo).id;
        response
            .expectStatus(201)
            .expectJsonSchema(todoSchema)
    })

    it('Test for POST - 401', async function () {
        const response = await post(url.base, testData.valid, false)
        response.expectStatus(401)
    })

    it('Test for POST - 422', async function () {
        const response = await post(url.base, testData.invalidDescription)
        response.expectStatus(422)
    })
});
