"use client";

import { useRouter } from "next/navigation";

const ForgotPasswordPage = () => {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-3xl font-medium">This Is Forgot Password Page</h1>
        <button
          type="button"
          onClick={handleNavigateToLogin}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 trasnsition duration-200 ease-in-out cursor-pointer"
        >
          Back to Login Page
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
