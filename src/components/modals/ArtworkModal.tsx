"use client";

import { motion } from "framer-motion";
import { ModalLayout } from "@/layout/ModalLayout";
import { IoClose } from "react-icons/io5";
import TestImage from "@/assets/image/login_image.png";
import Image from "next/image";

interface ArtowrkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArtworkModal = ({ isOpen, onClose }: ArtowrkModalProps) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "tween" }}
        className="absolute bottom-0 h-[95%] inset-x-0 bg-white rounded-t-3xl"
      >
        <button
          onClick={onClose}
          className="fixed top-13 right-7 cursor-pointer"
        >
          <IoClose className="text-2xl" />
        </button>
        <div className="pt-12 h-full">
          <div className="flex flex-col gap-24 pb-8 h-full overflow-y-auto overflow-hidden">
            <div className="px-58 space-y-4">
              <h1 className="font-semibold text-xl text-black">
                Artwork Title
              </h1>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-linear-to-br from-[#CCCDFF] to-[#A903C7] rounded-full cursor-pointer"></div>
                <span className="font-normal text-base text-black">
                  Artist Name
                </span>
              </div>
              <div className="mt-9 mx-auto space-y-3 max-w-[650px]">
                {/* Artwork Image */}
                <Image
                  width={400}
                  height={400}
                  src={TestImage.src}
                  alt="Artwork"
                  className="w-full h-auto rounded-lg"
                />
                {/* Category */}
                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-2 border border-gray-300/20 font-normal text-sm text-black rounded-lg shadow-md shadow-black/20">
                    Category
                  </div>
                </div>
                {/* Description or Caption */}
                <div className="pt-3 w-full">
                  <p className="font-normal text-base text-justify text-black">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In
                    ratione magni id accusantium veniam debitis cumque
                    cupiditate voluptatem impedit voluptatibus facere vel quo
                    numquam assumenda, aliquid sit asperiores eius? Harum? Lorem
                    ipsum dolor sit amet consectetur adipisicing elit. Unde non
                    rerum, laborum quas id nesciunt recusandae cupiditate
                    perferendis maiores, corrupti officiis ab accusantium. Animi
                    dolorem iste architecto nobis sit ullam?
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-9.5 px-58">
              <div className="relative w-full">
                <hr className="border-1 border-gray-400" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex w-22 h-22 rounded-full bg-white">
                  <div className="mx-auto my-auto w-12 h-12 bg-linear-to-br from-[#CCCDFF] to-[#A903C7] rounded-full cursor-pointer"></div>
                </div>
              </div>
              <span className="font-semibold text-base text-black">
                Artist Name
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </ModalLayout>
  );
};
