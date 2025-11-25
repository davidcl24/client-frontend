import { fetchFromGateway } from "@/app/(main)/api-operations";
import { SmallCarousel } from "@/app/(main)/carousels";
import { API_GATEWAY_URL } from "@/app/(main)/constants/consts";
import { MovieExtended } from "@/app/(main)/models/types";

/**
 * @summary This component shows all of the existing shows
 * @returns HTML component
 */
export default async function MoviesPage() {
    const movieList: MovieExtended[] = await fetchFromGateway<MovieExtended[]>(`${API_GATEWAY_URL}/movies/extended`);

    return (
        <div>
            <main>
                <SmallCarousel items={movieList} cardWidth={300} />
                <SmallCarousel items={movieList.filter((movie) => movie.genre?.name === 'Action')} cardWidth={300} />
            </main>
            <footer>

            </footer>
        </div>
    );
}