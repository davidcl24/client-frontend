import { fetchFromGateway } from "../../api-operations";
import { SmallCarousel } from "../../carousels";
import { API_GATEWAY_URL } from "../../constants/consts";
import { Movie, Show } from "../../models/types";

export default async function GenrePage({params}: {params: {id: string}}) {
    const showList: Show[] = await fetchFromGateway<Show[]>(`${API_GATEWAY_URL}/genres/${params.id}/shows`);
    const movieList: Movie[] = await fetchFromGateway<Movie[]>(`${API_GATEWAY_URL}/genres/${params.id}/movies`)

    return(
        <div>
            {movieList.length > 0 && 
                <span>
                    <SmallCarousel items={movieList} cardWidth={300} title="Películas"/>
                </span>
            }
            {showList.length > 0 && 
                <span>
                    <SmallCarousel items={showList} cardWidth={300} title="Series"/>
                </span>
            }
        </div>
    );
}