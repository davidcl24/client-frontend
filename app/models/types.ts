interface Movie {
    title: string,
    synopsis: string | null,
    length: number | null,
    release_date: Date | null,
    genreId: number | null,
    posterUrl: string | null,
    rating: number | null,
    isPublished: boolean | null,
    fileKey: string,
    id: number
}

interface Show {
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

interface Episode {
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

interface Actor {
    name: string,
    birth: Date | null,
    id: number
}

interface Director {
    name: string,
    birth: Date | null,
    id: number
}

interface Genre {
    name: string,
    id: number
}