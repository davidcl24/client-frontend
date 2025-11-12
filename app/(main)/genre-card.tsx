import Link from "next/link";
import { Genre } from "./models/types";
import styles from "./genre-card.module.css"

export function GenreCard({genre}: {genre: Genre}) {
    return (
        <Link href={`/genres/${genre.id}`} className={styles.genreCard}>
            <h2 className="text-white text-lg font-semibold">{genre.name}</h2>
        </Link>
    )
}