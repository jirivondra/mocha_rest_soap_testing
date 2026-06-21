# Testing Principles

## DRY (Don't Repeat Yourself)

All code must follow the DRY principle — no duplicated logic or code. Repeated parts belong in helpers.

## YAGNI (You Aren't Gonna Need It)

Only add code that is currently needed. Add new helpers, functions, or abstractions only when they are actually used.

## AAA (Arrange – Act – Assert)

Each `it` block follows the AAA pattern in a fixed order:

**Arrange** — prepare everything the test needs. Where this lives depends on the scope:

- `testData` const at the top of the file — static input values shared across tests
- `before` — one-time setup for the whole `describe` (e.g. create a resource that all tests will read)
- `beforeEach` — setup that must repeat before every test (e.g. create a fresh resource when each test will destroy it)

**Act** — one `await` call to `makeRequest`. A single HTTP request per test.

**Assert** — `response.expectStatus(...)` and optionally `.expectJsonSchema(...)`, chained on the response.

```ts
// Arrange (testData defined at file top, before() created the resource)
// Act
const response = await get(todoUrls.byId(todoId));
// Assert
response.expectStatus(HTTP_STATUS.OK).expectJsonSchema(todoSchema);
```

## before vs beforeEach

Choose based on whether the test consumes the resource:

- `before` + `after` — the resource survives all tests (GET, PUT scenarios: they read or update, never delete)
- `beforeEach` + `afterEach` — a fresh resource is needed for every test (DELETE scenarios: each test deletes the resource)

## Fluent assertions

`ApiResponse` methods return `this`, allowing assertions to be chained. Always chain — never split assertions into separate statements on the same response.

```ts
response.expectStatus(HTTP_STATUS.CREATED).expectJsonSchema(todoSchema);
```

## Named test data

All input values for a test file are grouped into a single `testData` constant at the top of the file, with named keys per variant. Tests reference these keys — never inline values.

```ts
const testData = {
    create: { title: faker.lorem.words(3), completed: false },
    update: { title: faker.lorem.words(3), completed: true },
    invalidDescription: { description: 'x'.repeat(5001) },
};
```

Each key names the scenario it represents (`valid`, `create`, `update`, `invalidDescription`), making the intent of each test readable without inspecting the data itself.

## Facade

Tests never import `axios` or interact with the HTTP client directly. `makeRequest` is a facade that hides the underlying `axios` instances and translates raw responses into `ApiResponse`. This means transport-level changes (auth, base URL, error handling) stay confined to one place and never leak into test files.

```
test file → makeRequest (facade) → apiClient (axios) → API
```

## No if conditions in helpers

Instead of `if/else` blocks, use a functional approach — `filter`, `forEach`, private methods. Conditions reduce readability and testability.

## Test isolation

Each `it` block must be fully independent — it must not rely on state left by another test or assume a specific execution order. Setup belongs in `before`/`beforeEach`, cleanup in `after`/`afterEach`.

## Single concern per test

Each `it` block tests exactly one thing — one status code, one scenario. Do not combine multiple independent assertions into a single test.

## No hardcoded static values

No static text or value may appear directly in code. Every static value must be assigned to a named variable. Allowed locations:

- **Top of the test file** — `const testData = { ... }`
- **External config/constants file** — `config/httpStatus.ts` for HTTP status codes, `config/urls.ts` for URL paths

This applies to: URLs, HTTP status codes, test input values, error messages, timeouts, and any other literal that would otherwise appear inline.
