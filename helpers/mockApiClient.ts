import * as dotenv from 'dotenv';
import { createHttpClients, HttpClients } from '@jirivondra/chronos-test-toolkit-api-ts';

dotenv.config();

export const mockClients: HttpClients = createHttpClients({
    baseURL: process.env.WIREMOCK_URL!,
    auth: {
        username: process.env.API_USERNAME!,
        password: process.env.API_PASSWORD!,
    },
});
