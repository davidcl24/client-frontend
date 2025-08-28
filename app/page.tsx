import { SmallCarousel } from "./carousels";
import { fetchFromGateway } from "./fetch-data";
import { Movie, Show } from "./models/types";

export default async function Home() {
  const movieList: Movie[] = await fetchFromGateway<Movie[]>("http://localhost:30000/movies");
  const showList: Show[] = await fetchFromGateway<Show[]>("http://localhost:30000/shows");

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
