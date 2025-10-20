'use client';
import { ContentFormEmail, ContentFormPassword } from "../login-form";
import styles from '../form.module.css';
import { useState } from "react";
import { login } from "../login-operation";

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
          value={loading ? 'Cargando...' : 'Iniciar Sesión'} 
          disabled={loading} 
        />
      </form>
    </div>
  );
}
