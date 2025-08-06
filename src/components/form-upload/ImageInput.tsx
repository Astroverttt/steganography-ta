import clsx from "clsx";
import NextImage from "next/image";
import React, { useRef } from "react";
import { TbUpload } from "react-icons/tb";

interface ImageInputProps {
  onChange: (file: File) => void;
  onRemove: () => void;
  preview: string | null;
}

export const ImageInput = ({
  onChange,
  onRemove,
  preview,
}: ImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;

          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          ctx.drawImage(img, 0, 0);
          const pngDataUrl = canvas.toDataURL("image/png");

          const byteString = atob(pngDataUrl.split(",")[1]);
          const arrayBuffer = new Uint8Array(byteString.length);
          for (let i = 0; i < byteString.length; i++) {
            arrayBuffer[i] = byteString.charCodeAt(i);
          }

          const originalName = file.name.split(".").slice(0, -1).join(".");
          const pngFile = new File([arrayBuffer], `${originalName}.png`, {
            type: "image/png",
          });

          onChange(pngFile);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onRemove();
  };

  return (
    <div className="p-4 space-y-2 border border-gray-300 rounded-xl">
      <div className="flex justify-between items-center">
        <label
          htmlFor="artwork_image"
          className="w-max text-sm xl:text-base font-normal"
        >
          Upload Artwork*
        </label>
        <div className="flex items-center gap-2">
          <span className="font-light text-xs xl:text-sm text-gray-400">
            Maks. 1 file tipe zip
          </span>
        </div>
      </div>

      {preview ? (
        <div className="w-full">
          <NextImage
            width={400}
            height={400}
            src={preview}
            alt="Artwork Preview"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      ) : (
        <label htmlFor="artwork_image" className="cursor-pointer">
          <div className="group flex justify-center items-center h-[232px] border border-gray-300 hover:bg-gray-100 transition duration-200 ease-in-out rounded-lg">
            <div className="flex flex-col items-center gap-4">
              <div className="flex w-16 h-16 xl:w-20 xl:h-20 border border-blue-800/40 bg-blue-300/10 rounded-full">
                <TbUpload className="mx-auto my-auto text-3xl xl:text-[40px] text-[#1E3799] transition group-hover:-translate-y-1.5 group-hover:scale-110" />
              </div>
              <div className="space-y-1">
                <p className="font-normal text-center text-sm xl:text-base">
                  Seret & Lepas atau{" "}
                  <span className="underline text-[#1E3799]">Pilih File</span>{" "}
                  untuk Mengunggah
                </p>
                <p className="font-light text-center text-xs xl:text-sm text-gray-400">
                  Batas maksimum file 20mb
                </p>
              </div>
            </div>
          </div>
        </label>
      )}

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleRemove}
          className={clsx(
            "font-normal text-sm xl:text-base text-white bg-red-500 rounded-lg hover:bg-red-600 active:bg-red-700 transition-all duration-200 cursor-pointer overflow-hidden",
            preview ? "mt-1 w-32 h-8 xl:w-36 xl:h-10" : "-mt-1 w-0 h-0"
          )}
        >
          Delete Image
        </button>
      </div>

      <input
        id="artwork_image"
        ref={fileInputRef}
        type="file"
        accept="image/png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};
