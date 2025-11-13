'use client';
import { ContentFormEmail, ContentFormPassword, ContentFormUserName } from "../login-form";
import styles from '../form.module.css';
import { useState } from "react";
import { register } from "../login-operation";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const ok = await register(formData);
 
    if (ok) {
      window.location.href = '/'; 
    } else {
      console.error("Error en registro");
    }

    setLoading(false);
  };

  return(
    <div>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <ContentFormUserName question="User" value=""/>
        <ContentFormEmail question="E-mail" value={""}/>
        <ContentFormPassword question="Password" value={""}/>
        <input 
          className={styles.button} 
          type="submit" 
          value={loading ? 'Cargando...' : 'Registrar'} 
          disabled={loading} 
        />
        <br /> <br />
        <div className="text-black">
             You already have an account? &nbsp;
            <Link className="text-blue-600 dark:text-blue-500 hover:underline" href='/login'>Log In</Link>
        </div>
      </form>
    </div>
  );
}
