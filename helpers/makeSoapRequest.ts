import { soapClientPromise } from './soapClient';
import { SoapResponse } from './SoapResponse';
import { HTTP_STATUS } from '../config/httpStatus';

interface SoapFaultError {
    root: { Envelope: { Body: { Fault: { faultstring: string } } } };
}

export async function callOperation(
    operation: string,
    params: { a: number | string; b: number | string },
): Promise<SoapResponse> {
    const client = await soapClientPromise;
    let status: number = HTTP_STATUS.OK;
    client.once('response', (_body: unknown, response: { status: number }) => {
        status = response.status;
    });

    return client[`${operation}Async`](params)
        .then(
            ([result]: [Record<string, number>]) =>
                new SoapResponse({ status, result: result[`${operation}Result`]!, fault: null }),
        )
        .catch(
            (err: SoapFaultError) =>
                new SoapResponse({ status, result: null, fault: err.root.Envelope.Body.Fault.faultstring }),
        );
}
