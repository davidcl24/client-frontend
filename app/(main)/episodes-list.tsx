"use client";

import Image from "next/image";
import { Episode } from "./models/types";
import styles from "./episode-list.module.css"
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * @summary An HTML component that shows a list of episodes for the ShowPage 
 * @param episodes - A list of all episodes that should be displayed 
 * @returns HTML component
 */
export function EpisodesList({episodes}: {episodes: Episode[]}) {
    // const value = useSearchParams().get("episodeId")?.toString();
    const url = usePathname();
    return (
        episodes.map((episode) => (
            <Link key={episode.id} href={`${url}?selectedSeason=${episode.seasonNum}&watch=true&episodeId=${episode.id}`}>
                <div className={styles.episodeCard}>
                    <Image src="https://es.web.img2.acsta.net/pictures/210/179/21017938_20130705161110109.jpg" width={300} height={300} alt="Thumbnail" className={styles.episodeThumbnail}/>
                    <div className={styles.episodeInfo}>
                        <div className={styles.episodeTitle}>{`S${episode.seasonNum} E${episode.episodeNum} - ${episode.title}`}</div>
                        <div className={styles.episdoeMeta}>{episode.releaseDate? episode.releaseDate.toDateString() : ""}</div>
                        <div className={styles.episodeDescription}>{episode.synopsis}</div>
                    </div>
                </div>
            </Link>
        ))
    )
}