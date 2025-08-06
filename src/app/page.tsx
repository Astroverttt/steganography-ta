"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import BASE_URL from "../../config";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.detail || "Login gagal.");
        return;
      }

      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        router.push("/home/explore");
      } else {
        setErrorMsg("Token tidak ditemukan.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("Terjadi kesalahan saat login.");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col 2xl:flex-row">
      <div className="relative max-h-screen">
        <Image
          src={"/login_image.png"}
          alt="Login Image"
          width={1920}
          height={1000}
          className="fixed w-full h-screen 2xl:static 2xl:h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 flex justify-center items-start px-8 pt-8 w-full h-10/12 rounded-t-xl sm:bottom-1/2 sm:translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:w-[456px] sm:h-max sm:py-8 sm:rounded-xl 2xl:static 2xl:flex 2xl:translate-x-0 2xl:translate-y-0 2xl:items-center 2xl:h-screen 2xl:rounded-none 2xl:px-8 2xl:py-0 2xl:w-[950px] overflow-y-auto bg-white">
        <div className="w-full">
          <h1 className="text-lg sm:text-xl font-semibold mb-6">
            Nice to see you again
          </h1>

          {errorMsg && <p className="text-red-500 text-sm mb-4">{errorMsg}</p>}

          <form
            className="mb-8"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="space-y-6 mb-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-normal">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-[14px] bg-[#F2F2F2] text-sm font-normal rounded-xl focus:outline-0 focus:ring-2 focus:ring-blue-500"
                  required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-4 pr-10 py-[14px] bg-[#F2F2F2] text-sm font-normal rounded-xl focus:outline-0 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span
                    onClick={togglePassword}
                    className="absolute scale-105 top-5 right-4 -translate-y-[3px] sm:scale-110 sm:-translate-y-[3.7px] cursor-pointer text-gray-500"
                  >
                    {showPassword ? (
                      <IoMdEyeOff className="translate-y-[0.3px] sm:translate-y-[0.4px]" />
                    ) : (
                      <IoMdEye />
                    )}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-blue-500 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <hr className="border-gray-300 mb-8" />
          <div className="space-y-6">
            <p className="text-center text-xs font-normal">
              Don&apos;t have an account?{" "}
              <a
                href="/auth/register"
                className="text-[#007AFF] hover:underline transition"
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
