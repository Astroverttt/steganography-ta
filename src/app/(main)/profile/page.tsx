"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";

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

const ProfilePage = () => {
  const router = useRouter();
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const handleNavigateToUploadPage = () => {
    router.push("/upload");
  };

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/me`;
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Karya tidak ditemukan (404).");
          }
          throw new Error(`Gagal mengambil data karya: ${res.statusText}`);
        }

        const data = await res.json();
        setData(data);
      } catch (err: any) {
        console.error("Error fetching artwork:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, []);

  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/me/artworks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setArtworks(data.result);
      } catch (err) {
        console.error("Gagal mengambil data artwork:", err);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center px-4 pt-18 xl:px-8 xl:pt-24">
        <div className="flex gap-5 mb-9">
          <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-full bg-linear-to-br from-[#CCCDFF] to-[#A903C7]"></div>
          <div className="space-y-3 xl:space-y-5">
            <div className="space-y-0.5 xl:space-y-1">
              {loading ? (
                <div className="w-full h-6 xl:h-8 bg-gray-200 rounded-full"></div>
              ) : (
                <>
                  <h1 className="text-lg xl:text-2xl font-semibold">
                    {data?.username}
                  </h1>
                  <span className="text-sm xl:text-base font-normal">
                    {data?.location}
                  </span>
                </>
              )}
            </div>
            <div className="flex gap-3 xl:gap-5 items-center"></div>
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
                  src={"http://localhost:8000" + artwork.image_url}
                  alt={artwork.title}
                  className="w-full h-[180px] object-cover rounded-lg shadow"
                />
              </Link>

              <div className="mt-2 flex flex-col text-sm">
                <span className="font-semibold">{artwork.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
