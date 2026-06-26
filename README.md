# Mocha API & SOAP Testing

Automated tests for REST API and SOAP services using the Mocha framework.

## Libraries

| Library                                      | Version | Purpose                       |
| -------------------------------------------- | ------- | ----------------------------- |
| [mocha](https://mochajs.org)                 | ^11     | Test framework                |
| [chai](https://www.chaijs.com)               | ^6      | Assertion library             |
| [axios](https://axios-http.com)              | ^1      | HTTP client for API calls     |
| [soap](https://github.com/vpulim/node-soap)  | ^1      | SOAP service client           |
| [dotenv](https://github.com/motdotla/dotenv) | ^17     | Loading variables from `.env` |
| [typescript](https://www.typescriptlang.org) | ^6      | TypeScript support            |
| [ts-node](https://typestrong.org/ts-node)    | ^10     | Running TypeScript files      |
| [allure-mocha](https://allurereport.org)     | ^3      | Allure report generation      |
| [@faker-js/faker](https://fakerjs.dev)       | ^10     | Dynamic test data generation  |

## Installation

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
```

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
helpers/          # shared helpers (HTTP client, ApiResponse, SOAP client)
schemas/          # schema definitions for response validation
testData/         # centralized test input data, one file per protocol
types/            # TypeScript interfaces
test/
  rest/
    regression/   # REST regression tests (detailed assertions per endpoint)
    smoke/        # REST smoke tests (full happy-path flows)
  soap/
    regression/   # SOAP regression tests (detailed assertions per operation)
    smoke/        # SOAP smoke tests (basic functional verification)
```

## Constants

### HTTP_STATUS (`config/httpStatus.ts`)

All expected HTTP status codes are defined as named constants. Use these instead of hardcoded numbers in tests.

| Constant                           | Value |
| ---------------------------------- | ----- |
| `HTTP_STATUS.OK`                   | 200   |
| `HTTP_STATUS.CREATED`              | 201   |
| `HTTP_STATUS.NO_CONTENT`           | 204   |
| `HTTP_STATUS.UNAUTHORIZED`         | 401   |
| `HTTP_STATUS.NOT_FOUND`            | 404   |
| `HTTP_STATUS.UNPROCESSABLE_ENTITY` | 422   |
| `HTTP_STATUS.INTERNAL_SERVER_ERROR` | 500  |
