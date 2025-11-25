import { SmallCarousel } from "./carousels";
import { API_GATEWAY_URL } from "./constants/consts";
import { fetchFromGateway } from "./api-operations";
import { Movie, Show } from "./models/types";

/**
 * @summary The component for the home page
 * @returns HTML component
 */
export default async function Home() {
  const movieList: Movie[] = await fetchFromGateway<Movie[]>(`${API_GATEWAY_URL}/movies`);
  const showList: Show[] = await fetchFromGateway<Show[]>(`${API_GATEWAY_URL}/shows`);

  return (
     <div>
      <main>
        <SmallCarousel items={movieList} cardWidth={300} />
        <SmallCarousel items={showList} cardWidth={300} />
      </main>
      <footer>
       
      </footer>
    </div>
  );
}
