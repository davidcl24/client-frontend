import { fetchFromGateway } from "@/app/(main)/api-operations";
import { SmallCarousel } from "@/app/(main)/carousels";
import { API_GATEWAY_URL } from "@/app/(main)/constants/consts";
import { ShowExtended } from "@/app/(main)/models/types";
import HeroHeader from "../../hero-header";
import { randomInt } from "crypto";

/**
 * @summary This component shows all of the existing shows
 * @returns HTML component
 */
export default async function ShowsPage() {
    const showsList: ShowExtended[] = await fetchFromGateway<ShowExtended[]>(`${API_GATEWAY_URL}/shows/extended`);

    return(
        <div>
            <main>
                <HeroHeader item={showsList[randomInt(0, showsList.length)]}/>
                {showsList.filter(show => show.genre?.name === 'Action').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Action').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best action shows" />}
                
                {showsList.filter(show => show.genre?.name === 'Romance').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Romance').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best romance shows" />}

                {showsList.filter(show => show.genre?.name === 'Thriller').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Thriller').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best thriller shows" />}

                {showsList.filter(show => show.genre?.name === 'Adventures').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Adventures').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best adventures shows" />}

                {showsList.filter(show => show.genre?.name === 'Drama').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Drama').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best drama shows" />}

                {showsList.filter(show => show.genre?.name === 'Belic').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Belic').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best belic shows" />}

                {showsList.filter(show => show.genre?.name === 'Comedy').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Comedy').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best comedy shows" />}

                {showsList.filter(show => show.genre?.name === 'Western').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Western').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best western shows" />}

                {showsList.filter(show => show.genre?.name === 'Horror').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Horror').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best horror shows" />}

                {showsList.filter(show => show.genre?.name === 'Animation').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Animation').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best animation shows" />}

                {showsList.filter(show => show.genre?.name === 'Mute').length > 0 &&
                 <SmallCarousel items={showsList.filter(show => show.genre?.name === 'Mute').sort((showA, showB) => {
                    const ratingA = showA.rating!;
                    const ratingB = showB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best mute shows" />}
            </main>
            <footer>

            </footer>
        </div>
    );
}