import React from "react";
import { motion } from "framer-motion";
import { ModalLayout } from "@/layout/ModalLayout";
import { Button } from "@/components/form-upload/Button";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { license } from "@/models/artworkLicenses";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: {
    title: string;
    description: string;
    license_type: null | license;
    price: string;
    image: null | File;
    watermark_creator_message: string;
  };
  previewImage: string | null;
}

export const UploadModal = ({
  isOpen,
  onClose,
  formData,
  previewImage,
}: UploadModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 1.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.5 }}
        transition={{ type: "tween", duration: 0.15 }}
        className="relative w-[360px] h-[650px] lg:w-[900px] lg:h-[650px] xl:w-[1000px] xl:h-[650px] pl-[40px] pr-[35px] pt-14 space-y-10 bg-white rounded-xl"
      >
        <IoClose
          onClick={onClose}
          className="absolute top-4 right-3 text-2xl cursor-pointer"
        />
        <h1 className="font-semibold text-2xl">Final Touches</h1>
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">Thumbnail Preview</h2>
          <div className="flex justify-between gap-8">
            {/* File Gambar yang ditampilkan dalam bentuk preview */}
            <div className="h-max">
              {previewImage ? (
                <Image
                  width={400}
                  height={400}
                  src={previewImage}
                  alt="Artwork Preview"
                  className="max-w-96 h-auto object-cover rounded-lg"
                />
              ) : (
                <div className="flex w-96 h-52 rounded-xl bg-gray-200">
                  <span className="mx-auto my-auto text-sm text-gray-500">
                    No image attached yet
                  </span>
                </div>
              )}
            </div>
            <div className="space-y-4 w-full max-h-[440px] overflow-y-auto pr-2">
              <div className="space-y-2">
                <h3 className="font-light text-base">Title</h3>
                <div className="w-full min-h-11 px-3 flex items-center border rounded-lg">
                  {formData.title === "" ? (
                    <span className="font-normal text-base text-gray-400">
                      No Title
                    </span>
                  ) : (
                    <span>{formData.title}</span>
                  )}
                </div>
              </div>
              <div className="space-y-2"></div>
              <div className="space-y-2"></div>
              <div className="space-y-2">
                <h3 className="font-light text-base">Description</h3>
                <div className="w-full min-h-11 px-3 py-2 flex items-center border rounded-lg overflow-y-auto">
                  {/* value description */}
                  <span className="break-words whitespace-pre-wrap text-justify">
                    {formData.description === "" ? (
                      <span className="font-normal text-base text-gray-400">
                        No Description
                      </span>
                    ) : (
                      <span>{formData.title}</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-11">
                <Button
                  text="Close"
                  onClick={onClose}
                  buttonClassName="hover:bg-black hover:text-white active:bg-black/80 transition duration-200 ease-in-out"
                />
                <Button
                  text="Save as Draft"
                  buttonClassName="hover:bg-black hover:text-white active:bg-black/80 transition duration-200 ease-in-out"
                />
                <Button
                  text="Upload"
                  buttonClassName="bg-black text-white active:bg-black/80 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </ModalLayout>
  );
};
