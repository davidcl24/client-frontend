import { ContentFormEmail, ContentFormPassword, login } from "../login-form";
import styles from '../form.module.css';


export default async function LoginPage() {
    return(
        <div>
            <form action={login} className={styles.formWrapper}>
                <ContentFormEmail question="E-mail" value=""/>
                <ContentFormPassword question="Password" value=""/>
                <input className={styles.button} type="submit" value={'Iniciar Sesión'}/>
            </form>
        </div>
    );
}