"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@/public/user.svg";
import Image from "next/image";
import { GenresDropdown } from "./genres-hover-menu";
import { Genre } from "./models/types";

const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  User: HomeIcon,
};

export default function NavBar({links, genres}: {links: string[], genres: Genre[]}) {
    const pathName = usePathname();

    return (
    <ul className="navbar flex items-center relative">
      {links.map((link) => {
        if (link === "Genres") {
          return (
            <li key={link} className="ml-auto relative">
              <GenresDropdown genreList={genres}/>
            </li>
          );
        }

        const icon = icons[link];
        const href =
          link === "Home"
            ? "/"
            : link === "Movies" || link === "Shows"
            ? `/contents/${link.toLowerCase()}`
            : `/${link.toLowerCase()}`;
        const active =
          (link === "Home" ? "/" : `/contents/${link.toLowerCase()}`) === pathName;

        return (
          <li
            key={link}
            className={`navbar-element ${active ? "bg-blue-500 text-white" : "text-gray-700"} flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors`}
          >
            <Link href={href} className="group navbar-link flex items-center gap-1">
              {icon ? (
                <Image
                  src={icon}
                  alt={`${link} icon`}
                  width={20}
                  height={20}
                  className="inline-block group-hover:opacity-80"
                />
              ) : (link)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}