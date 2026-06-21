export const todoUrls = {
    todos: {
        base: '/todos',
    },
    todoById: {
        valid: (id: number) => `/todos/${id}`,
        notFound: '/todos/99999',
        invalidId: '/todos/{id}',
    },
};
