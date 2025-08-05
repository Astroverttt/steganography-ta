import Image from "next/image";

export default function ProfileCard({
  data,
  variant = "top",
  className,
}: {
  data: {
    photoProfile: string;
    username: string;
  };
  variant?: "top" | "bottom";
  className?: string;
}) {
  return (
    <div
      className={`flex items-center ${
        variant === "bottom" ? "flex-col items-center space-y-2" : "space-x-3"
      } ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
        <Image
          src={data.photoProfile}
          alt={data.username}
          width={40}
          height={40}
          className="object-cover w-full h-full"
        />
      </div>
      <span className="text-gray-900 font-medium">{data.username}</span>
    </div>
  );
}
