"use client";

import { redirect } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import styles from './content-page.module.css';
import { useEffect, useState } from "react";

export function ContentFormDropdown({options}: {options: number[]}) {
    const value = useSearchParams().get("selectedSeason")?.toString();
    const [selected, setSelected] = useState(value || "");
    useEffect(() => { setSelected(value || ""); }, [value]);
    const url = usePathname();

    return (
        <select className={styles.seasonsDropdown}
                value={selected}
                onChange={(e) => {
                    setSelected(e.target.value);
                    redirect(`${url}?selectedSeason=${e.target.value}`);
                }}>
                    {options.map((option) => (
                        <option key={option} className={styles.seasonsDropdownItem} value={option}>{`Temporada ${option}`}</option>
                    ))}
        </select>
    )
}