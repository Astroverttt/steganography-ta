// "use client";

// import clsx from "clsx";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// import LoginImage from "@/assets/image/login_image.png";
// import GoogleLogo from "@/assets/logo/google_logo.png";

// export default function LoginPage() {
//   const router = useRouter();
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   const togglePassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const activeRememberMe = () => {
//     setRememberMe((prev) => !prev);
//   };

//   const handleNavigateToHomePage = () => {
//     router.push("/home/explore");
//   };

//   // relative flex

//   return (
//     <div className="min-h-screen relative flex flex-col 2xl:flex-row">
//       <div className="relative flex-1 min-h-[40vh] 2xl:min-h-screen">
//         <Image
//           src={LoginImage}
//           alt="F1 Racing Car"
//           fill
//           className="object-cover object-bottom"
//         />
//       </div>

//       <div className="absolute bottom-0 w-full h-3/4 px-8 pt-8 pb-24 flex items-start justify-center rounded-t-2xl sm:rounded-2xl sm:items-stretch sm:px-8 sm:py-8 sm:w-[456px] sm:h-max sm:mx-auto sm:my-auto sm:inset-0 2xl:static 2xl:rounded-none 2xl:px-8 2xl:py-0 bg-white">
//         <div className="w-full">
//           <h1 className="text-lg sm:text-xl font-semibold mb-6">
//             Nice to see you again
//           </h1>

//           <form className="mb-8">
//             <div className="space-y-6 mb-5">
//               <div className="flex flex-col gap-2">
//                 <label htmlFor="email" className="text-xs font-normal">
//                   Email
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="youremail@example.com"
//                   className="px-4 py-[14px] bg-[#F2F2F2] text-sm font-normal rounded-xl focus:outline-0 focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="flex flex-col gap-2">
//                 <label htmlFor="password" className="text-xs font-normal">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Enter password"
//                     className="w-full pl-4 pr-10 py-[14px] bg-[#F2F2F2] text-sm font-normal rounded-xl focus:outline-0 focus:ring-2 focus:ring-blue-500"
//                   />
//                   <span
//                     onClick={togglePassword}
//                     className="absolute scale-105 top-5 right-4 -translate-y-[3px] sm:scale-110 sm:-translate-y-[3.7px] cursor-pointer text-gray-500"
//                   >
//                     {showPassword ? (
//                       <IoMdEyeOff className="translate-y-[0.3px] sm:translate-y-[0.4px]" />
//                     ) : (
//                       <IoMdEye />
//                     )}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between items-center mb-8 text-xs font-normal">
//               <div
//                 onClick={activeRememberMe}
//                 className="flex gap-3 items-center cursor-pointer"
//               >
//                 <div
//                   className={clsx(
//                     "w-10 px-0.5 py-[2.4px] rounded-full transition",
//                     rememberMe ? "bg-blue-500" : "bg-[#E5E5E5]"
//                   )}
//                 >
//                   <div
//                     className={clsx(
//                       "bg-white w-4 h-4 rounded-full shadow-sm shadow-black/20 transition",
//                       rememberMe ? "translate-x-[19.5px]" : "translate-x-0"
//                     )}
//                   ></div>
//                 </div>
//                 <span>Remember me</span>
//               </div>
//               <a
//                 href="/auth/forgot-password"
//                 className="text-[#007AFF] hover:underline transition"
//               >
//                 Forgot password?
//               </a>
//             </div>

//             <button
//               type="button"
//               onClick={handleNavigateToHomePage}
//               className="w-full h-11 bg-blue-500 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-600 active:bg-blue-700 transition duration-200 ease-in-out cursor-pointer"
//             >
//               Sign In
//             </button>
//           </form>

//           <hr className="border-gray-300 mb-8" />
//           <div className="space-y-6">
//             <button
//               type="button"
//               className="relative w-full h-11 flex gap-2 justify-center items-center bg-zinc-800 text-white text-xs sm:text-sm font-normal rounded-lg hover:bg-gray-700 active:bg-gray-600 transition duration-200 ease-in-out cursor-pointer"
//             >
//               <Image
//                 src={GoogleLogo}
//                 alt="Google Logo"
//                 width={25}
//                 className="w-[22px] sm:w-[25px]"
//               />
//               Or sign in with Google
//             </button>
//             <p className="text-center text-xs font-normal">
//               Don't have an account?{" "}
//               <a
//                 href="/auth/register"
//                 className="text-[#007AFF] hover:underline transition"
//               >
//                 Sign up now
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.message || "Register failed");
        return;
      }

      router.push("/login");
    } catch (err) {
      setError("Terjadi kesalahan jaringan.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-lg w-[300px]"
      >
        <h1 className="text-2xl font-semibold text-center">Register</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded-md"
          required
        />

        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Register
        </button>

        <button
          type="button"
          onClick={() => router.push("/")}
          className="text-blue-600 hover:underline text-sm mt-2"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
