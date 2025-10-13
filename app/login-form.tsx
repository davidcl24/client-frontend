import { revalidatePath } from 'next/cache';
import styles from './form.module.css';
import { API_GATEWAY_URL } from './(main)/constants/consts';

export async function login(formData: FormData) {
    'use server';
    try {
        const body = Object.fromEntries(formData.entries());

        const res = await fetch (`${API_GATEWAY_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error(err);
    }
    revalidatePath('/');
}


export function ContentFormEmail({question, value}: {question: string, value: string}) {
    return (
        <label className={styles.label}>
            <input defaultValue={value} className={styles.input} placeholder={question} type="email" name="email" />
        </label>
    );
}

export function ContentFormPassword({question, value}: {question: string, value: string}) {
    return (
        <label className={styles.label}>
            <input defaultValue={value} className={styles.input} placeholder={question} type='password' name='password'/>
        </label>
    )
}