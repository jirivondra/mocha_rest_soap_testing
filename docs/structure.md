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

- `httpStatus.ts` — re-exports `HTTP_STATUS` from `@jirivondra/chronos-test-toolkit-api-ts`, which sources its values from axios's `HttpStatusCode` enum. Always use these instead of raw numbers.
- `urls.ts` — named URL path constants. Always use these instead of inline strings.
- `soapOperations.ts` — named SOAP operation constants (`SOAP_OPERATIONS.ADD`, `SOAP_OPERATIONS.DIVIDE`, …). Always use these instead of raw strings.

## helpers/

Thin, project-local wiring around `@jirivondra/chronos-test-toolkit-api-ts`. No request/response logic lives here — that's the shared package's job.

- `apiClient.ts` — wires `createHttpClients` from the toolkit with this project's `.env` (`BASE_URL`, `API_USERNAME`, `API_PASSWORD`), exporting `clients: HttpClients`.
- `makeRequest.ts` — wires `createRequestHelpers(clients)` from the toolkit, re-exporting `get`, `post`, `put`, `del`. Each function accepts an `authenticated` flag (default `true`) and returns `ApiResponse`.
- `soapClient.ts` — wires `createSoapClient` from the toolkit against the WSDL at `SOAP_URL`.
- `makeSoapRequest.ts` — wires `createSoapRequestHelper` from the toolkit, re-exporting `callOperation(operation, params)`.

`ApiResponse` (fluent `expectStatus`/`expectJsonSchema`) and `SoapResponse` (fluent `expectStatus`/`expectResult`/`expectFault`/`expectFaultContains`) live entirely in `@jirivondra/chronos-test-toolkit-api-ts` — see that package's README for their full API.

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
