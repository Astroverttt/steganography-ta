"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

export default function RegisterPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, username, email, password }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Register failed");
        return;
      }

      const data = await res.json();
      const userId = data?.id || data?.user?.id;

      if (profilePicture && userId) {
        const formData = new FormData();
        formData.append("file", profilePicture);

        await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}/upload-profile-picture`,
          {
            method: "POST",
            body: formData,
          }
        );
      }

      router.push("/");
    } catch {
      setError("Terjadi kesalahan jaringan.");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col 2xl:flex-row">
      <div className="relative max-h-screen">
        <Image
          width={400}
          height={400}
          src={"/login_image.png"}
          alt="F1 Racing Car"
          className="fixed w-full h-screen 2xl:static 2xl:h-full object-cover"
        />
      </div>

      <div className="absolute bottom-0 flex justify-center items-start px-8 pt-8 w-full h-10/12 rounded-t-xl sm:bottom-1/2 sm:translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:w-[456px] sm:h-max sm:py-8 sm:rounded-xl 2xl:static 2xl:flex 2xl:translate-x-0 2xl:translate-y-0 2xl:items-center 2xl:h-screen 2xl:rounded-none 2xl:px-8 2xl:py-0 2xl:w-[950px] overflow-y-auto bg-white">
        <div className="w-full">
          <h1 className="text-lg sm:text-xl font-semibold mb-6">Sign Up</h1>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <form onSubmit={handleRegister} className="mb-8">
            <div className="space-y-6 mb-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="full_name" className="text-xs font-normal">
                  Full Name
                </label>
                <input
                  id="full_name"
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-[14px] bg-[#F2F2F2] text-sm font-normal rounded-xl focus:outline-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-xs font-normal">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  className="px-4 py-[14px] bg-[#F2F2F2] text-sm font-normal rounded-xl focus:outline-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-normal">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="youremail@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-[14px] bg-[#F2F2F2] text-sm font-normal rounded-xl focus:outline-0 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-xs font-normal">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-[14px] bg-[#F2F2F2] text-sm font-normal rounded-xl focus:outline-0 focus:ring-2 focus:ring-blue-500"
                  />
                  <span
                    onClick={togglePassword}
                    className="absolute top-5 right-4 cursor-pointer text-gray-500"
                  >
                    {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                  </span>
                </div>
              </div>

              {/* <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full h-11 bg-gray-200 text-sm text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Upload Profile Picture
              </button> */}
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-blue-500 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <hr className="border-gray-300 mb-8" />

          <div className="space-y-6">
            {/* <button
              type="button"
              className="relative w-full h-11 flex gap-2 justify-center items-center bg-zinc-800 text-white text-xs sm:text-sm font-normal rounded-lg hover:bg-gray-700 active:bg-gray-600 transition"
            >
              <Image
                src={GoogleLogo}
                alt="Google Logo"
                width={25}
                className="w-[22px] sm:w-[25px]"
              />
              Or sign up with Google
            </button> */}
            <p className="text-center text-xs font-normal">
              Already have an account?{" "}
              <Link
                href="/"
                className="text-[#007AFF] hover:underline transition"
              >
                Sign in now
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Modal Upload Profile Picture */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
            <h2 className="text-lg font-semibold mb-4">
              Upload Profile Picture
            </h2>

            <label
              htmlFor="fileInput"
              className="cursor-pointer w-full border-2 border-dashed border-gray-300 hover:border-blue-500 bg-gray-50 rounded-lg flex flex-col justify-center items-center py-6 px-4 text-center transition-all duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l3-3m-3 3l-3-3m6-7V4a2 2 0 00-2-2H8a2 2 0 00-2 2v1"
                />
              </svg>
              <p className="text-sm text-gray-600">
                Drag and Drop or{" "}
                <span className="text-blue-500 font-medium">Choose File</span>
              </p>
              <p className="text-xs mt-2 text-gray-400">
                Supported: JPG, PNG | Max: 1MB
              </p>
            </label>

            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProfilePicture(file);
                  const reader = new FileReader();
                  reader.onloadend = () =>
                    setPreviewImage(reader.result as string);
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />

            {previewImage && (
              <div className="mt-4 flex flex-col items-center">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={400}
                  height={400}
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
