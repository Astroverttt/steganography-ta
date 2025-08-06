"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import BASE_URL from "../../../../config";

interface Artwork {
  id: string;
  title: string;
  image_url: string;
  likes: number;
  user?: {
    username: string;
    profile_picture_url?: string;
  };
}

interface UserData {
  username: string;
  location?: string;
  profile_picture_url?: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleNavigateToUploadPage = () => {
    router.push("/upload");
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const res = await fetch(`${BASE_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
            return;
          }
          if (res.status === 404) {
            throw new Error("User tidak ditemukan (404).");
          }
          throw new Error(`Gagal mengambil data user: ${res.statusText}`);
        }

        const data = await res.json();
        setUserData(data);
      } catch (err: any) {
        console.error("Error fetching user data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  // Fetch user artworks
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${BASE_URL}/api/users/me/artworks`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Gagal mengambil data artwork: ${res.statusText}`);
        }

        const data = await res.json();
        setArtworks(data.result || []);
      } catch (err: any) {
        console.error("Error fetching artworks:", err);
        // Don't set error for artworks, just log it
      }
    };

    fetchArtworks();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center px-4 pt-18 xl:px-8 xl:pt-24">
        <div className="flex gap-5 mb-9">
          {/* Profile Picture */}
          <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-full bg-gradient-to-br from-[#CCCDFF] to-[#A903C7] flex items-center justify-center overflow-hidden">
            {userData?.profile_picture_url ? (
              <Image
                src={`${BASE_URL}${userData.profile_picture_url}`}
                alt="Profile Picture"
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-lg xl:text-xl">
                {userData?.username?.charAt(0).toUpperCase() || "U"}
              </span>
            )}
          </div>

          <div className="space-y-3 xl:space-y-5">
            <div className="space-y-0.5 xl:space-y-1">
              {loading ? (
                <>
                  <div className="w-32 h-6 xl:h-8 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-24 h-4 xl:h-5 bg-gray-200 rounded animate-pulse"></div>
                </>
              ) : (
                <>
                  <h1 className="text-lg xl:text-2xl font-semibold">
                    {userData?.username || "Unknown User"}
                  </h1>
                  {userData?.location && (
                    <span className="text-sm xl:text-base font-normal text-gray-600">
                      {userData.location}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <hr className="w-full border-gray-400/70 mb-6" />
      </div>
      <div className="flax flex-col items-center px-4 xl:px-8 space-y-6">
        {/* Go to Upload Page */}
        <div
          onClick={handleNavigateToUploadPage}
          className={clsx(
            "flex justify-center items-center h-36 xl:h-80 border-2 border-dashed border-gray-500 rounded-xl overflow-hidden",
            isButtonHovered ? "" : "xl:hover:bg-gray-200 active:bg-gray-300"
          )}
        >
          <div className="flex flex-col items-center gap-4 px-5 py-6 cursor-pointer">
            <FiUpload className="text-6xl xl:text-8xl text-blue-500" />
            <h2 className="hidden xl:block xl:text-xl font-semibold">
              Upload your first shot
            </h2>
            <p className="hidden xl:block xl:text-sm text-center">
              Show off your best work. Get feedback, likes, and be a part of a
              growing community
            </p>
            <button
              type="button"
              onClick={handleNavigateToUploadPage}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
              className="mt-3 px-5 py-3 hidden xl:block xl:text-sm text-white bg-black rounded-full hover:bg-black/90 active:bg-black/80 transition duration-200 ease-in-out cursor-pointer"
            >
              Upload your first shot
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="flex flex-col cursor-pointer transition-transform duration-300 transform hover:scale-[1.03] hover:shadow-lg"
            >
              <Link href={`/home/detail-artwork/${artwork.id}`}>
                <Image
                  width={400}
                  height={400}
                  src={process.env.NEXT_PUBLIC_BASE_URL + artwork.image_url}
                  alt={artwork.title}
                  className="w-full h-[180px] object-cover rounded-lg shadow"
                />
              </Link>

              <div className="mt-2 flex flex-col text-sm">
                <span className="font-semibold truncate" title={artwork.title}>
                  {artwork.title}
                </span>
                <span className="text-gray-500 text-xs">
                  {artwork.likes} likes
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
