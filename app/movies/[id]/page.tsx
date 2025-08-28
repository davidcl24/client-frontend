import { API_GATEWAY_URL } from "@/app/constants/consts";
import { fetchFromGateway } from "@/app/fetch-data";
import { Genre, Movie } from "@/app/models/types";
import styles from '../../content-page.module.css';

export default async function MoviesPage({params}: {params: {id: string}}) {
    const {id} = await params;

    const movie: Movie = await fetchFromGateway<Movie>(`${API_GATEWAY_URL}/movies/${id}`);
    const genre: Genre = await fetchFromGateway<Genre>(`${API_GATEWAY_URL}/genres/${movie.genreId}`)

    return (
        <div className={`${styles.container} bg-[https://es.web.img2.acsta.net/pictures/210/179/21017938_20130705161110109.jpg]`}>
            <div className={styles.mediaContent}></div>
            <h1 className={styles.mediaTitle}>{movie.title}</h1>
        </div>
    );
}