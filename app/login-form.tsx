import styles from './form.module.css';

/**
 * @summary HTML component to input an email 
 * @param params - Text that will be used as placeholder and default value
 * @returns HTML component
 */
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

/**
 * @summary HTML component to input an username 
 * @param params - Text that will be used as placeholder and default value
 * @returns HTML component
 */
export function ContentFormUserName({question, value }: {question: string, value:string}) {
    return (
        <label className={styles.label}>
            <input
                defaultValue={value}
                className={styles.input}
                placeholder={question}
                type='text'
                name='username'
            />
        </label>
    )
}

/**
 * @summary HTML component to input an password 
 * @param params - Text that will be used as placeholder and default value
 * @returns HTML component
 */
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