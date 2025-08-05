"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Artwork {
  id: string;
  title: string;
  description: string;
  image_url: string;
  username: string;
  name?: string;
  profile_picture?: string;
  price?: number;
  is_sold?: boolean;
}

export default function DetailArtworkPage() {
  const params = useParams();
  let id = "";
  if (params?.id) {
    id = Array.isArray(params.id) ? params.id[0] : params.id;
  }

  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgSize, setImgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!id || typeof id !== "string") {
      setLoading(false);
      setError("ID Artwork tidak valid atau tidak ditemukan.");
      return;
    }

    const fetchArtwork = async () => {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/artworks/${id}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Karya tidak ditemukan (404).");
          }
          throw new Error(`Gagal mengambil data karya: ${res.statusText}`);
        }

        const data = await res.json();
        setArtwork(data);
      } catch (err: any) {
        console.error("Error fetching artwork:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  useEffect(() => {
    if (!artwork?.image_url) return;

    const fullImageUrl = artwork.image_url.startsWith("http")
      ? artwork.image_url
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}${artwork.image_url}`;

    const img = new window.Image();
    img.src = fullImageUrl;
    img.onload = () => {
      setImgSize({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      console.error("Failed to load image for size calculation:", fullImageUrl);
      setImgSize({ width: 0, height: 0 });
    };
  }, [artwork]);

  const handleBuy = async () => {
    if (!artwork?.id) return;

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Silakan login terlebih dahulu untuk membeli karya ini.");
      return;
    }

    const currentOrigin = window.location.origin;
    const successRedirectUrl = `${currentOrigin}/home/detail-artwork/${artwork.id}?payment_status=success`;
    const artworkDetailUrlBase = `${currentOrigin}/home/detail-artwork/${artwork.id}`;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/payments/initiate-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            artwork_id: artwork.id,
            success_redirect_url: successRedirectUrl,
            error_redirect_url: artworkDetailUrlBase,
            pending_redirect_url: artworkDetailUrlBase,
          }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Gagal memulai pembayaran.");
      }

      const data = await res.json();
      if (data.redirect_url) {
        window.location.href = data.redirect_url;
      } else {
        throw new Error("Link pembayaran tidak ditemukan.");
      }
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat proses pembayaran.");
    }
  };

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center text-gray-700">
          Loading...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center text-red-600">
          {error}
        </div>
      </>
    );
  }

  if (!artwork) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center text-gray-700">
          Karya tidak ditemukan.
        </div>
      </>
    );
  }

  const fullImageUrl = artwork.image_url.startsWith("http")
    ? artwork.image_url
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}${artwork.image_url}`;

  const displayUsername = artwork.username ?? "Unknown Artist";
  const displayTitle = artwork.title ?? "Untitled Artwork";
  const displayDescription = artwork.description ?? "No description available.";
  const displayPrice =
    artwork.price !== undefined
      ? new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        }).format(artwork.price)
      : "Gratis";
  const isSoldOut = artwork.is_sold ?? false;
  const isFree = !artwork.price || artwork.price === 0;

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                {displayTitle}
              </h1>
              <div className="flex items-center gap-3">
                {artwork.profile_picture ? (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={artwork.profile_picture}
                      alt={displayUsername}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-purple-800 font-semibold text-sm flex-shrink-0">
                    {displayUsername.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {artwork.name || displayUsername}
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center bg-gray-100 rounded-lg overflow-hidden mb-6">
              {imgSize.width > 0 && imgSize.height > 0 ? (
                <Image
                  src={fullImageUrl}
                  alt={displayTitle}
                  unoptimized
                  width={imgSize.width}
                  height={imgSize.height}
                  className="block max-w-full h-auto"
                />
              ) : (
                <div className="w-full aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
                  Gambar tidak tersedia
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-gray-200 pt-6 mt-6">
              <div className="mb-4 sm:mb-0">
                <span className="text-xl font-bold text-gray-900">
                  {displayPrice}
                </span>
              </div>

              {isSoldOut ? (
                <button
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-red-600 text-white font-semibold opacity-70 cursor-not-allowed"
                  disabled
                >
                  Sold Out
                </button>
              ) : isFree ? (
                <a
                  href={fullImageUrl}
                  download
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition duration-300 text-center"
                >
                  Download Gratis
                </a>
              ) : (
                <button
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-300"
                  onClick={handleBuy}
                >
                  Beli Sekarang
                </button>
              )}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Deskripsi
              </h2>
              <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                {displayDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
