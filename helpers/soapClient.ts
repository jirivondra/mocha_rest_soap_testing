import * as dotenv from 'dotenv';
import { createSoapClient, SoapClient } from '@jirivondra/chronos-test-toolkit-api-ts';

dotenv.config();

export const soapClientPromise: Promise<SoapClient> = createSoapClient(`${process.env.SOAP_URL!}/?wsdl`);
