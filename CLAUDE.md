# Mocha API & SOAP Testing

## Principles

### DRY (Don't Repeat Yourself)
All code must follow the DRY principle — no duplicated logic or code. Repeated parts belong in helpers.

### YAGNI (You Aren't Gonna Need It)
Only add code that is currently needed. Add new helpers, functions, or abstractions only when they are actually used.

### No if conditions in helpers
Instead of `if/else` blocks, use a functional approach — `filter`, `forEach`, private methods. Conditions reduce readability and testability.

### Static values belong in variables
All static texts and values in tests must be stored in named variables — no hardcoded strings directly in code. URLs belong in a `url` object, test data in a `testData` object.
