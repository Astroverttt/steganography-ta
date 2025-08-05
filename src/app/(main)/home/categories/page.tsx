"use client";

import { useRouter } from "next/navigation";

const CategoriesPage = () => {
  const router = useRouter();

  const handleNavigateToPreviousPage = () => {
    router.back();
  };

  return (
      <div className="flex mt-32">
        <div className="mx-auto flex flex-col gap-2 justify-center items-center">
          <h1 className="text-3xl font-medium">This Is Categories Page</h1>
          <button
            type="button"
            onClick={handleNavigateToPreviousPage}
            className="p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out cursor-pointer"
          >
            Back To Previous Page
          </button>
        </div>
      </div>
  );
};

export default CategoriesPage;
