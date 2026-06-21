import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const baseConfig = {
    baseURL: process.env.BASE_URL!,
    validateStatus: () => true,
};

export const authenticatedClient = axios.create({
    ...baseConfig,
    auth: {
        username: process.env.API_USERNAME!,
        password: process.env.API_PASSWORD!,
    },
});

export const unauthenticatedClient = axios.create(baseConfig);
