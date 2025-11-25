import Link from "next/link";
import { Genre } from "./models/types";
import styles from "./genre-card.module.css"

/**
 * @summary - HTML component that displays a genre and redirects to it when you click it
 * @param genre - The genre that should be displayed
 * @returns HTML component
 */
export function GenreCard({genre}: {genre: Genre}) {
    return (
        <Link href={`/genres/${genre.id}`} className={styles.genreCard}>
            <h2 className="text-white text-lg font-semibold">{genre.name}</h2>
        </Link>
    )
}