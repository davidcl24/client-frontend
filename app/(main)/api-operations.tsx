import { cookies } from "next/headers";
import { keysToCamelCase, keysToSnakeCase } from "./utils/camel-case";
import { redirect } from "next/navigation";

/**
 * @summary It takes the cookies from the request and returns a formated cookie header
 * @returns cookie header
 */
async function getCookieHeader() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const relevantCookies = allCookies.filter(cookie => 
        ['access_token', 'refresh_token'].includes(cookie.name)
    );

    const cookieHeader = relevantCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    return cookieHeader;
}

/**
 * @summary It fetches items from the backend
 * @param url - The URL to fetch from
 * @returns JSON body of the reply
 */
export async function fetchFromGateway<T>(url: string): Promise<T> {
    'use server';
    const cookieHeader = await getCookieHeader();
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Cookie: cookieHeader || '',
        },
        credentials: 'include',
    });

    if (!res.ok) {
        if (res.status == 401) {
            redirect('/login');
        }
        throw new Error(`Error HTTP: ${res.status}`);
    }
    const data = await res.json();
    return keysToCamelCase(data) as T
}

/**
 * @summary It makes a POST request to the backend to the desired URL and with the desired object as body
 * @param url - The URL to wich the request has to be made
 * @param obj - The object that will be sent in the request body as JSON
 * @returns 
 */
export async function postToGateway<T>(url: string, obj: T): Promise<T> {
    'use server';
    const cookieHeader = await getCookieHeader();
    obj = keysToSnakeCase(obj);

    const res = await fetch(url, {
        method: 'POST',
        headers: { 
                "Content-Type": "application/json",
                Cookie: cookieHeader || '',
        },
        credentials: 'include',
        body: JSON.stringify(obj) 
    });
    
    if (!res.ok) {
        if (res.status == 401) {
            redirect('/login');
        }
        throw new Error(`Error HTTP: ${res.status}`);
    }
    const data = await res.json();
    return keysToCamelCase(data) as T;
}

/**
 * @summary It makes a PATCH request to the backend to the desired URL and with the desired object as body
 * @param url - The URL to wich the request has to be made
 * @param obj - The object that will be sent in the request body as JSON
 * @returns 
 */
export async function patchToGateway<T>(url: string, obj: T): Promise<T> {
    'use server';
    const cookieHeader = await getCookieHeader();
    obj = keysToSnakeCase(obj);

    const res = await fetch(url, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 
                "Content-Type": "application/json",
                Cookie: cookieHeader || '',
        },
        body: JSON.stringify(obj) 
    });
    
    if (!res.ok) {
        if (res.status == 401) {
            redirect('/login');
        }
        throw new Error(`Error HTTP: ${res.status}`);
    }
    const data = await res.json();
    return keysToCamelCase(data) as T;
}

/**
 * @summary It makes a DELETE request to the backend to the desired URL
 * @param url - The URL to wich the request has to be made
 * @returns 
 */
export async function deleteToGateway(url: string) {
    'use server';
    const cookieHeader = await getCookieHeader();
     try {
        const res = await fetch (url, {
            method: 'DELETE',
            headers: {
                Cookie: cookieHeader || '',
            },
            credentials: 'include',
        });

        if (!res.ok) {
            if (res.status == 401) {
                redirect('/login');
            }
            throw new Error(`Error HTTP: ${res.status}`);
        }
    } catch (err) {
        console.error(err);
    }
}