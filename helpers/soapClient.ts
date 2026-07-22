import * as dotenv from 'dotenv';
import * as soap from 'soap';

dotenv.config();

export const soapClientPromise: Promise<soap.Client> = soap.createClientAsync(`${process.env.SOAP_URL!}/?wsdl`);
