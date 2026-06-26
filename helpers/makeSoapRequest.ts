import { soapClient } from './soapClient';
import { SoapResponse } from './SoapResponse';

const SOAP_NAMESPACE = 'chronos.calculator';

function buildEnvelope(operation: string, params: { a: number | string; b: number | string }): string {
    return `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="${SOAP_NAMESPACE}">
  <soap:Body>
    <tns:${operation}>
      <tns:a>${params.a}</tns:a>
      <tns:b>${params.b}</tns:b>
    </tns:${operation}>
  </soap:Body>
</soap:Envelope>`;
}

export async function callOperation(operation: string, params: { a: number | string; b: number | string }): Promise<SoapResponse> {
    const response = await soapClient.post('/', buildEnvelope(operation, params), {
        headers: { SOAPAction: operation },
    });
    return new SoapResponse({ status: response.status, body: response.data });
}
