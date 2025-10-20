import { keysToCamelCase, keysToSnakeCase } from "./utils/camel-case";

export async function fetchFromGateway<T>(url: string): Promise<T> {
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
    }
    const data = await res.json();
    return keysToCamelCase(data) as T
}

export async function postToGateway<T>(url: string, obj: T): Promise<T> {
    obj = keysToSnakeCase(obj);

    const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
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
    obj = keysToSnakeCase(obj);

    const res = await fetch(url, {
        method: 'PATCH',
        credentials: 'include',
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

export async function deleteToGateway(url: string) {
     try {
        await fetch (url, {
            method: 'DELETE',
            credentials: 'include',
        });
    } catch (err) {
        console.error(err);
    }
}