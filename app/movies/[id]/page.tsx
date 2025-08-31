import { API_GATEWAY_URL } from "@/app/constants/consts";
import { fetchFromGateway } from "@/app/fetch-data";
import { Genre, Movie } from "@/app/models/types";
import styles from '../../content-page.module.css';
import Link from "next/link";


export default async function MoviesPage({params, searchParams}: {params: {id: string}, searchParams: {watch: string}}) {
    const {id} = await params;
    const {watch} = await searchParams;

    const movie: Movie = await fetchFromGateway<Movie>(`${API_GATEWAY_URL}/movies/${id}`);
    const genre: Genre = await fetchFromGateway<Genre>(`${API_GATEWAY_URL}/genres/${movie.genreId}`)

    return (
        <div style={{backgroundImage: "url('https://es.web.img2.acsta.net/pictures/210/179/21017938_20130705161110109.jpg')"}} className={`${styles.container}`}>
            <div className={styles.mediaContent}>
                <h1 className={styles.mediaTitle}>{movie.title}</h1>
                <Link href={`/movies/${id}/?watch=true`} className={styles.playButton}>▶ Reproducir</Link>
                <p className={styles.mediaDescription}>
                    {movie.synopsis}
                </p>
                <Link className={`font-semibold underline`} href={`/genres/${genre.id}/`}>{genre.name}</Link>
            </div>
        </div>
    );
}