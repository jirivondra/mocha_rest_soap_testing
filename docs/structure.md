# Project Structure

## Directory Overview

```
config/       # constants and static configuration
docs/         # project documentation
helpers/      # shared helpers used across all tests
schemas/      # schema definitions for response body validation
testData/     # centralized test input data, one file per protocol
types/        # TypeScript interfaces
test/
  rest/
    regression/   # regression tests — detailed assertions per endpoint
    smoke/        # smoke tests — full happy-path flows
  soap/
    regression/   # SOAP regression tests — detailed assertions per operation
    smoke/        # SOAP smoke tests — basic functional verification
```

## config/

Static, reusable constants shared across the project.

- `httpStatus.ts` — named HTTP status code constants (`HTTP_STATUS.OK`, `HTTP_STATUS.NOT_FOUND`, …), sourced from axios's `HttpStatusCode` enum. Always use these instead of raw numbers.
- `urls.ts` — named URL path constants. Always use these instead of inline strings.
- `soapOperations.ts` — named SOAP operation constants (`SOAP_OPERATIONS.ADD`, `SOAP_OPERATIONS.DIVIDE`, …). Always use these instead of raw strings.

## helpers/

Shared logic that supports test files. No test logic lives here.

- `apiClient.ts` — configures two Axios instances: `authenticatedClient` (with Basic Auth from `.env`) and `unauthenticatedClient`. Base URL is read from `BASE_URL` env variable.
- `makeRequest.ts` — thin wrapper over `apiClient` exposing `get`, `post`, `put`, `del`. Each function accepts `authenticated` flag (default `true`) and returns `ApiResponse`.
- `ApiResponse.ts` — fluent response wrapper. Provides `expectStatus(code)` and `expectJsonSchema(schema)` for assertions. Chains are supported (`response.expectStatus(...).expectJsonSchema(...)`).
- `soapClient.ts` — Axios instance for SOAP requests (`Content-Type: text/xml`). Base URL is read from `SOAP_URL` env variable.
- `makeSoapRequest.ts` — SOAP facade exposing `callOperation(operation, { a, b })`. Builds the XML envelope and returns `SoapResponse`.
- `SoapResponse.ts` — fluent SOAP response wrapper. Provides `expectStatus(code)` for assertions.

## testData/

Centralized test input data shared across all test files. One file per protocol.

- `restTestData.ts` — input data for REST tests, organized by endpoint. Dynamic values are generated with `faker`.
- `soapTestData.ts` — input data for SOAP tests, organized by operation. Contains `common` for shared invalid-input cases used across all operations.

Test files import the named export and reference data by key — never define input values inline in test files.

## schemas/

Schema definitions used by `ApiResponse.expectJsonSchema()` to validate response body shape and types. Written as standard JSON Schema objects, validated at runtime with `ajv`.

- `todo.schema.ts` — JSON Schema for the Todo entity: `properties` per field, a `required` array for mandatory fields, and `type: [..., 'null']` for nullable fields.

## types/

TypeScript interfaces for domain entities used in tests and helpers.

- `todo.ts` — `Todo` interface (id, title, completed, …).

## test/

All test files live here, organized by protocol and test type.

### test/rest/regression/

One file per endpoint. Each file covers all scenarios for that endpoint: happy path, authentication, validation errors, not found, etc.

### test/rest/smoke/

End-to-end flows that verify the system works as a whole. A single test typically creates, reads, updates, and deletes a resource in sequence.

### test/soap/regression/

One file per SOAP operation. Each file covers all scenarios for that operation: valid inputs, edge cases (e.g. division by zero), invalid values. Cross-operation tests that verify mathematical properties (round-trip, commutativity) live in `combined-operations.spec.ts`.

### test/soap/smoke/

Basic functional verification that each SOAP operation responds. Only the status code is asserted.

## .env

Runtime secrets and environment-specific config. Never committed to git.

```
BASE_URL=http://localhost:8000
API_USERNAME=your_username
API_PASSWORD=your_password
SOAP_URL=http://localhost:8001
```
