"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image"; 
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SmallCarousel({items, cardWidth}: {items: (Movie | Show)[], cardWidth: number}) {
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
        <div className="relative">
        {/* Left arrow */}
            <button
                aria-label="Desplazar izquierda"
                onClick={() =>
                scrollByPage("left")}
                disabled={!canScrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity duration-200 ${
                canScrollLeft ? "opacity-100" : "opacity-30 pointer-events-none"
                } bg-white/90 backdrop-blur`}
                >
                <ChevronLeft size={20} />
            </button>
            {/* Right arrow */}
            <button
                aria-label="Desplazar derecha"
                onClick={() =>
                scrollByPage("right")}
                disabled={!canScrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-opacity duration-200 ${
                canScrollRight ? "opacity-100" : "opacity-30 pointer-events-none"
                } bg-white/90 backdrop-blur`}
                >
                <ChevronRight size={20} />
            </button>
            {/* Scroller */}
            <div
            ref={scrollerRef}
            className="overflow-x-auto scroll-smooth scrollbar-hide -mx-4 px-4"
            style={{ WebkitOverflowScrolling: "touch" }}
            tabIndex={0}
            >
                <div
                    className="flex items-stretch gap-4"
                    >
                    {items.map((it) => (
                    <article
                    key={it.id}
                    className="flex-shrink-0 rounded-2xl shadow-md bg-white overflow-hidden border"
                    style={{ width: `${cardWidth}px` }}
                    >
                    {it.posterUrl ? (
                    <div className="h-40 w-full bg-gray-100 object-cover">
                        <Image width={400} height={200} src={it.posterUrl} alt={it.title} className="h-40 w-full object-cover" />
                    </div>
                    ) : null}
                    <div className="p-4">
                        <h3 className="text-lg font-semibold truncate">{it.title}</h3>
                        {it.synopsis ? (
                        <p className="text-sm text-muted-foreground truncate">{it.synopsis}</p>
                        ) : null}
                        {/* ejemplo de acción */}
                        <div className="mt-3">
                            <button className="px-3 py-1 rounded-full text-sm border">Ver</button>
                        </div>
                    </div>
                    </article>
                    ))}
                </div>
            </div>
        {/* Small helper: show dots when not overflowing */}
        </div>
    );
}