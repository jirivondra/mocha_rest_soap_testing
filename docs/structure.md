# Project Structure

## Directory Overview

```
config/       # constants and static configuration
docs/         # project documentation
helpers/      # shared helpers used across all tests
schemas/      # schema definitions for response body validation
types/        # TypeScript interfaces
test/
  api/
    regression/   # regression tests — detailed assertions per endpoint
    smoke/        # smoke tests — full happy-path flows
  soap/           # SOAP service tests
```

## config/

Static, reusable constants shared across the project.

- `httpStatus.ts` — named HTTP status code constants (`HTTP_STATUS.OK`, `HTTP_STATUS.NOT_FOUND`, …). Always use these instead of raw numbers.
- `urls.ts` — named URL path constants. Always use these instead of inline strings.

## helpers/

Shared logic that supports test files. No test logic lives here.

- `apiClient.ts` — configures two Axios instances: `authenticatedClient` (with Basic Auth from `.env`) and `unauthenticatedClient`. Base URL is read from `BASE_URL` env variable.
- `makeRequest.ts` — thin wrapper over `apiClient` exposing `get`, `post`, `put`, `del`. Each function accepts `authenticated` flag (default `true`) and returns `ApiResponse`.
- `ApiResponse.ts` — fluent response wrapper. Provides `expectStatus(code)` and `expectJsonSchema(schema)` for assertions. Chains are supported (`response.expectStatus(...).expectJsonSchema(...)`).

## schemas/

Schema definitions used by `ApiResponse.expectJsonSchema()` to validate response body shape and types.

- `todo.schema.ts` — schema for the Todo entity, describing each field's type, `required` flag, and `nullable` flag.

## types/

TypeScript interfaces for domain entities used in tests and helpers.

- `todo.ts` — `Todo` interface (id, title, completed, …).

## test/

All test files live here, organized by protocol and test type.

### test/api/regression/

One file per endpoint. Each file covers all scenarios for that endpoint: happy path, authentication, validation errors, not found, etc.

### test/api/smoke/

End-to-end flows that verify the system works as a whole. A single test typically creates, reads, updates, and deletes a resource in sequence.

### test/soap/

Tests for SOAP services, structured similarly to API tests.

## .env

Runtime secrets and environment-specific config. Never committed to git.

```
BASE_URL=http://localhost:8000
API_USERNAME=your_username
API_PASSWORD=your_password
```
