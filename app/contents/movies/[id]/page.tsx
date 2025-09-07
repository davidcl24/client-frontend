import { API_GATEWAY_URL } from "@/app/constants/consts";
import { FavouriteElement, Genre, HistoryElement, Movie } from "@/app/models/types";
import styles from '../../../content-page.module.css';
import Link from "next/link";
import HLSVideo from "@/app/hls-video-parent";
import { deleteToGateway, fetchFromGateway, postToGateway } from "@/app/api-operations";
import { updateHistory } from "../../history-manager";
import { revalidatePath } from "next/cache";

export default async function MoviesPage({params, searchParams}: {params: {id: string}, searchParams: {watch: string}}) {
    const {id} = await params;
    const {watch} = await searchParams;

    const movie: Movie = await fetchFromGateway<Movie>(`${API_GATEWAY_URL}/movies/${id}`);
    const genre: Genre = await fetchFromGateway<Genre>(`${API_GATEWAY_URL}/genres/${movie.genreId}`)
    let fav: FavouriteElement | null;
    try {
        fav = await fetchFromGateway<FavouriteElement>(`${API_GATEWAY_URL}/favourites/user/1/movie/${movie.id}`) //numero usuario hardcodeao, cambiar por cogerlo del payload del jwt
    } catch {
        fav = null;
    }
    let historyElement: HistoryElement | null = null;

    if (watch === 'true') {
        historyElement = await updateHistory('movie', 1, movie.id)
    }

    return (
        <div style={{backgroundImage: "url('https://es.web.img2.acsta.net/pictures/210/179/21017938_20130705161110109.jpg')"}} className={`${styles.container}`}>
            <div className={styles.mediaContent}>
                <h1 className={styles.mediaTitle}>{movie.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                    <Link href={`/contents/movies/${id}/?watch=true`} className={styles.playButton}>▶ Reproducir</Link>
                    <form action={ fav === null ? async () => {
                                'use server';
                                const favElement: FavouriteElement = {
                                    id: 0,
                                    userId: 1, //hardcodeado, cambiar a coger del payload de jwt
                                    movieId: movie.id,
                                    showId: null
                                };
                                await postToGateway(`${API_GATEWAY_URL}/favourites`, favElement);
                                revalidatePath("/contents/movies")
                            } : async () => {
                                'use server';
                                await deleteToGateway(`${API_GATEWAY_URL}/favourites/${fav.id}`)
                                revalidatePath("/contents/movies")
                            }}>
                        <button className={styles.starButton} >{fav === null ? "☆" : "★"}</button>
                    </form>
                </div>
                <p className={styles.mediaDescription}>
                    {movie.synopsis}
                </p>
                <Link className={`font-semibold underline`} href={`/genres/${genre.id}/`}>{genre.name}</Link>
            </div>

            {watch === 'true' && (
                <div className="fixed inset-0 z-5000 bg-black/97 flex items-center justify-center p-4 ">
                     <HLSVideo
                        manifest={`http://172.26.234.91:8080/vod/planet/master.m3u8#t=${historyElement?.progress ?? 0}`}
                        thumbnailMobile=""
                        thumbnailDesktop=""
                    />
                </div>
            )}
        </div>
    );
}