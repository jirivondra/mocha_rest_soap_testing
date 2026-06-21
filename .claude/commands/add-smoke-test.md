# Add Smoke Test

Create a smoke test file for a full end-to-end flow following the project conventions.

## Inputs to gather first

Before writing anything, identify:

- What resource / flow is being tested (e.g. full TODO CRUD)
- Which steps the flow covers (create → read → update → delete)
- Which piece of shared state is passed between steps (usually an `id`)

## File location

`test/api/smoke/<resource>-flow.spec.ts`

Example: `todo-flow.spec.ts`

## Template

```ts
import { post, get, put, del } from '../../../helpers/makeRequest'; // only methods actually used
import { faker } from '@faker-js/faker';
import type { $Type } from '../../../types/$resource';
import { HTTP_STATUS } from '../../../config/httpStatus';
import { $resourceUrls } from '../../../config/urls';

const testData = {
  create: { ... },  // data for the POST step
  update: { ... },  // data for the PUT step (if applicable)
};

describe('Smoke - $Resource flow', function () {
  let resourceId: number; // shared state passed between steps

  it('POST /$resource - 201', async function () {
    const response = await post($resourceUrls.base, testData.create);
    resourceId = (response.json as $Type).id;
    response.expectStatus(HTTP_STATUS.CREATED);
  });

  it('GET /$resource - 200', async function () {
    const response = await get($resourceUrls.base);
    response.expectStatus(HTTP_STATUS.OK);
  });

  it('GET /$resource/:id - 200', async function () {
    const response = await get($resourceUrls.byId(resourceId));
    response.expectStatus(HTTP_STATUS.OK);
  });

  it('PUT /$resource/:id - 200', async function () {
    const response = await put($resourceUrls.byId(resourceId), testData.update);
    response.expectStatus(HTTP_STATUS.OK);
  });

  it('DELETE /$resource/:id - 204', async function () {
    const response = await del($resourceUrls.byId(resourceId));
    response.expectStatus(HTTP_STATUS.NO_CONTENT);
  });
});
```

## Rules to follow

- Assert **only the status code** — detailed body validation belongs in regression tests.
- Shared state (e.g. `resourceId`) is declared with `let` in the `describe` scope and set in the first `it`.
- Steps are sequential and intentionally depend on each other — this is the nature of a flow test.
- Use `HTTP_STATUS.*` constants — never raw numbers.
- Use `$resourceUrls.*` constants — never raw strings.
- Use `faker` for all dynamic values in `testData`.
- Import only the HTTP method functions actually used in the flow.
