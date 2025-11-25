import { fetchFromGateway } from "@/app/(main)/api-operations";
import { SmallCarousel } from "@/app/(main)/carousels";
import { API_GATEWAY_URL } from "@/app/(main)/constants/consts";
import { ShowExtended } from "@/app/(main)/models/types";

/**
 * @summary This component shows all of the existing shows
 * @returns HTML component
 */
export default async function ShowsPage() {
    const showsList: ShowExtended[] = await fetchFromGateway<ShowExtended[]>(`${API_GATEWAY_URL}/shows/extended`);

    return(
        <div>
            <main>
                <SmallCarousel items={showsList} cardWidth={300} />
                <SmallCarousel items={showsList.filter((show) => show.genre?.name === 'Action')} cardWidth={300} />
            </main>
            <footer>

            </footer>
        </div>
    );
}