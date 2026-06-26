import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const soapClient = axios.create({
    baseURL: process.env.SOAP_URL!,
    validateStatus: () => true,
    headers: {
        'Content-Type': 'text/xml; charset=utf-8',
    },
});
