# Test Patterns

## Layers

Tests are composed from four shared layers plus the test files themselves:

- **config/** — named constants for URLs and HTTP status codes. Never use raw strings or numbers in tests.
- **helpers/** — HTTP client (`makeRequest`) and response wrapper (`ApiResponse`). All request logic lives here.
- **schemas/** — response body shape definitions used for JSON validation.
- **types/** — TypeScript interfaces for domain entities.

## Making requests

`makeRequest` exposes `get`, `post`, `put`, `del`. Each returns `ApiResponse`. Pass `authenticated = false` to send an unauthenticated request (used for 401 test cases).

## Asserting responses

`ApiResponse` provides two chainable assertion methods:

- `expectStatus(code)` — asserts the HTTP status code
- `expectJsonSchema(schema)` — validates response body field types, required fields, and nullability

To read a value from the response body, cast `response.json` to the appropriate type.

## Test data

Dynamic values (titles, descriptions) are generated with `faker` and defined in a `testData` constant at the top of the file — never inline.

## Regression tests

One file per endpoint. Each `it` block covers exactly one status code. Resources created during a test are cleaned up in `after`.

## Smoke tests

One file per flow. Sequential `it` blocks share state via a `let` variable in the `describe` scope. Only the status code is asserted — detailed validation belongs in regression tests.

---

For step-by-step guidance when writing new tests, use:

- `/add-regression-test`
- `/add-smoke-test`
