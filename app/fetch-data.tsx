import { keysToCamelCase } from "./utils/camel-case";

export async function fetchFromGateway<T>(url: string): Promise<T> {
    const res = await fetch(url, {
        method: 'GET',
    });

    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }
    const data = await res.json();
    return keysToCamelCase(data) as T
}