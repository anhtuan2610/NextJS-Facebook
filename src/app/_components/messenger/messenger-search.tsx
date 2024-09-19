import Image from "next/image";
import searchIcon from "@/assets/images/icons8-search-40.png";

type Props = {
  searchString: string | undefined;
  setSearchString: (value: string) => void;
};

export default function SearchMessenger({
  searchString,
  setSearchString,
}: Props) {
  return (
    <div className="relative">
      <input
        className="w-full bg-[#F0F2F5] px-3 py-2 rounded-2xl"
        type="text"
        placeholder="Search messenger by name"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Image
        className="absolute right-4 top-1/2 transform -translate-y-1/2"
        width={25}
        src={searchIcon}
        alt="search icon"
      />
    </div>
  );
}
