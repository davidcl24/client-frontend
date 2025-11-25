/**
 * @summary It represents the data of the movie that will come from the backend
 */
export interface Movie {
    title: string,
    synopsis: string | null,
    length: number | null,
    releaseDate: Date | null,
    genreId: number | null,
    posterUrl: string | null,
    rating: number | null,
    isPublished: boolean | null,
    fileKey: string,
    id: number
}

/**
 * @summary It represents the data of the movie that will come from the backend with extra stuff. Inherits Movie
 */
export interface MovieExtended extends Movie {
    genre: Genre
    directors: Director[]
    actors: Actor[]
}

/**
 * @summary It represents the data of the show that will come from the backend
 */
export interface Show {
    title: string,
    synopsis: string | null,
    seasonsNum: number | null,
    releaseDate: Date | null,
    genreId: number | null,
    posterUrl: string | null,
    rating: number | null,
    isPublished: boolean | null,
    id: number | null
}

/**
 * @summary It represents the data of the show that will come from the backend with extra stuff. Inherits Show
 */
export interface ShowExtended extends Show {
    genre: Genre
    directors: Director[]
    actors: Actor[]
}

/**
 * @summary It represents the data of the episode that will come from the backend
 */
export interface Episode {
    title: string,
    synopsis: string | null,
    seasonNum: number | null,
    episodeNum: number | null,
    length: number | null,
    releaseDate: Date | null,
    showId: number | null,
    fileKey: string,
    id: number
}

/**
 * @summary It represents the data of the actor that will come from the backend
 */
export interface Actor {
    name: string,
    birth: Date | null,
    id: number
}

/**
 * @summary It represents the data of the director that will come from the backend
 */
export interface Director {
    name: string,
    birth: Date | null,
    id: number
}

/**
 * @summary It represents the data of the genre that will come from the backend
 */
export interface Genre {
    name: string,
    id: number
}

/**
 * @summary It represents the data of the user that will come from or be sent to the the backend
 */
export interface User {
    userName: string,
    email: string,
    role: string
}

/**
 * @summary It represents the data of the history element that will come from or be sent to the the backend
 */
export interface HistoryElement {
    id: number,
    movieId: number | null,
    episodeId: number | null,
    watchDate: Date,
    progress: number
}

/**
 * @summary It represents the data of the favourite that will come from or be sent to the the backend
 */
export interface FavouriteElement {
    id: number,
    movieId: number | null,
    showId: number | null,
}