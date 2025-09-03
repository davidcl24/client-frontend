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

export interface Actor {
    name: string,
    birth: Date | null,
    id: number
}

export interface Director {
    name: string,
    birth: Date | null,
    id: number
}

export interface Genre {
    name: string,
    id: number
}

export interface User {
    userName: string,
    email: string
}

export interface HistoryElement {
    id: number,
    userId: number,
    movieId: number | null,
    episodeId: number | null,
    watchDate: Date,
    progress: number
}

export interface FavouriteElement {
    id: number,
    userId: number,
    movieId: number | null,
    showId: number | null,
}