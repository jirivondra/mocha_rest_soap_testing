# Testing Principles

## DRY (Don't Repeat Yourself)

All code must follow the DRY principle — no duplicated logic or code. Repeated parts belong in helpers.

## YAGNI (You Aren't Gonna Need It)

Only add code that is currently needed. Add new helpers, functions, or abstractions only when they are actually used.

## AAA (Arrange – Act – Assert)

Each `it` block follows the AAA pattern in a fixed order:

**Arrange** — prepare everything the test needs. Where this lives depends on the scope:

- `testData/` — centralized input values imported into the test file
- `before` — one-time setup for the whole `describe` (e.g. create a resource that all tests will read)
- `beforeEach` — setup that must repeat before every test (e.g. create a fresh resource when each test will destroy it)

**Act** — one `await` call to `makeRequest`. A single HTTP request per test. Exception: tests that verify mathematical properties across operations (round-trip, commutativity) may make multiple calls within a single `it` block when the property under test inherently requires it.

**Assert** — `response.expectStatus(...)` and optionally `.expectJsonSchema(...)`, chained on the response.

```ts
// Arrange (testData imported from testData/, before() created the resource)
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

All test input values live in `testData/`, one file per protocol. Test files import from there — never define input values inline.

```ts
import { restTestData } from '../../../testData/restTestData';
```

Each file is a single named export organized by endpoint or operation at the top level, with named scenario keys below:

```ts
export const restTestData = {
    postTodo: {
        valid: { title: faker.lorem.words(3), completed: false },
        invalidDescription: { title: faker.lorem.words(3), description: 'x'.repeat(5001), completed: false },
    },
    // ...
};
```

**Naming conventions:**

- Top-level key — name of the endpoint or operation (`postTodo`, `add`, `smoke`)
- Scenario key — intent of the data (`valid`, `create`, `update`, `invalidDescription`)
- Shared data across operations — group under `common`

**Dynamic vs. static data:**

- Use `faker` for REST data where values must be unique across runs (titles, descriptions)
- Use static values for SOAP data where results must be deterministic (mathematical inputs and expected outputs)

**Smoke tests** reference the first item from regression cases (`cases[0]`) rather than maintaining a separate copy of the same data.

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

## Data-driven tests

When the same operation must be verified across multiple input combinations, use a `forEach` loop over a `cases` array instead of repeating `it` blocks manually. Each array entry produces one independent test.

Use data-driven tests when:

- The same endpoint or operation is tested with many input variants (positive, negative, float, zero, …)
- The test body is identical across all variants — only the inputs and expected result differ

Do not use data-driven tests when:

- The scenarios differ structurally (different setup, different assertions) — write separate `it` blocks instead
- There is only one or two variants — `forEach` over a single-element array adds noise without benefit

## No hardcoded static values

No static text or value may appear directly in code. Every static value must be assigned to a named variable. Allowed locations:

- **`testData/`** — test input values, expected results, error message strings
- **`config/httpStatus.ts`** — HTTP status codes
- **`config/urls.ts`** — REST URL paths
- **`config/soapOperations.ts`** — SOAP operation names

This applies to: URLs, HTTP status codes, test input values, error messages, timeouts, and any other literal that would otherwise appear inline.
