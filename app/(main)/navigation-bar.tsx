"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import GridIcon from "@/public/point-grid.svg";
import HomeIcon from "@/public/user.svg";
import Image from "next/image";


const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  User: HomeIcon,
  Genres: GridIcon
};

export default function NavBar({links}: {links: string[]}) {
    const pathName = usePathname();

    return (
    <ul className="navbar flex">
      {links.map((link) => {
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
            className={`navbar-element ${active ? "bg-blue-500" : ""} ${
              link === "Genres" ? "ml-auto" : ""
            } flex items-center gap-2`}
          >
            <Link href={href} className="group navbar-link flex items-center gap-1 hover:invert-0">
              {icon ? (
                <Image
                  src={icon}
                  alt={`${link} icon`}
                  width={20}
                  height={20}
                  className="inline-block dark:invert group-hover:invert-0"
                />
              ): (link)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}