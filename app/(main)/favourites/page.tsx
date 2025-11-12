import { fetchFromGateway } from "../api-operations";
import { SmallCarousel } from "../carousels";
import { API_GATEWAY_URL } from "../constants/consts";
import { Movie, Show } from "../models/types";

export default async function FavouritesPage() {
    const favourites: { movies: Movie[], shows: Show[] } = await fetchFromGateway(`${API_GATEWAY_URL}/favourites/user/personal`);
    const showList: Show[] = favourites.shows;
    const movieList: Movie[] = favourites.movies;

    return(
            <div>
                {movieList.length > 0 && 
                    <span>
                        <SmallCarousel items={movieList} cardWidth={300} title="Movies"/>
                    </span>
                }
                {showList.length > 0 && 
                    <span>
                        <SmallCarousel items={showList} cardWidth={300} title="Shows"/>
                    </span>
                }
            </div>
        );
    
} 