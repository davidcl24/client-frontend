//'use server';
//import { log } from "console";
import { API_GATEWAY_URL } from "./(main)/constants/consts";

export async function login(formData: FormData) {
    const body = Object.fromEntries(formData.entries());

    const res = await fetch(`${API_GATEWAY_URL}/login`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify(body)
    });

    //log(res.headers.getSetCookie())
    return res.ok;
}