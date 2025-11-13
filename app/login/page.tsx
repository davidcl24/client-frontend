'use client';
import { ContentFormEmail, ContentFormPassword } from "../login-form";
import styles from '../form.module.css';
import { useState } from "react";
import { login } from "../login-operation";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const ok = await login(formData);
 
    if (ok) {
      window.location.href = '/'; 
    } else {
      console.error("Error en login");
    }

    setLoading(false);
  };

  return(
    <div>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <ContentFormEmail question="E-mail" value={""}/>
        <ContentFormPassword question="Password" value={""}/>
        <input 
          className={styles.button} 
          type="submit" 
          value={loading ? 'Loading...' : 'Log In'} 
          disabled={loading} 
        />
        <br /> <br />
        <div className="text-black">
             You don&apos;t have an account yet? &nbsp;
            <Link className="text-blue-600 dark:text-blue-500 hover:underline" href='/register'>Create one</Link>
        </div>
      </form>
    </div>
  );
}
