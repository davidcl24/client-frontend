"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function NavBar({links}: {links: string[]}) {
    const pathName = usePathname();

    return (
        <ul className="navbar flex">
            {links.map(link => (
                <li className={`navbar-element ${(link === "Home" ? "/" : `/contents/${link.toLowerCase()}`) === pathName ? "bg-blue-500" : ""} \
                ${link === "About" ? "ml-auto" : "  "}`} 
                key={link}><Link className="navbar-link" 
                href={link === "Home" ? "/" :
                        link === "Movies" ? `/contents/${link.toLowerCase()}` :
                        link === "Shows" ? `/contents/${link.toLowerCase()}` :
                        `/${link.toLowerCase()}`
                        }>{link}</Link></li>
            ))}
        </ul>
    )
}