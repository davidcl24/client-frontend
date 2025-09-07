import { API_GATEWAY_URL } from "@/app/constants/consts";
import { deleteToGateway, fetchFromGateway, postToGateway } from "@/app/api-operations";
import { Episode, FavouriteElement, Genre, Show } from "@/app/models/types";
import styles from '../../../content-page.module.css';
import Link from "next/link";
import { ContentFormDropdown } from "@/app/dropdown";
import { revalidatePath } from "next/cache";

export default async function ShowsPage({params, searchParams}: {params: {id: string}, searchParams: {watch: string, selectedSeason: string}}) {
    const {id} = await params;
    const {watch, selectedSeason} = await searchParams;

    const show: Show = await fetchFromGateway<Show>(`${API_GATEWAY_URL}/shows/${id}`);
    const genre: Genre = await fetchFromGateway<Genre>(`${API_GATEWAY_URL}/genres/${show.genreId}`)
    let episodes: Episode[];
    if (selectedSeason) {
        episodes = await fetchFromGateway<Episode[]>(`${API_GATEWAY_URL}/shows/${id}/${selectedSeason}/episodes`)
    } else {
        episodes = await fetchFromGateway<Episode[]>(`${API_GATEWAY_URL}/shows/${id}/1/episodes`)
    }
    let fav: FavouriteElement | null;
    try {
        fav = await fetchFromGateway<FavouriteElement>(`${API_GATEWAY_URL}/favourites/user/1/show/${show.id}`) //numero usuario hardcodeao, cambiar por cogerlo del payload del jwt
    } catch {
        fav = null;
    }
    const options: number[] = Array.from({ length: show.seasonsNum ?? 0 }, (_, index) => index +1);

    return (
        <div style={ show.posterUrl ? {backgroundImage: `url('${show.posterUrl}')`} : {backgroundImage: "url('https://es.web.img2.acsta.net/pictures/210/179/21017938_20130705161110109.jpg')"}} className={`${styles.container}`}>
            <div className={styles.mediaContent}>
                <h1 className={styles.mediaTitle}>{show.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                <Link href={`/contents/shows/${id}/`} className={styles.playButton}>▶ Reproducir</Link>
                    <form action={ fav === null ? async () => {
                                    'use server';
                                    const favElement: FavouriteElement = {
                                        id: 0,
                                        userId: 1, //hardcodeado, cambiar a coger del payload de jwt
                                        movieId: null,
                                        showId: show.id
                                    };
                                    await postToGateway(`${API_GATEWAY_URL}/favourites`, favElement);
                                    revalidatePath("/contents/shows")
                                } : async () => {
                                    'use server';
                                    await deleteToGateway(`${API_GATEWAY_URL}/favourites/${fav.id}`)
                                    revalidatePath("/contents/shows")
                                }}>
                            <button className={styles.starButton} >{fav === null ? "☆" : "★"}</button>
                    </form>
                </div>
                <ContentFormDropdown options={options}/>
                <p className={styles.mediaDescription}>
                    {show.synopsis}
                </p>
                <Link className={`font-semibold underline`} href={`/genres/${genre.id}/`}>{genre.name}</Link>
            </div>
        </div>
    );
    
}