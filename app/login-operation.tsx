'use server';
import { log } from "console";
import { API_GATEWAY_URL } from "./(main)/constants/consts";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
    const body = Object.fromEntries(formData.entries());

    const res = await fetch(`${API_GATEWAY_URL}/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(body)
    });

    const myCookies = res.headers.getSetCookie();

    for (const cookie of myCookies) {
        const cookieStore = await cookies();
        const [name, value] = cookie.split('=');
        cookieStore.set({
            name: name,
            value: value,
            httpOnly: true,
            path: '/'
        });
    }

    //log(res.headers.getSetCookie())
    return res.ok;
}

export async function register(formData: FormData) {
    const entries = Object.fromEntries(formData.entries());

    const body = {
        ...entries,
        role: 'user',
        signup_date: new Date(),
    }

    const res = await fetch(`${API_GATEWAY_URL}/users`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(body)
    });
    
    const myCookies = res.headers.getSetCookie();

    for (const cookie of myCookies) {
        const cookieStore = await cookies();
        const [name, value] = cookie.split('=');
        cookieStore.set({
            name: name,
            value: value,
            httpOnly: true,
            path: '/'
        });
    }
    return res.ok;
}