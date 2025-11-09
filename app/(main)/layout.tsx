import { fetchFromGateway } from "./api-operations";
import { API_GATEWAY_URL } from "./constants/consts";
import { Genre } from "./models/types";
import NavBar from "./navigation-bar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const genreList: Genre[] = await fetchFromGateway<Genre[]>(`${API_GATEWAY_URL}/genres`);
  return (
    <div>
        <NavBar links={["Home", "Movies", "Shows", "Genres", "User"]} genres={genreList} />
        {children}
    </div>
        
  );
}
