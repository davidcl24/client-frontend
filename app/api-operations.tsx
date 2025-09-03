import { keysToCamelCase, keysToSnakeCase } from "./utils/camel-case";

export async function fetchFromGateway<T>(url: string): Promise<T> {
    'use server';
    const res = await fetch(url, {
        method: 'GET',
    });

    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }
    const data = await res.json();
    return keysToCamelCase(data) as T
}

export async function postToGateway<T>(url: string, obj: T): Promise<T> {
    'use server';
    obj = keysToSnakeCase(obj);

    const res = await fetch(url, {
        method: 'POST',
        headers: { 
                "Content-Type": "application/json"
            },
        body: JSON.stringify(obj) 
    });
    
    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }
    const data = await res.json();
    return keysToCamelCase(data) as T;
}

export async function patchToGateway<T>(url: string, obj: T): Promise<T> {
    'use server';
    obj = keysToSnakeCase(obj);

    const res = await fetch(url, {
        method: 'PATCH',
        headers: { 
                "Content-Type": "application/json"
            },
        body: JSON.stringify(obj) 
    });
    
    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }
    const data = await res.json();
    return keysToCamelCase(data) as T;
}