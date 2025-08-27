import { SmallCarousel } from "./carousels";

export default function Home() {
  const movie: Movie = {
    title: "peli prueba",
    synopsis: null,
    length: null,
    release_date: null,
    genreId: null,
    posterUrl: "https://es.web.img3.acsta.net/pictures/14/02/19/13/12/391206.jpg",
    rating: null,
    isPublished: null,
    fileKey: "",
    id: 1
  }
  const movieList: Movie[] = [movie];

  return (
     <div>
      <main>
        <SmallCarousel items={movieList} cardWidth={400} />
      </main>
      <footer>
       
      </footer>
    </div>
  );
}
