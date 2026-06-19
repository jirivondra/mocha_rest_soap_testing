import * as dotenv from 'dotenv';
import axios from 'axios';

const baseUrl = 'http://localhost:8000';

dotenv.config();

const baseConfig = {
  baseURL: process.env.BASE_URL ?? baseUrl,
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
