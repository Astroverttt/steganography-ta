"use client";

import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";

interface SingleDropDownInputProps<T extends { id: number | string }> {
  label: string;
  placeholder?: string;
  options: T[];
  selected: T | null;
  onSelect: (value: T) => void;
  getItem: (item: T) => string;
}

export const SingleDropDownInput = <T extends { id: number | string }>({
  label,
  placeholder = "",
  options,
  selected,
  onSelect,
  getItem,
}: SingleDropDownInputProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: T) => {
    onSelect(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative flex flex-col gap-2">
      <label
        onClick={() => setIsOpen(!isOpen)}
        className="w-max text-sm xl:text-base font-normal"
      >
        {label}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative px-3 py-2 border border-gray-300 rounded-lg cursor-pointer"
      >
        <span
          className={clsx(
            "text-sm xl:text-base",
            selected ? "text-black" : "text-gray-400"
          )}
        >
          {selected ? getItem(selected) : placeholder}
        </span>
        <FaAngleDown
          className={clsx(
            "absolute top-3 right-3 transition-transform duration-200 cursor-pointer",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </div>
      <div
        className={clsx(
          "absolute top-full mt-1 inset-x-0 bg-white border border-gray-300 rounded-lg shadow transition-all duration-300 overflow-hidden z-10",
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => handleSelect(option)}
            className="px-4 py-2 text-xs xl:text-sm hover:bg-gray-100 transition cursor-pointer"
          >
            {getItem(option)}
          </div>
        ))}
      </div>
    </div>
  );
};
