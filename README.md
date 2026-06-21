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
```

## Running Tests

### npm

```bash
npm test                  # all tests
npm run test:api          # API tests only
npm run test:soap         # SOAP tests only
npm run test:regression   # regression tests
npm run test:smoke        # smoke tests
```

### Task

```bash
task test                 # all tests
task test-api             # API tests only
task test-soap            # SOAP tests only
task test-regression      # regression tests
task test-smoke           # smoke tests
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
task lint             # run ESLint
task lint-fix         # run ESLint with auto-fix
task format           # format code with Prettier
task format-check     # check formatting (CI)
```

## Project Structure

```
config/           # constants and static configuration
docs/             # project documentation
helpers/          # shared helpers (HTTP client, ApiResponse)
schemas/          # schema definitions for response validation
types/            # TypeScript interfaces
test/
  api/
    regression/   # regression tests (detailed assertions)
    smoke/        # smoke tests (full flow)
  soap/           # SOAP tests
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
