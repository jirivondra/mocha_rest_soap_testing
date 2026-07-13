import { AxiosResponse } from 'axios';
import { authenticatedClient, unauthenticatedClient } from './apiClient';
import { ApiResponse } from './ApiResponse';

function getClient(authenticated: boolean) {
    return authenticated ? authenticatedClient : unauthenticatedClient;
}

async function handleResponse(promise: Promise<AxiosResponse>): Promise<ApiResponse> {
    const r = await promise;
    return new ApiResponse({ status: r.status, json: r.data });
}

export async function get(apiUri: string, authenticated = true): Promise<ApiResponse> {
    return handleResponse(getClient(authenticated).get(apiUri));
}

export async function post(apiUri: string, body: unknown, authenticated = true): Promise<ApiResponse> {
    return handleResponse(getClient(authenticated).post(apiUri, body));
}

export async function put(apiUri: string, body: unknown, authenticated = true): Promise<ApiResponse> {
    return handleResponse(getClient(authenticated).put(apiUri, body));
}

export async function del(apiUri: string, authenticated = true): Promise<ApiResponse> {
    return handleResponse(getClient(authenticated).delete(apiUri));
}
