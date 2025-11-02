import NavBar from "./navigation-bar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
        <NavBar links={["Home", "Movies", "Shows", "Genres", "User"]} />
        {children}
    </div>
        
  );
}
