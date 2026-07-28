import { createRequestHelpers } from '@jirivondra/chronos-test-toolkit-api-ts';
import { clients } from './apiClient';

export const { get, post, put, del } = createRequestHelpers(clients);
