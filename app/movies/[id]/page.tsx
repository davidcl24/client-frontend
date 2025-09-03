import { API_GATEWAY_URL } from "@/app/constants/consts";
import { Genre, HistoryElement, Movie } from "@/app/models/types";
import styles from '../../content-page.module.css';
import Link from "next/link";
import HLSVideo from "@/app/hls-video-parent";
import { patchToGateway, postToGateway, fetchFromGateway } from "@/app/api-operations";


async function updateHistory(contentType: string, userId: number, contentId: number): Promise<HistoryElement>{
    try {
        const element = await fetchFromGateway<HistoryElement>(`${API_GATEWAY_URL}/history/user/${userId}/${contentType}/${contentId}`);
        element.watchDate = new Date();
        await patchToGateway(`${API_GATEWAY_URL}/history/${element.id}`, element);
        return element;
    } catch {
        const historyElement: HistoryElement = {
            id: 0,
            userId: 1,
            movieId: null,
            episodeId: null,
            watchDate: new Date(),
            progress: 0,
        }
        if (contentType === 'movie') {
            historyElement.movieId = contentId;
        } else if (contentType === 'show') {
            historyElement.episodeId = contentId;
        }
        await postToGateway(`${API_GATEWAY_URL}/history`, historyElement);
        return historyElement;
    } 
}


export default async function MoviesPage({params, searchParams}: {params: {id: string}, searchParams: {watch: string}}) {
    const {id} = await params;
    const {watch} = await searchParams;

    const movie: Movie = await fetchFromGateway<Movie>(`${API_GATEWAY_URL}/movies/${id}`);
    const genre: Genre = await fetchFromGateway<Genre>(`${API_GATEWAY_URL}/genres/${movie.genreId}`)
    let historyElement: HistoryElement | null = null;

    if (watch === 'true') {
        historyElement = await updateHistory('movie', 1, movie.id)
    }

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