import { fetchFromGateway } from "../../api-operations";
import { SmallCarousel } from "../../carousels";
import { API_GATEWAY_URL } from "../../constants/consts";
import { Movie, Show } from "../../models/types";

export default async function GenrePage({params}: {params: {id: string}}) {
    const {id} = await params;
    const showList: Show[] = await fetchFromGateway<Show[]>(`${API_GATEWAY_URL}/genres/${id}/shows`);
    const movieList: Movie[] = await fetchFromGateway<Movie[]>(`${API_GATEWAY_URL}/genres/${id}/movies`)

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