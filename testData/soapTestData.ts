export const soapTestData = {
    common: {
        invalidCases: [
            { a: 'abc', b: 1, description: 'non-numeric string' },
            { a: '!@#', b: 1, description: 'special characters' },
            { a: '', b: 1, description: 'empty string' },
        ],
        invalidTypeFault: "is not a valid value of the atomic type 'xs:float'",
    },
    add: {
        cases: [
            { a: 5, b: 3, expected: 8 },
            { a: -5, b: -3, expected: -8 },
            { a: -5, b: 3, expected: -2 },
            { a: 0, b: 5, expected: 5 },
            { a: 1.5, b: 2.5, expected: 4.0 },
        ],
    },
    subtract: {
        cases: [
            { a: 10, b: 4, expected: 6 },
            { a: 5, b: 5, expected: 0 },
            { a: 3, b: 10, expected: -7 },
            { a: -3, b: -2, expected: -1 },
            { a: 5.5, b: 2.5, expected: 3.0 },
        ],
    },
    multiply: {
        cases: [
            { a: 3, b: 4, expected: 12 },
            { a: 5, b: 0, expected: 0 },
            { a: -3, b: 4, expected: -12 },
            { a: -3, b: -4, expected: 12 },
            { a: 2.5, b: 4, expected: 10.0 },
        ],
    },
    divide: {
        cases: [
            { a: 10, b: 2, expected: 5 },
            { a: 7, b: 2, expected: 3.5 },
            { a: -10, b: 2, expected: -5 },
            { a: 0, b: 5, expected: 0 },
        ],
        divisionByZero: { a: 10, b: 0, faultString: 'Division by zero is not allowed' },
    },
};
