import React from "react";
import clsx from "clsx";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonClassName?: string;
  useDefaultStyle?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  buttonClassName = "",
  useDefaultStyle = true,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        useDefaultStyle &&
          "px-4 py-1.5 xl:px-6 xl:py-2 border rounded-lg cursor-pointer",
        buttonClassName
      )}
    >
      {text}
    </button>
  );
};
