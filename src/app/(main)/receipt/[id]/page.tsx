"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import BASE_URL from "../../../../../config";

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

const ReceiptDetailPage: React.FC = () => {
  const params = useParams();
  const receiptId = params?.id as string;

  const [receipt, setReceipt] = useState<ReceiptDetail | null>(null);
  const [watermark, setWatermark] = useState<WatermarkResult | null>(null);
  const [loadingReceipt, setLoadingReceipt] = useState(true);
  const [loadingWatermark, setLoadingWatermark] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getFullUrl = (path: string): string => {
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }
    if (path.startsWith("/")) {
      return `${BASE_URL}${path}`;
    }
    return `${BASE_URL}/${path}`;
  };

  const handleExtractWatermark = useCallback(
    async (currentReceipt: ReceiptDetail) => {
      setLoadingWatermark(true);
      setError(null);
      setWatermark(null);

      try {
        const response = await fetch(getFullUrl(currentReceipt.watermark_api), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image_url: getFullUrl(currentReceipt.image_url),
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
    [BASE_URL]
  );

  useEffect(() => {
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
          `${BASE_URL}/api/payments/receipt/${receiptId}`,
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
  }, [receiptId, handleExtractWatermark, BASE_URL]);

  if (loadingReceipt) {
    return (
      <p className="text-center py-10 text-gray-500">
        Memuat detail pembelian...
      </p>
    );
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  return (
    <div className="w-screen bg-[#f2f4f5] flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 my-3">
        Tanda Terima Pembelian
      </h1>

      {receipt && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white shadow-lg rounded-lg p-6 max-w-6xl">
          <div className="flex items-center justify-center">
            <Image
              src={getFullUrl(receipt.image_url)}
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
                    detik
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
