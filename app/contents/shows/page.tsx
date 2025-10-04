import { fetchFromGateway } from "@/app/api-operations";
import { SmallCarousel } from "@/app/carousels";
import { API_GATEWAY_URL } from "@/app/constants/consts";
import { ShowExtended } from "@/app/models/types";

export default async function ShowsPage() {
    const showsList: ShowExtended[] = await fetchFromGateway<ShowExtended[]>(`${API_GATEWAY_URL}/shows/extended`);

    return(
        <div>
            <main>
                <SmallCarousel items={showsList} cardWidth={300} />
                <SmallCarousel items={showsList.filter((show) => show.genre != null && show.genre.name === 'Action')} cardWidth={300} />
            </main>
            <footer>

            </footer>
        </div>
    );
}