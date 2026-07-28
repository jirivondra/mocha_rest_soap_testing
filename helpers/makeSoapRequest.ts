import { createSoapRequestHelper } from '@jirivondra/chronos-test-toolkit-api-ts';
import { soapClientPromise } from './soapClient';

export const { callOperation } = createSoapRequestHelper(soapClientPromise);
