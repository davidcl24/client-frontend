import { Genre } from "./models/types";
import styles from "./genre-card.module.css"
import { GenreCard } from "./genre-card";

/**
 * @summary A grid to properly display all of the GenreCard
 * @param genres - A list of the genres that should be displayed
 * @returns HTML component
 */
export function GenreCardGrid({genres}: {genres: Genre[]}) {
    return (
        <div className={styles.genresContainer}>
            <h2 className={styles.genresTitle}>Genres</h2>
            <div className={styles.genresGrid}>
                {genres.map((genre) =>(
                    <GenreCard key={genre.id} genre={genre}/>
                ))}
            </div>
        </div>
    )
}