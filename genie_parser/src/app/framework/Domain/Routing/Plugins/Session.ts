import { Request, Response } from "express";
import { getStorage } from "./SessionStorage";

export function request(): Request {
    return getStorage<Request>('request') as Request;
}
export function response(): Response {
    return getStorage<Response>('response') as Response;
}
export function getAccessOrigin(): string {
    return getStorage<string>('access-origin');
}
export function getOriginalUrl(): string {
    return getStorage<string>('originalUrl');
}