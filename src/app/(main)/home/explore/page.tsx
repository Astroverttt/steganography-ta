"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

const ExplorePage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/explores/explore`);
        const data = await res.json();
        setArtworks(data.result);
      } catch (err) {
        console.error("Gagal mengambil data artwork:", err);
      }
    };

    fetchArtworks();
  }, []);

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        Showcase Your Digital Art
      </h1>
      <p className="text-center text-gray-500 mb-6">
        Join the community of creative digital artists
      </p>

      {/* Filter buttons */}
      <div className="flex justify-center flex-wrap gap-2 mb-10">
        {[
          "All Categories",
          "Sub Categories",
          "Latest",
          "Popular",
          "Brand Logo",
          "Football",
          "Paint",
        ].map((label) => (
          <button
            key={label}
            className="border border-gray-300 rounded-full px-4 py-1 text-sm hover:bg-gray-100"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Artwork grid */}
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
              {/* <span className="text-gray-500 text-xs">
                by @{artwork.user?.username || "username"}
              </span> */}

              {/* Profile info
              {artwork.user?.username && (
                <div className="flex items-center gap-2 mt-1">
                  <Image
                    width={12}
                    height={12}
                    src={
                      artwork.user.profile_picture_url
                        ? process.env.NEXT_PUBLIC_API_URL +
                          artwork.user.profile_picture_url
                        : "/default-avatar.png"
                    }
                    alt="Profile"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span className="text-blue-600 hover:underline text-xs">
                    @{artwork.user.username}
                  </span>
                </div>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
