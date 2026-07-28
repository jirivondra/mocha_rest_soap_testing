import { createRequestHelpers } from '@jirivondra/chronos-test-toolkit-api-ts';
import { mockClients } from './mockApiClient';

export const { get, post, put, del } = createRequestHelpers(mockClients);
