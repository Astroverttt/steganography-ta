"use client";

import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa6";
import { navbarLinks } from "@/models/navbarLinks";

interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  profile_picture: string | null;
  location?: string;
}

interface NavbarProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Navbar = ({ onClick }: NavbarProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoadingUser(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setUser(null);
          setIsLoadingUser(false);
          return;
        }

        const API_BASE_URL =
          process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8000";

        const response = await fetch(`${BASE_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("token");
          setUser(null);
          console.warn("Authentication failed, token removed.");
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Gagal mengambil data user");
        }

        const data: User = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
    setShowLogoutModal(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full px-4 xl:px-8 py-4 flex items-center bg-gray-100/60 backdrop-blur-sm border-b border-gray-200">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-4 items-center">
            {navbarLinks.map((link) => (
              <div key={link.id} className="flex items-center">
                {link.id !== 1 && (
                  <div className="mr-4 w-px h-6 bg-gray-400"></div>
                )}
                <a
                  href={link.url}
                  className={clsx(
                    "text-base",
                    link.id !== 1 ? "text-[#576974]" : "font-semibold"
                  )}
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div>
          <button type="button" onClick={onClick} className="xl:hidden">
            <FaBars className="text-xl cursor-pointer" />
          </button>
          <div className="hidden xl:flex gap-6 items-center">
            {isLoadingUser ? (
              <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
            ) : user ? (
              <div className="flex items-center gap-4">
                <Link href="/profile">
                  {user.profile_picture ? (
                    <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-300 cursor-pointer">
                      <Image
                        src={user.profile_picture}
                        alt={`${user.name || user.username}'s profile`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#CCCDFF] to-[#A903C7] cursor-pointer border border-gray-300"></div>
                  )}
                </Link>

                {/* Tombol Logout */}
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="px-3 py-1 text-sm text-red-600 border border-red-500 rounded-full hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Modal Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-80 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 text-sm text-gray-600 rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
