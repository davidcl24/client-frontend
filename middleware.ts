import { NextRequest, NextResponse } from 'next/server';
import { API_GATEWAY_URL } from './app/(main)/constants/consts';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const accessToken = req.cookies.get('access_token')?.value;
    const refreshToken = req.cookies.get('refresh_token')?.value;
    if (!refreshToken) return res;

    try {
        const backendRes = await fetch(`${API_GATEWAY_URL}/token-checker`, {
            method: 'POST',
            headers: {
                 Cookie: `access_token=${accessToken || ''}; refresh_token=${refreshToken || ''}`,
            },
            credentials: 'include',
        });
        const backCookies = backendRes.headers.getSetCookie();
        if (backCookies) {
            for (const cookie of backCookies) {
                const cookieStore = await cookies();
                const [name, value] = cookie.split('=');
                cookieStore.set({
                    name: name,
                    value: value,
                    httpOnly: true,
                    path: '/',
                })
            }
        }
    } catch (err) {
        console.error('Error refreshing tokens:', err);
    }

    return res;
}