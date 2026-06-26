import { post, del } from '../../../helpers/makeRequest';
import { todoSchema } from '../../../schemas/todo.schema';
import { faker } from '@faker-js/faker';
import type { Todo } from '../../../types/todo';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { todoUrls } from '../../../config/urls';

const testData = {
    valid: { title: faker.lorem.words(3), completed: false },
    invalidDescription: { title: faker.lorem.words(3), description: 'x'.repeat(5001), completed: false },
};

describe('POST /todos', function () {
    let todoId: number;

    after(async function () {
        await del(todoUrls.todoById.valid(todoId));
    });

    it('Test for POST - 201', async function () {
        const response = await post(todoUrls.todos.base, testData.valid);
        todoId = (response.json as Todo).id;
        response.expectStatus(HTTP_STATUS.CREATED).expectJsonSchema(todoSchema);
    });

    it('Test for POST - 401', async function () {
        const response = await post(todoUrls.todos.base, testData.valid, false);
        response.expectStatus(HTTP_STATUS.UNAUTHORIZED);
    });

    it('Test for POST - 422', async function () {
        const response = await post(todoUrls.todos.base, testData.invalidDescription);
        response.expectStatus(HTTP_STATUS.UNPROCESSABLE_ENTITY);
    });
});
