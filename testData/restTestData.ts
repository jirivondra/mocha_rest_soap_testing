import { faker } from '@faker-js/faker';

export const restTestData = {
    getTodoById: {
        create: { title: faker.lorem.words(3), completed: false },
    },
    postTodo: {
        valid: { title: faker.lorem.words(3), completed: false },
        invalidDescription: { title: faker.lorem.words(3), description: 'x'.repeat(5001), completed: false },
    },
    putTodo: {
        create: { title: faker.lorem.words(3), completed: false },
        update: { title: faker.lorem.words(3), completed: true },
        invalidDescription: { title: faker.lorem.words(3), description: 'x'.repeat(5001) },
    },
    deleteTodo: {
        create: { title: faker.lorem.words(3), completed: false },
    },
    smoke: {
        create: { title: faker.lorem.words(3), completed: false },
        update: { title: faker.lorem.words(3), completed: true },
    },
};
