"use client";

import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ReceiptDetail {
  receipt_id: string;
  artwork_title: string;
  image_url: string;
  purchase_date: string;
  price: number;
  buyer_secret_code: string;
  download_url: string;
  watermark_api: string;
}

interface WatermarkResult {
  extracted_in: string;
  copyright_hash: string;
  creator_message: string;
}

export const DETAIL_PAGE = {
	title: "Abstract City",
	username: "Nabiha",
	photoProfile: "/profile.png",
	imageUrl: "/abstract.png",
	alt: "Abstract City",
	tags: ["Animasi", "City", "View"],
	description:
		"Lukisan ini merepresentasikan dinamika kehidupan urban melalui sapuan warna yang tegas dan bentuk geometris yang tidak beraturan. Setiap garis dan warna mencerminkan hiruk pikuk, ritme cepat, serta kesan modern dari sebuah kota yang terus bergerak.",
	extracted_in: "10 detik",
	copyright_hash: "868be242da48da8898956a9d507b23e5",
	creator_message: "Ini pesan rahasia jangan sampai bocor ketangan amerika",
};

const ReceiptDetailPage: React.FC = () => {
  const router = useRouter();
  const { id: receiptId } = router.query;
  // const receiptId = "1";

  // const receipt = DETAIL_PAGE;
  const [receipt, setReceipt] = useState<ReceiptDetail | null>(null);
  const [watermark, setWatermark] = useState<WatermarkResult | null>(null);
  const [loadingReceipt, setLoadingReceipt] = useState(true);
  const [loadingWatermark, setLoadingWatermark] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtractWatermark = useCallback(
    async (currentReceipt: ReceiptDetail) => {
      setLoadingWatermark(true);
      setError(null);
      setWatermark(null);

      try {
        const response = await fetch(currentReceipt.watermark_api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image_url: `${process.env.NEXT_PUBLIC_API_URL}${currentReceipt.image_url}`,
            buyer_secret_code: currentReceipt.buyer_secret_code,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || "Gagal mengekstrak watermark.");
        }

        const data: WatermarkResult = await response.json();
        setWatermark(data);
      } catch (err: any) {
        setError(
          err.message || "Terjadi kesalahan saat mengekstrak watermark."
        );
      } finally {
        setLoadingWatermark(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!router.isReady) return;
    if (!receiptId) return;

    const fetchReceiptDetail = async () => {
      setLoadingReceipt(true);
      setError(null);

        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setError("Anda harus login untuk melihat detail pembelian.");
            setLoadingReceipt(false);
            return;
          }

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/payments/receipt/${receiptId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Gagal memuat detail pembelian.");
          }

          const data: ReceiptDetail = await response.json();
          setReceipt(data);
          handleExtractWatermark(data);
        } catch (err: any) {
          setError(
            err.message || "Terjadi kesalahan saat memuat detail pembelian."
          );
        } finally {
          setLoadingReceipt(false);
        }
      };

      fetchReceiptDetail();
    }, [receiptId, process.env.NEXT_PUBLIC_API_URL, handleExtractWatermark]);

  if (loadingReceipt) {
    return (
      <p className="text-center py-10 text-gray-500">
        Memuat detail pembelian...
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Tanda Terima Pembelian
      </h1>

      {receipt && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${receipt.image_url}`} // Assuming images are served from your backend
              alt={receipt.artwork_title}
              width={600}
              height={400}
              className="rounded-lg object-contain max-h-[500px] w-full"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="text-gray-700 text-base mb-4">
                Terima kasih telah membeli karya <i>{receipt.artwork_title}</i>!
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Detail Pembelian:
              </h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Tanggal Beli:</strong>{" "}
                  {new Date(receipt.purchase_date).toLocaleDateString("id-ID")}
                </li>
                <li>
                  <strong>Harga:</strong> Rp{" "}
                  {receipt.price.toLocaleString("id-ID")}
                </li>
                <li>
                  <strong>Kode Rahasia:</strong>{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">
                    {receipt.buyer_secret_code}
                  </code>
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
                Hasil Watermark:
              </h3>

              {loadingWatermark ? (
                <p className="text-gray-500 text-sm">
                  Mengekstrak watermark...
                </p>
              ) : watermark ? (
                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <strong>Diekstrak dalam:</strong> {watermark.extracted_in}{" "}
                    seconds
                  </p>
                  <p>
                    <strong>Hash Hak Cipta:</strong>{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {watermark.copyright_hash}
                    </code>
                  </p>
                  <p>
                    <strong>Pesan Pembuat:</strong>{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      {watermark.creator_message}
                    </code>
                  </p>
                </div>
              ) : error ? (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              ) : null}
            </div>

            <p className="text-xs text-gray-400 mt-6">
              Simpan informasi ini sebagai bukti resmi pembelian karya digital.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptDetailPage;
