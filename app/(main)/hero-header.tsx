import Link from "next/link";
import { Movie, Show } from "./models/types";

export default function HeroHeader({ item }: {item:(Movie | Show)}) {
    return (
        <div
        className="relative w-full h-[70vh] flex items-end p-10  shadow-xl overflow-hidden"
        style={{
        backgroundImage: `url(${item.posterUrl || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        }}
        >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 max-w-2xl text-white space-y-4">
            <Link href={ 'seasonsNum' in item ? `/contents/shows/${item.id}/` : `/contents/movies/${item.id}/` } className="text-4xl md:text-6xl font-bold drop-shadow-xl">
                {item.title}
            </Link>
            {item.synopsis && (
            <p className="text-lg md:text-xl opacity-90 leading-relaxed">
                {item.synopsis}
            </p>
            )}
            </div>
        </div>
    );
}