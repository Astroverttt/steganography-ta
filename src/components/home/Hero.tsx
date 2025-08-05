import { FiSearch } from "react-icons/fi";

const Hero = () => {
  return (
    <div className="flex flex-col items-center space-y-2 xl:space-y-4 px-4 pt-18 xl:px-8 xl:pt-24">
      <h1 className="text-[25px] xl:text-[40px] font-medium text-center">
        Showcase Your Digital Art
      </h1>
      <p className="text-sm xl:text-xl font-normal text-[#979797]">
        Join the community of creative digital artists
      </p>
      <div className="flex justify-center w-full mt-3">
        <div className="relative w-full sm:w-max xl:w-max">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="w-full pl-3 pr-16 py-2 text-sm sm:w-lg xl:w-3xl xl:pl-4 xl:pr-16 xl:py-4 xl:text-base border focus:border-[1.5px] xl:border-2 xl:focus:border-2 border-black/40 rounded-xl xl:rounded-full focus:outline-0 focus:border-black"
          />
          <button
            type="button"
            className="absolute flex w-7 h-7 xl:w-12 xl:h-12 top-1/2 -translate-y-1/2 right-1.5 bg-blue-500 rounded-full hover:bg-blue-600 active:bg-blue-700 cursor-pointer"
          >
            <FiSearch className="scale-100 xl:scale-150 mx-auto my-auto text-white font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
