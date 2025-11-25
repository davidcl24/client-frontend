import { fetchFromGateway } from "../api-operations";
import { API_GATEWAY_URL } from "../constants/consts";
import { GenreCardGrid } from "../genre-card-grid";
import { Genre } from "../models/types";

/**
 * @summary A component that shows all of the genres
 * @returns HTML component
 */
export default async function GenresPage() {
    const genreList: Genre[] = await fetchFromGateway<Genre[]>(`${API_GATEWAY_URL}/genres`);
    return(
        <div>
            <GenreCardGrid genres={genreList}/>
        </div>
    )
}