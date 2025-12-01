import { SmallCarousel } from "./carousels";
import { API_GATEWAY_URL } from "./constants/consts";
import { fetchFromGateway } from "./api-operations";
import { Movie, Show } from "./models/types";
import HeroHeader from "./hero-header";
import { randomInt } from "crypto";

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
        <HeroHeader item={movieList[randomInt(0, movieList.length)]} />
        <SmallCarousel items={movieList.sort((movieA, movieB) => {
          const dateA = new Date(movieA.releaseDate!).getTime();
          const dateB = new Date(movieB.releaseDate!).getTime();
          return dateA - dateB;
        }).reverse().slice(0, 5)} cardWidth={300} title="Latest movies" />

        <SmallCarousel items={showList.sort((showA, showB) => {
          const dateA = new Date(showA.releaseDate!).getTime();
          const dateB = new Date(showB.releaseDate!).getTime();
          return dateA - dateB;
        }).reverse().slice(0, 5)} cardWidth={300} title="Latest shows"/>

        <SmallCarousel items={movieList.sort((movieA, movieB) => {
          const ratingA = movieA.rating!;
          const ratingB = movieB.rating!;
          return ratingA - ratingB
        }).reverse().slice(0, 5)} cardWidth={300} title="Best rated movies" />

        <SmallCarousel items={showList.sort((showA, showB) => {
          const ratingA = showA.rating!;
          const ratingB = showB.rating!;
          return ratingA - ratingB
        }).reverse().slice(0, 5)} cardWidth={300} title="Best rated shows" />
      </main>    
      <footer>
       
      </footer>
    </div>
  );
}
