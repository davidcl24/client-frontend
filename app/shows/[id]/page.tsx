import { API_GATEWAY_URL } from "@/app/constants/consts";
import { fetchFromGateway } from "@/app/fetch-data";
import { Episode, Genre, Show } from "@/app/models/types";
import styles from '../../content-page.module.css';
import Link from "next/link";

export default async function ShowsPage({params, searchParams}: {params: {id: string}, searchParams: {watch: string, selectedSeason: string}}) {
    const {id} = await params;
    const {watch, selectedSeason} = await searchParams;

    const show: Show = await fetchFromGateway<Show>(`${API_GATEWAY_URL}/shows/${id}`);
    const genre: Genre = await fetchFromGateway<Genre>(`${API_GATEWAY_URL}/genres/${show.genreId}`)
    let episodes: Episode[];
    if (selectedSeason) {
        episodes = await fetchFromGateway<Episode[]>(`${API_GATEWAY_URL}/shows/${id}/${selectedSeason}`)
    } else {
        episodes = await fetchFromGateway<Episode[]>(`${API_GATEWAY_URL}/shows/${id}/1`)
    }
    
    return (
        <div style={{backgroundImage: "url('https://es.web.img2.acsta.net/pictures/210/179/21017938_20130705161110109.jpg')"}} className={`${styles.container}`}>
            <div className={styles.mediaContent}>
                <h1 className={styles.mediaTitle}>{show.title}</h1>
                <Link href={`/movies/${id}/?watch=true`} className={styles.playButton}>▶ Reproducir</Link>
                <p className={styles.mediaDescription}>
                    {show.synopsis}
                </p>
                <Link className={`font-semibold underline`} href={`/genres/${genre.id}/`}>{genre.name}</Link>
            </div>
        </div>
    );
    
}