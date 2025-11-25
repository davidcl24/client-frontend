"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import UserIcon from "@/public/user.svg";
import Image from "next/image";

/**
 * @summary A component that shows a dropdown menu when the cursor is over it
 * @returns HTML component
 */
export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const optionList = ["User Settings", "Favourites", "Log Out"]

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        right: window.innerWidth - rect.right - window.scrollX,
      });
    }
  };

  const openDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    updatePosition();
    setIsOpen(true);
  };

  const closeDropdown = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 150); 
  };

  return (
    <>
      <button
        ref={buttonRef}
        onMouseEnter={openDropdown}
        onMouseLeave={closeDropdown}
        className="group navbar-link flex items-center gap-1 px-4 py-2 hover:bg-white/10"
      >
        <Image
          src={UserIcon}
          alt="User icon"
          width={20}
          height={20}
          className="inline-block group-hover:invert"
        />
      </button>

      {isOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            className="fixed text-white rounded-2xl shadow-2xl border border-white/10
                       backdrop-blur-2xl z-50 transition-all duration-200"
            style={{
              top: `50px`,
              right: `30px`,
              width: "600px",
              background: "rgba(17, 17, 17, 0.92)",
            }}
          >
            <div className="p-6">
               <p
                style={{ color: "lightgrey" }}
                className="font-semibold text-sm uppercase mb-6 tracking-wide"
              >
                USER
              </p>

              <div className="columns-2 gap-6">
                {optionList.map((option) => (
                  <div key={option.replace(" ", "-").toLowerCase()} className="break-inside-avoid mb-2">
                    <Link
                      href={`/${option.replace(" ", "-").toLowerCase()}`}
                      className="block text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded transition-colors text-sm"
                    >
                      {option}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
