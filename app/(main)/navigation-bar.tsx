"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import HomeIcon from "@/public/user.svg";
import Image from "next/image";
import { GenresDropdown } from "./genres-hover-menu";
import { Genre } from "./models/types";
import { UserDropdown } from "./user-hover-menu";

/**
 * @summary It stores the option that requires an icon as key and the path where it is store as value
 */
const icons: Record<string, string> = {
  User: "@/public/user.svg",
};

/**
 * @param params - The keywords that will be used to define most of the links and the list of genres for the genres dropdown component
 * @returns 
 */
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
        } else if (link === "User") {
          return (
            <li key={link} className="relative">
              <UserDropdown/>
            </li>
          )
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
            className={`navbar-element ${active ? "bg-blue-500 text-white" : ""}`}
          >
            <Link href={href} className="group navbar-link flex items-center gap-1">
              {icon ? (
                <Image
                  src={icon}
                  alt={`${link} icon`}
                  width={20}
                  height={20}
                  className="inline-block group-hover:invert"
                />
              ) : (link)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}