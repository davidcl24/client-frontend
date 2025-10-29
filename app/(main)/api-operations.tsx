import { cookies } from "next/headers";
import { keysToCamelCase, keysToSnakeCase } from "./utils/camel-case";
import { log } from "console";
import { redirect } from "next/navigation";


async function getCookieHeader() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const relevantCookies = allCookies.filter(cookie => 
        ['access_token', 'refresh_token'].includes(cookie.name)
    );

    const cookieHeader = relevantCookies.map(cookie => `${cookie.name}=${cookie.value}`).join('; ');
    log(cookieHeader);
    return cookieHeader;
}

export async function fetchFromGateway<T>(url: string): Promise<T> {
    'use server';
    const cookieHeader = await getCookieHeader();
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            Cookie: cookieHeader || '',
        }
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

export async function deleteToGateway(url: string) {
    'use server';
    const cookieHeader = await getCookieHeader();
     try {
        const res = await fetch (url, {
            method: 'DELETE',
            headers: {
                Cookie: cookieHeader || '',
            }
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