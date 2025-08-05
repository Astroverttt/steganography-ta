"use client";

import clsx from "clsx";
import React from "react";

interface PriceInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  visible: boolean;
}

export const PriceInput = ({ value, onChange, visible }: PriceInputProps) => {
  return (
    <div
      className={clsx(
        "relative -mt-4 transition-all duration-300",
        visible ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}
    >
      <span className="absolute top-1/2 -translate-y-1/2 left-3 font-semibold text-base text-black">
        Rp
      </span>
      <input
        type="number"
        name="price"
        value={value}
        onChange={onChange}
        placeholder="150000"
        className="pl-10 pr-3 py-2 w-full border border-gray-300 placeholder:text-gray-400 focus:outline-0 focus:ring-1 focus:ring-black rounded-lg"
      />
    </div>
  );
};
