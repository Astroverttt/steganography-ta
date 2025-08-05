"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Group11 from "@/assets/image/Group11.png";

export default function NotFound() {
  const router = useRouter();

  const handleNavigateToHomePage = () => {
    router.push("/home/explore");
  };

  const handleNavigateToPreviousPage = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-[570px] flex flex-col items-center gap-3">
        <h1 className="z-10 text-4xl font-medium text-black/80 translate-y-12 ">
          Oops!
        </h1>
        <h1 className="text-[150px] font-bold tracking-widest text-black/80">
          404
        </h1>
        <p className="text-2xl font-semibold text-black/80 -translate-y-12">
          Page Not Found
        </p>
        <p className="text-base font-medium text-center text-black/40 -translate-y-12">
          We searched everywhere but couldn’t find what you’re looking for.
          Let’s find a better place for you to go.
        </p>
        <div className="flex items-center gap-12 -translate-y-9 font-medium">
          <button
            type="button"
            onClick={handleNavigateToHomePage}
            className="w-56 h-12 bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out cursor-pointer"
          >
            Go Home
          </button>
          <button
            type="button"
            onClick={handleNavigateToPreviousPage}
            className="w-56 h-12 border border-blue-500 text-blue-500 rounded-xl hover:border-black/80 hover:text-black/80 active:bg-gray-200 transition duration-200 ease-in-out cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
