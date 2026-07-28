# Mocha REST & SOAP Testing

Automated tests for REST API and SOAP services using the Mocha framework.

## Libraries

| Library                                                                                              | Version | Purpose                                                                                      |
| ---------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| [@jirivondra/chronos-test-toolkit-api-ts](https://github.com/jirivondra/chronos-test-toolkit-api-ts) | ^0.1    | Shared HTTP/SOAP client helpers, response wrappers (brings axios/chai/ajv/soap transitively) |
| [mocha](https://mochajs.org)                                                                         | ^11     | Test framework                                                                               |
| [dotenv](https://github.com/motdotla/dotenv)                                                         | ^17     | Loading variables from `.env`                                                                |
| [typescript](https://www.typescriptlang.org)                                                         | ^6      | TypeScript support                                                                           |
| [ts-node](https://typestrong.org/ts-node)                                                            | ^10     | Running TypeScript files                                                                     |
| [allure-mocha](https://allurereport.org)                                                             | ^3      | Allure report generation                                                                     |
| [@faker-js/faker](https://fakerjs.dev)                                                               | ^10     | Dynamic test data generation                                                                 |

## Installation

`@jirivondra/chronos-test-toolkit-api-ts` is published to GitHub Packages. Add a personal access token
(`read:packages` scope) to your global `~/.npmrc`:

```
//npm.pkg.github.com/:_authToken=<your-token>
```

Then:

```bash
npm install
```

## Configuration

Create a `.env` file in the project root:

```
BASE_URL=http://localhost:8000
API_USERNAME=your_username
API_PASSWORD=your_password
SOAP_URL=http://localhost:8001
WIREMOCK_URL=http://localhost:8080
```

## Running Tests

### npm

```bash
npm test                       # all tests
npm run test:rest              # REST tests only
npm run test:soap              # SOAP tests only
npm run test:regression        # REST regression tests
npm run test:soap:regression   # SOAP regression tests
npm run test:smoke             # REST smoke tests
npm run test:soap:smoke        # SOAP smoke tests
npm run test:mock              # REST mock tests (requires WireMock, see below)
```

### Task

```bash
task test               # all tests                         (alias: t)
task test-rest          # REST tests only                   (alias: ta)
task test-soap          # SOAP tests only                   (alias: tsoap)
task test-regression    # REST regression tests             (alias: tr)
task test-soap-regression  # SOAP regression tests         (alias: tsoapr)
task test-smoke         # REST smoke tests                  (alias: tsm)
task test-soap-smoke    # SOAP smoke tests                  (alias: tsoapsm)
task test-mock          # REST mock tests (WireMock)         (alias: tm)
```

## WireMock (mock tests)

`test/rest/mock/` verifies mutating endpoints (POST/PUT/DELETE) against static stub responses instead of a
real backend, so no data is ever created. Requires Docker to be running:

```bash
task test-mock      # starts WireMock, runs the mock tests, stops WireMock — one command
npm run test:mock   # same, via npm
```

`task wiremock-up`/`task wiremock-down` are also available standalone (e.g. to keep the container running
while inspecting stubs via its admin API at `http://localhost:8080/__admin/mappings`). Stub mappings live
in `wiremock/mappings/*.json`. See `docs/test-patterns.md` for the pattern.

## Allure Report

```bash
npm run test:report       # run tests and save results
npm run allure:generate   # build HTML report
npm run allure:open       # open report in browser
```

## Code Quality

### npm

```bash
npm run lint          # run ESLint
npm run lint:fix      # run ESLint with auto-fix
npm run format        # format code with Prettier
npm run format:check  # check formatting (CI)
```

### Task

```bash
task lint         # run ESLint                  (alias: l)
task lint-fix     # run ESLint with auto-fix    (alias: lf)
task format       # format code with Prettier   (alias: fmt)
task format-check # check formatting (CI)       (alias: fc)
```

## Project Structure

```
config/           # constants and static configuration
docs/             # project documentation
helpers/          # thin wiring around @jirivondra/chronos-test-toolkit-api-ts
schemas/          # schema definitions for response validation
testData/         # centralized test input data, one file per protocol
types/            # TypeScript interfaces
wiremock/
  mappings/       # static WireMock stub mapping files
test/
  rest/
    regression/   # REST regression tests (detailed assertions per endpoint)
    smoke/        # REST smoke tests (full happy-path flows)
    mock/         # WireMock-backed tests for mutating endpoints
  soap/
    regression/   # SOAP regression tests (detailed assertions per operation)
    smoke/        # SOAP smoke tests (basic functional verification)
```

## Git Workflow

Branches must be named `<type>/<description>` (Conventional Commits types: `feat`, `fix`, `refactor`,
`chore`, `docs`, `test`, `ci`, `build`, `perf`, `style`) — e.g. `feat/due-date-coverage`. Full
convention: [chronos-testing-principles/docs/git-workflow.md](https://github.com/jirivondra/chronos-testing-principles/blob/main/docs/git-workflow.md).

Enforced locally via a `prepare-commit-msg` hook (rejects invalid branch names, auto-prefixes commit
messages with the branch's type). Install once per clone:

```bash
git config core.hooksPath .githooks
```

## Constants

### HTTP_STATUS (`config/httpStatus.ts`)

All expected HTTP status codes are defined as named constants, re-exported from `@jirivondra/chronos-test-toolkit-api-ts`. Use these instead of hardcoded numbers in tests.

| Constant                            | Value |
| ----------------------------------- | ----- |
| `HTTP_STATUS.OK`                    | 200   |
| `HTTP_STATUS.CREATED`               | 201   |
| `HTTP_STATUS.NO_CONTENT`            | 204   |
| `HTTP_STATUS.UNAUTHORIZED`          | 401   |
| `HTTP_STATUS.NOT_FOUND`             | 404   |
| `HTTP_STATUS.UNPROCESSABLE_ENTITY`  | 422   |
| `HTTP_STATUS.INTERNAL_SERVER_ERROR` | 500   |
