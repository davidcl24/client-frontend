import { fetchFromGateway } from "@/app/(main)/api-operations";
import { SmallCarousel } from "@/app/(main)/carousels";
import { API_GATEWAY_URL } from "@/app/(main)/constants/consts";
import { MovieExtended } from "@/app/(main)/models/types";
import { randomInt } from "crypto";
import HeroHeader from "../../hero-header";

/**
 * @summary This component shows all of the existing shows
 * @returns HTML component
 */
export default async function MoviesPage() {
    const movieList: MovieExtended[] = await fetchFromGateway<MovieExtended[]>(`${API_GATEWAY_URL}/movies/extended`);

    return (
        <div>
            <main>
                <HeroHeader item={movieList[randomInt(0, movieList.length)]}/>
                {movieList.filter(movie => movie.genre?.name === 'Action').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Action').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best action movies" />}

                {movieList.filter(movie => movie.genre?.name === 'Romance').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Romance').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best romance movies" />}

                {movieList.filter(movie => movie.genre?.name === 'Thriller').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Thriller').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best thriller movies" />}

                {movieList.filter(movie => movie.genre?.name === 'Adventures').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Adventures').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best adventures movies" />}

                {movieList.filter(movie => movie.genre?.name === 'Drama').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Drama').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best drama movies" />}

                {movieList.filter(movie => movie.genre?.name === 'Belic').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Belic').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best belic movies" />}

                {movieList.filter(movie => movie.genre?.name === 'Comedy').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Comedy').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best comedy movies" />}

                {movieList.filter(movie => movie.genre?.name === 'Western').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Western').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best western movies" />}

                {movieList.filter(movie => movie.genre?.name === 'Horror').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Horror').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best horror movies" />}
                
                {movieList.filter(movie => movie.genre?.name === 'Animation').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Animation').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best animation movies" />}

                {movieList.filter(movie => movie.genre?.name === 'Mute').length > 0 &&
                 <SmallCarousel items={movieList.filter(movie => movie.genre?.name === 'Mute').sort((movieA, movieB) => {
                    const ratingA = movieA.rating!;
                    const ratingB = movieB.rating!;
                    return ratingA - ratingB
                }).slice(0, 5)} cardWidth={300} title="Best mute movies" />}
            </main>
            <footer>

            </footer>
        </div>
    );
}