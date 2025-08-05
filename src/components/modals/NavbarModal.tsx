"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ModalLayout } from "@/layout/ModalLayout";
import { navbarLinks } from "@/models/navbarLinks";
import { IoIosArrowForward } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import Image from "next/image";

interface NavbarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavbarModal = ({ isOpen, onClose }: NavbarModalProps) => {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);

  const handleNavigateToProfilePage = () => {
    router.push("/profile");
  };

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="absolute inset-y-0 right-0 pl-7 pr-3 py-4 bg-white w-[300px] sm:w-[350px] md:w-[400px] rounded-l-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -left-4 top-1/2 -translate-y-1/2 flex w-8 h-12 bg-white border border-gray-400/20 rounded-lg shadow-xl shadow-black/20 cursor-pointer"
        >
          <IoIosArrowForward className="mx-auto my-auto text-2xl" />
        </button>
        <div className="space-y-5">
          <div className="flex gap-3 items-center cursor-pointer">
            {/* Profile Picture with click */}
            <div
              onClick={handleNavigateToProfilePage}
              className="w-14 h-14 rounded-full overflow-hidden relative border border-gray-300 hover:opacity-80 transition"
            >
              <Image
                src="/default-avatar.jpg" // ganti dengan path gambar asli atau image user
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div>

            {/* Name + Location */}
            <div className="space-y-0.5" onClick={handleNavigateToProfilePage}>
              <h2 className="font-semibold text-md text-black">Artist Name</h2>
              <span className="font-normal text-sm">Location</span>
            </div>
          </div>

          <div
            className={clsx(
              "relative flex items-center h-10 px-2.5 border rounded-2xl md:rounded-full lg:px-4 transition duration-200",
              isFocused ? "border-black" : "border-[#8A9CA7]"
            )}
          >
            <input
              type="text"
              placeholder="I'm looking for..."
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full text-sm pr-7 placeholder:italic focus:outline-0"
            />
            <CiSearch
              className={clsx(
                "absolute scale-150 top-2 translate-y-[3px] right-3",
                isFocused ? "text-black" : "text-gray-600"
              )}
            />
          </div>

          <div className="flex flex-col gap-5">
            {navbarLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                className="w-max text-sm cursor-pointer hover:underline"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </ModalLayout>
  );
};
