import Image from "next/image";
import { MdFavoriteBorder } from "react-icons/md";
import Artwork1 from "@/assets/image/artwork1.png";
import Artwork2 from "@/assets/image/artwork2.png";
import Artwork3 from "@/assets/image/artwork3.png";
import Artwork4 from "@/assets/image/artwork4.png";

interface ArtworkDisplayProps {
  onClick: () => void;
}

const ArtworkDisplay = ({ onClick }: ArtworkDisplayProps) => {
  return (
    <div className="px-4 pt-5 lg:px-8 xl:px-8 xl:pt-9">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 lg:gap-6 xl:gap-11">
        <div onClick={onClick} className="space-y-3">
          <article className="relative h-28 sm:h-[125px] md:h-28 lg:h-[140px] xl:h-48 2xl:h-54 rounded-lg overflow-hidden cursor-pointer">
            <Image src={Artwork1} alt="Artwork 1" fill className="absolute" />
            <div className="absolute w-full h-full bg-transparent rounded-lg hover:bg-black/30 transition"></div>
          </article>
          <div className="flex justify-between">
            <div className="space-y-1 xl:space-y-2">
              <h2 className="text-sm xl:text-xl font-semibold">
                Artwork Title
              </h2>
              <p className="text-gray-500 text-xs xl:text-base font-normal">
                by @username
              </p>
            </div>
            <div className="flex gap-1 xl:gap-2 h-max items-center">
              <MdFavoriteBorder className="text-sm xl:text-lg" />
              <span className="text-xs xl:text-base font-medium">245</span>
            </div>
          </div>
        </div>
        <div onClick={onClick} className="space-y-3">
          <article className="relative h-28 sm:h-[125px] md:h-28 lg:h-[140px] xl:h-48 2xl:h-54 rounded-lg overflow-hidden cursor-pointer">
            <Image src={Artwork2} alt="Artwork 2" fill className="absolute" />
            <div className="absolute w-full h-full bg-transparent rounded-lg hover:bg-black/30 transition"></div>
          </article>
          <div className="flex justify-between">
            <div className="space-y-1 xl:space-y-2">
              <h2 className="text-sm xl:text-xl font-semibold">
                Artwork Title
              </h2>
              <p className="text-gray-500 text-xs xl:text-base font-normal">
                by @username
              </p>
            </div>
            <div className="flex gap-1 xl:gap-2 h-max items-center">
              <MdFavoriteBorder className="text-sm xl:text-lg" />
              <span className="text-xs xl:text-base font-medium">245</span>
            </div>
          </div>
        </div>
        <div onClick={onClick} className="space-y-3">
          <article className="relative h-28 sm:h-[125px] md:h-28 lg:h-[140px] xl:h-48 2xl:h-54 rounded-lg overflow-hidden cursor-pointer">
            <Image src={Artwork3} alt="Artwork 3" fill className="absolute" />
            <div className="absolute w-full h-full bg-transparent rounded-lg hover:bg-black/30 transition"></div>
          </article>
          <div className="flex justify-between">
            <div className="space-y-1 xl:space-y-2">
              <h2 className="text-sm xl:text-xl font-semibold">
                Artwork Title
              </h2>
              <p className="text-gray-500 text-xs xl:text-base font-normal">
                by @username
              </p>
            </div>
            <div className="flex gap-1 xl:gap-2 h-max items-center">
              <MdFavoriteBorder className="text-sm xl:text-lg" />
              <span className="text-xs xl:text-base font-medium">245</span>
            </div>
          </div>
        </div>
        <div onClick={onClick} className="space-y-3">
          <article className="relative h-28 sm:h-[125px] md:h-28 lg:h-[140px] xl:h-48 2xl:h-54 rounded-lg overflow-hidden cursor-pointer">
            <Image src={Artwork4} alt="Artwork 4" fill className="absolute" />
            <div className="absolute w-full h-full bg-transparent rounded-lg hover:bg-black/30 transition"></div>
          </article>
          <div className="flex justify-between">
            <div className="space-y-1 xl:space-y-2">
              <h2 className="text-sm xl:text-xl font-semibold">
                Artwork Title
              </h2>
              <p className="text-gray-500 text-xs xl:text-base font-normal">
                by @username
              </p>
            </div>
            <div className="flex gap-1 xl:gap-2 h-max items-center">
              <MdFavoriteBorder className="text-sm xl:text-lg" />
              <span className="text-xs xl:text-base font-medium">245</span>
            </div>
          </div>
        </div>
        <div onClick={onClick} className="space-y-3">
          <article className="relative h-28 sm:h-[125px] md:h-28 lg:h-[140px] xl:h-48 2xl:h-54 rounded-lg overflow-hidden cursor-pointer">
            <Image src={Artwork1} alt="Artwork 1" fill className="absolute" />
            <div className="absolute w-full h-full bg-transparent rounded-lg hover:bg-black/30 transition"></div>
          </article>
          <div className="flex justify-between">
            <div className="space-y-1 xl:space-y-2">
              <h2 className="text-sm xl:text-xl font-semibold">
                Artwork Title
              </h2>
              <p className="text-gray-500 text-xs xl:text-base font-normal">
                by @username
              </p>
            </div>
            <div className="flex gap-1 xl:gap-2 h-max items-center">
              <MdFavoriteBorder className="text-sm xl:text-lg" />
              <span className="text-xs xl:text-base font-medium">245</span>
            </div>
          </div>
        </div>
        <div onClick={onClick} className="space-y-3">
          <article className="relative h-28 sm:h-[125px] md:h-28 lg:h-[140px] xl:h-48 2xl:h-54 rounded-lg overflow-hidden cursor-pointer">
            <Image src={Artwork2} alt="Artwork 2" fill className="absolute" />
            <div className="absolute w-full h-full bg-transparent rounded-lg hover:bg-black/30 transition"></div>
          </article>
          <div className="flex justify-between">
            <div className="space-y-1 xl:space-y-2">
              <h2 className="text-sm xl:text-xl font-semibold">
                Artwork Title
              </h2>
              <p className="text-gray-500 text-xs xl:text-base font-normal">
                by @username
              </p>
            </div>
            <div className="flex gap-1 xl:gap-2 h-max items-center">
              <MdFavoriteBorder className="text-sm xl:text-lg" />
              <span className="text-xs xl:text-base font-medium">245</span>
            </div>
          </div>
        </div>
        <div onClick={onClick} className="space-y-3">
          <article className="relative h-28 sm:h-[125px] md:h-28 lg:h-[140px] xl:h-48 2xl:h-54 rounded-lg overflow-hidden cursor-pointer">
            <Image src={Artwork3} alt="Artwork 3" fill className="absolute" />
            <div className="absolute w-full h-full bg-transparent rounded-lg hover:bg-black/30 transition"></div>
          </article>
          <div className="flex justify-between">
            <div className="space-y-1 xl:space-y-2">
              <h2 className="text-sm xl:text-xl font-semibold">
                Artwork Title
              </h2>
              <p className="text-gray-500 text-xs xl:text-base font-normal">
                by @username
              </p>
            </div>
            <div className="flex gap-1 xl:gap-2 h-max items-center">
              <MdFavoriteBorder className="text-sm xl:text-lg" />
              <span className="text-xs xl:text-base font-medium">245</span>
            </div>
          </div>
        </div>
        <div onClick={onClick} className="space-y-3">
          <article className="relative h-28 sm:h-[125px] md:h-28 lg:h-[140px] xl:h-48 2xl:h-54 rounded-lg overflow-hidden cursor-pointer">
            <Image src={Artwork4} alt="Artwork 4" fill className="absolute" />
            <div className="absolute w-full h-full bg-transparent rounded-lg hover:bg-black/30 transition"></div>
          </article>
          <div className="flex justify-between">
            <div className="space-y-1 xl:space-y-2">
              <h2 className="text-sm xl:text-xl font-semibold">
                Artwork Title
              </h2>
              <p className="text-gray-500 text-xs xl:text-base font-normal">
                by @username
              </p>
            </div>
            <div className="flex gap-1 xl:gap-2 h-max items-center">
              <MdFavoriteBorder className="text-sm xl:text-lg" />
              <span className="text-xs xl:text-base font-medium">245</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDisplay;
