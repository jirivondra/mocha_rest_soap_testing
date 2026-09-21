export const todoUrls = {
    todos: {
        base: '/todos',
    },
    todoById: {
        /**
         * Builds the path of a single todo, e.g. `/todos/42`.
         * @param id - id of an existing todo
         */
        valid: (id: number) => `/todos/${id}`,
        notFound: '/todos/99999',
        invalidId: '/todos/{id}',
    },
};
