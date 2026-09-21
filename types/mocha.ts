declare module 'mocha' {
    interface Context {
        todoId: number;
        todoIdWithDueDate: number;
        result: number;
    }
}

export {};
