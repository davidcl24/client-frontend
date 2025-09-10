import Image from "next/image";
import { Episode } from "./models/types";
import styles from "./episode-list.module.css"

export default async function EpisodesList({episodes}: {episodes: Episode[]}) {
    return (
        episodes.map((episode) => (
            <div key={episode.id} className={styles.episodeCard}>
                <Image src="https://es.web.img2.acsta.net/pictures/210/179/21017938_20130705161110109.jpg" width={50} height={50} alt="Thumbnail" className={styles.episodeThumbnail}/>
                <div className={styles.episodeInfo}>
                    <div className={styles.episodeTitle}>{`T${episode.seasonNum} E${episode.episodeNum} - ${episode.title}`}</div>
                    <div className={styles.episdoeMeta}>{episode.releaseDate? episode.releaseDate.toDateString() : ""}</div>
                    <div className={styles.episodeDescription}>{episode.synopsis}</div>
                </div>
            </div>
        ))
    )
}