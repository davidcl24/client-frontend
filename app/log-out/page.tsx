'use client';
import styles from '../form.module.css';
import { useState } from "react";
import { logout } from "../login-operation";
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        const ok = await logout();
     
        if (ok) {
          window.location.href = '/'; 
        } else {
          console.error("Error en logout");
        }
    
        setLoading(false);
      };

    const handleCancel = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const referrer = document.referrer; 
        const sameOrigin = referrer && referrer.startsWith(window.location.origin);

        if (sameOrigin) {
            router.back();
        } else {
            router.push('/'); 
        }
    }

    return(
    <div> 
      <form className={`${styles.formWrapper} flex flex-col items-center`} onSubmit={handleSubmit}>
        <b className='text-black text-xl'>Are you sure you want to log out?</b> <br />
        <input 
          className={`${styles.button} w-48`} 
          type="submit" 
          value={loading ? 'Loading...' : 'Log Out'} 
          disabled={loading} 
        />
        <br /> <br />
        <div>
            <button className={`${styles.button} w-48`} onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}