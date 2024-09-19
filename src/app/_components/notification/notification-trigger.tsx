import Image from "next/image";
import notificationIcon from "@/assets/images/icons8-notification-40.png";

export default function Notification() {
  return (
    <div className="w-11 flex justify-center items-center bg-[#E4E6EB] rounded-full hover:bg-[#d3d5da] cursor-pointer">
      <Image
        src={notificationIcon}
        alt="Notification Icon"
        width={25}
        height={25}
      />
    </div>
  );
}
