import { API_GATEWAY_URL, STREAMING_URL } from "@/app/(main)/constants/consts";
import { FavouriteElement, HistoryElement, MovieExtended } from "@/app/(main)/models/types";
import styles from '../../../content-page.module.css';
import Link from "next/link";
import HLSVideo from "@/app/(main)/hls-video-parent";
import { deleteToGateway, fetchFromGateway, postToGateway } from "@/app/(main)/api-operations";
import { updateHistory } from "../../history-manager";
import { revalidatePath } from "next/cache";


/**
 * @summary It shows the detail page of a movie. It lets the user watch it
 * @param params - The params necessary to show the selected movie and to play it
 * @returns HTML component
 */
export default async function MoviePage({params, searchParams}: {params: {id: string}, searchParams: {watch: string}}) {
    const {id} = await params;
    const {watch} = await searchParams;

    const movie: MovieExtended = await fetchFromGateway<MovieExtended>(`${API_GATEWAY_URL}/movies/${id}/extended`);
    let fav: FavouriteElement | null;
    try {
        fav = await fetchFromGateway<FavouriteElement>(`${API_GATEWAY_URL}/favourites/user/personal/movie/${movie.id}`) 
    } catch {
        fav = null;
    }
    let historyElement: HistoryElement | null = null;

    if (watch === 'true') {
        historyElement = await updateHistory('movie', movie.id)
    }

    return (
        <div style={ movie.posterUrl ? {backgroundImage: `url('${movie.posterUrl}')`} : {backgroundImage: "url('https://es.web.img2.acsta.net/pictures/210/179/21017938_20130705161110109.jpg')"}} className={`${styles.container}`}>
            <div className={styles.mediaContent}>
                <h1 className={styles.mediaTitle}>{movie.title}</h1>
                <p className={styles.mediaDescription}>
                    {movie.synopsis}
                </p>
                {movie.directors.length > 0 && <div> <span className="font-bold text-xl">Direction: &nbsp;</span> 
                    <span>
                        {movie.directors.map((director) => {
                            return <Link className="font-semibold underline" href={`/directors/${director.id}/`} key={director.id}>{director.name + '   '}</Link>
                        })}
                    </span> 
                </div>}
                {movie.actors.length > 0 && <div> <span className="font-bold text-xl">Actors: &nbsp;</span> 
                    <span>
                        {movie.actors.map((actor) => {
                            return <Link className="font-semibold underline" href={`/actors/${actor.id}/`} key={actor.id}>{actor.name + '   '}</Link>
                        })}
                    </span> 
                </div>}
                <br />
                <div className="flex items-center gap-4 mb-6">
                    <Link href={`/contents/movies/${id}/?watch=true`} className={styles.playButton}>▶ Play</Link>
                    <form action={ fav === null ? async () => {
                                'use server';
                                const favElement: FavouriteElement = {
                                    id: 0,
                                    movieId: movie.id,
                                    showId: null
                                };
                                await postToGateway(`${API_GATEWAY_URL}/favourites/new`, favElement);
                                revalidatePath("/contents/movies")
                            } : async () => {
                                'use server';
                                await deleteToGateway(`${API_GATEWAY_URL}/favourites/${fav.id}`)
                                revalidatePath("/contents/movies")
                            }}>
                        <button className={styles.starButton} >{fav === null ? "☆" : "★"}</button>
                    </form>
                </div>
                <p className="text-gray-300">{`${movie.releaseDate}`}</p>
                <p className="text-gray-300">{`IMDB ${movie.rating ?? 0}`}</p>
                <Link className={`font-semibold underline`} href={`/genres/${movie.genre?.id}/`}>{movie.genre?.name}</Link>
            </div>

            {watch === 'true' && (
                <div className="fixed inset-0 z-5000 bg-black/97 flex items-center justify-center p-4 ">
                     <HLSVideo
                        manifest={`${STREAMING_URL}/vod/movies/${movie.fileKey}/master.m3u8#t=${historyElement?.progress ?? 0}`} //TODO: video hardcodeado, cambiar por el del filekey de la pelicula
                        thumbnailMobile=""
                        thumbnailDesktop=""
                    />
                </div>
            )}
        </div>
    );
}