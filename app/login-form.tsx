import styles from './form.module.css';


export function ContentFormEmail({ question, value }: { question: string, value: string}) {
    return (
        <label className={styles.label}>
            <input
                defaultValue={value}
                className={styles.input}
                placeholder={question}
                type="email"
                name="email"
            />
        </label>
    );
}

export function ContentFormPassword({ question, value }: { question: string, value: string }) {
    return (
        <label className={styles.label}>
            <input
                defaultValue={value}
                className={styles.input}
                placeholder={question}
                type="password"
                name="password"
            />
        </label>
    );
}