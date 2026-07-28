import * as dotenv from 'dotenv';
import { createHttpClients, HttpClients } from '@jirivondra/chronos-test-toolkit-api-ts';

dotenv.config();

export const clients: HttpClients = createHttpClients({
    baseURL: process.env.BASE_URL!,
    auth: {
        username: process.env.API_USERNAME!,
        password: process.env.API_PASSWORD!,
    },
});
