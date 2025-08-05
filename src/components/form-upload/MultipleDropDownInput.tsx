"use client";

import clsx from "clsx";
import React, { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

interface MultipleDropDownInputProps<T extends { id: number | string }> {
  label: string;
  placeholder?: string;
  options: T[];
  selected: T[];
  onSelect: (value: T[]) => void;
  getItem: (item: T) => string;
}

export const MultipleDropDownInput = <T extends { id: number | string }>({
  label,
  placeholder = "",
  options,
  selected,
  onSelect,
  getItem,
}: MultipleDropDownInputProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: T) => {
    const isAlreadySelected = selected.find((item) => item.id === value.id);
    if (isAlreadySelected) return;

    onSelect([...selected, value]);
  };

  const handleRemove = (id: T["id"]) => {
    onSelect(selected.filter((item) => item.id !== id));
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
        className="relative flex flex-wrap items-center gap-2 px-3 py-1 border border-gray-300 rounded-lg cursor-pointer"
      >
        {selected.length === 0 ? (
          <div className="py-1">
            <span className="font-normal text-sm xl:text-base text-gray-400">
              {placeholder}
            </span>
          </div>
        ) : (
          selected.map((item) => (
            <div
              key={item.id}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 bg-gray-100 px-2 py-1 my-0.5 xl:my-0 rounded-md cursor-default"
            >
              <span className="font-normal text-sm xl:text-base text-black">
                {getItem(item)}
              </span>
              <IoClose
                onClick={() => handleRemove(item.id)}
                className="scale-110 text-red-500 cursor-pointer"
              />
            </div>
          ))
        )}
        <FaAngleDown
          className={clsx(
            "absolute top-3 right-3 transition-transform duration-200 cursor-pointer",
            isOpen ? "rotate-180" : "rotate-0"
          )}
        />
      </div>
      <div
        className={clsx(
          "absolute top-full mt-1 inset-x-0 bg-white border border-gray-300 rounded-lg shadow transition-all duration-300 overflow-y-auto z-10",
          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {options.map((option) => {
          const isSelected = selected.some((item) => item.id === option.id);
          return (
            <div
              key={option.id}
              onClick={() => !isSelected && handleSelect(option)}
              className={clsx(
                "px-4 py-2 text-xs xl:text-sm transition",
                isSelected
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "hover:bg-gray-100 cursor-pointer"
              )}
            >
              {getItem(option)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
