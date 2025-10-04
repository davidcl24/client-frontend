import { fetchFromGateway } from "@/app/api-operations";
import { SmallCarousel } from "@/app/carousels";
import { API_GATEWAY_URL } from "@/app/constants/consts";
import { MovieExtended } from "@/app/models/types";

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