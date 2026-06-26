import { post, put, del } from '../../../helpers/makeRequest';
import { todoSchema } from '../../../schemas/todo.schema';
import { faker } from '@faker-js/faker';
import type { Todo } from '../../../types/todo';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';

const testData = {
    create: { title: faker.lorem.words(3), completed: false },
    update: { title: faker.lorem.words(3), completed: true },
    invalidDescription: { description: 'x'.repeat(5001) },
};

describe('PUT /todos/{id}', function () {
    let todoId: number;

    before(async function () {
        const response = await post(todoUrls.todos.base, testData.create);
        todoId = (response.json as Todo).id;
    });

    after(async function () {
        await del(todoUrls.todoById.valid(todoId));
    });

    it('Test for PUT - 200', async function () {
        const response = await put(todoUrls.todoById.valid(todoId), testData.update);
        response.expectStatus(HTTP_STATUS.OK).expectJsonSchema(todoSchema);
    });

    it('Test for PUT - 401', async function () {
        const response = await put(todoUrls.todoById.valid(todoId), testData.update, false);
        response.expectStatus(HTTP_STATUS.UNAUTHORIZED);
    });

    it('Test for PUT - 404', async function () {
        const response = await put(todoUrls.todoById.notFound, testData.update);
        response.expectStatus(HTTP_STATUS.NOT_FOUND);
    });

    it('Test for PUT - 422', async function () {
        const response = await put(todoUrls.todoById.invalidId, testData.invalidDescription);
        response.expectStatus(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    });
});
