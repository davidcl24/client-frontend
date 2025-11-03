"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image"; 
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./carousels.module.css";
import Link from "next/link";
import { Movie, Show } from "./models/types";


export function SmallCarousel({items, cardWidth, title}: {items: (Movie | Show)[], cardWidth: number, title?: string}) {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    useEffect(() => {
        const currentElement = scrollerRef.current;
        if (!currentElement) return;

        function update() {
            setCanScrollLeft(currentElement!.scrollLeft > 0);
            setCanScrollRight(currentElement!.scrollLeft + currentElement!.clientWidth + 1 < currentElement!.scrollWidth);
        }
        
        update();
        currentElement.addEventListener("scroll", update, {passive: true});
        window.addEventListener("resize", update);
        return () => {
            currentElement.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [items]);

    function scrollByPage(dir = "right") {
        const currentElement = scrollerRef.current;
        if (!currentElement) return;

        const amount = Math.floor(currentElement.clientWidth * 0.8);
        const delta = dir === "right" ? amount : -amount;
        currentElement.scrollBy({left: delta, behavior: "smooth"});
    };
    return(
        <div className={styles.carouselWrapper}>
            {title && <h2 className={"text-2xl font-bold text-black mb-2"}>{title}</h2>}
            <button
                aria-label="Desplazar izquierda"
                onClick={() => scrollByPage("left")}
                disabled={!canScrollLeft}
                className={`${styles.arrow} ${styles.left} ${
                canScrollLeft ? styles.active : styles.disabled
                }`}>
                <ChevronLeft size={20} />
            </button>

            <button
                aria-label="Desplazar derecha"
                onClick={() => scrollByPage("right")}
                disabled={!canScrollRight}
                className={`${styles.arrow} ${styles.right} ${
                canScrollRight ? styles.active : styles.disabled
                }`}>
                <ChevronRight size={20} />
            </button>

            <div ref={scrollerRef} className={styles.scroller}>
                <div className={styles.scrollerContent}>
                {items.map((it) => (
                    <article
                    key={it.id}
                    className={styles.card}
                    style={{ width: `${cardWidth}px` }}
                    >
                    {it.posterUrl && (
                        <div className={styles.imageWrapper}>
                        <Image
                            src={it.posterUrl}
                            alt={it.title}
                            fill
                            className={styles.image}
                        />
                        </div>
                    )}
                    <div className={styles.cardBody}>
                        <h3>{it.title}</h3>
                        {it.synopsis && <p>{it.synopsis}</p>}
                        <Link href={ 'seasonsNum' in it ? `/contents/shows/${it.id}/` : `/contents/movies/${it.id}/` } className={styles.button}>  Ver </Link>
                    </div>
                    </article>
                ))}
                </div>
            </div>
    </div>
    );
}