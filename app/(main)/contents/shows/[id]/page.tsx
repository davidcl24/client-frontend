import { API_GATEWAY_URL, STREAMING_URL } from "@/app/(main)/constants/consts";
import { deleteToGateway, fetchFromGateway, postToGateway } from "@/app/(main)/api-operations";
import { Episode, FavouriteElement, HistoryElement, ShowExtended } from "@/app/(main)/models/types";
import styles from '../../../content-page.module.css';
import Link from "next/link";
import { ContentFormDropdown } from "@/app/(main)/dropdown";
import { revalidatePath } from "next/cache";
import { EpisodesList } from "@/app/(main)/episodes-list";
import HLSVideo from "@/app/(main)/hls-video-parent";
import { updateHistory } from "../../history-manager";

export default async function ShowPage({params, searchParams}: {params: {id: string}, searchParams: {watch: string, selectedSeason: string, episodeId: string}}) {
    const {id} = await params;
    const {watch, selectedSeason, episodeId} = await searchParams;

    const show: ShowExtended = await fetchFromGateway<ShowExtended>(`${API_GATEWAY_URL}/shows/${id}/extended`);
    let episodes: Episode[];
    if (selectedSeason) {
        episodes = await fetchFromGateway<Episode[]>(`${API_GATEWAY_URL}/shows/${id}/${selectedSeason}/episodes`)
    } else {
        episodes = await fetchFromGateway<Episode[]>(`${API_GATEWAY_URL}/shows/${id}/1/episodes`)
    }
    let fav: FavouriteElement | null;
    try {
        fav = await fetchFromGateway<FavouriteElement>(`${API_GATEWAY_URL}/favourites/user/personal/show/${show.id}`)
    } catch {
        fav = null;
    }
    const options: number[] = Array.from({ length: show.seasonsNum ?? 0 }, (_, index) => index +1);

    let historyElement: HistoryElement | null = null;

    if (watch === 'true' && episodeId) {
        historyElement = await updateHistory('episode', parseInt(episodeId)); 
    }

    return (
        <div style={ show.posterUrl ? {backgroundImage: `url('${show.posterUrl}')`} : {backgroundImage: "url('https://es.web.img2.acsta.net/pictures/210/179/21017938_20130705161110109.jpg')"}} className={`${styles.container}`}>
            <div className={styles.mediaContent}>
                <h1 className={styles.mediaTitle}>{show.title}</h1>
                {show.seasonsNum! > 1 && <ContentFormDropdown options={options}/>}
                <p className={styles.mediaDescription}>
                    {show.synopsis}
                </p>
                <div className="flex items-center gap-4 mb-6">
                <Link href={`/contents/shows/${id}/`} className={styles.playButton}>▶ Reproducir</Link>
                    <form action={ fav === null ? async () => {
                                'use server';
                                const favElement: FavouriteElement = {
                                    id: 0, 
                                    movieId: null,
                                    showId: show.id
                                };
                                await postToGateway(`${API_GATEWAY_URL}/favourites/new`, favElement);
                                revalidatePath("/contents/shows")
                            } : async () => {
                                'use server';
                                await deleteToGateway(`${API_GATEWAY_URL}/favourites/${fav.id}`)
                                revalidatePath("/contents/shows")
                            }}>
                        <button className={styles.starButton} >{fav === null ? "☆" : "★"}</button>
                    </form>
                </div>
                <p className="text-gray-300">{`IMDB ${show.rating ?? 0}`}</p>
                <Link className={`font-semibold underline`} href={`/genres/${show.genre?.id}/`}>{show.genre?.name}</Link>
                <EpisodesList episodes={episodes}/>
            </div>

            {watch === 'true' && (
                <div className="fixed inset-0 z-5000 bg-black/97 flex items-center justify-center p-4 ">
                     <HLSVideo
                        manifest={`${STREAMING_URL}/vod/shows/${show.id}/${selectedSeason}/${episodes.find((episode) => episode.id === parseInt(episodeId))?.fileKey}/master.m3u8#t=${historyElement?.progress ?? 0}`} 
                        thumbnailMobile=""
                        thumbnailDesktop=""
                    />
                </div>
            )}
        </div>
    );
    
}