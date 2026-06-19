import { post, del } from '../../../helpers/makeRequest';
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
}

describe('DELETE /todos/:id', function () {
    let todoId: number;

    beforeEach(async function () {
        const response = await post(url.base, testData.create);
        todoId = (response.json as Todo).id;
    });

    it('Test for DELETE - 204', async function () {
        const response = await del(url.byId(todoId))
        response.expectStatus(204)
    })

    it('Test for DELETE - 401', async function () {
        const response = await del(url.byId(todoId), false)
        response.expectStatus(401)
    })

    it('Test for DELETE - 404', async function () {
        const response = await del(url.url404)
        response.expectStatus(404)
    })

    it('Test for DELETE - 422', async function () {
        const response = await del(url.url422)
        response.expectStatus(422)
    })

    afterEach(async function () {
        await del(url.byId(todoId));
    });
});
