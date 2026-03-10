import iconLocation from "../../assets/Img/icon-input-location.svg"
import iconDate from "../../assets/Img/icon-input-date.svg"

interface EventCardProps {
  id: number
  name: string
  description: string
  location: string
  event_date: string
  image_url?: string
  isJoined?: boolean
  onToggleJoin?: (id: number) => void
}

export function EventCard({
  id,
  name,
  description,
  location,
  event_date,
  image_url,
  isJoined = false,
  onToggleJoin,
}: EventCardProps) {
  return (
    <div
      className={`flex flex-col w-[354px] h-[416px] rounded-[45px] bg-white/60 transition-all ${
        isJoined ? "border-2 border-solid border-[#2e7d32]" : "border border-[#dadce0]"
      }`}
      style={{ padding: "32px 32px" }}
    >
      <h3 className="font-roboto font-medium text-[20px] text-neutral-01">
        {name}
      </h3>

      <img
        src={image_url}
        alt={name}
        className="mx-auto w-[290px] h-[126px] object-cover rounded-[15px] mt-[16px]"
      />

      <div className="flex items-center justify-between w-full mt-[16px] text-[16px] text-neutral-01 font-roboto">
        <div className="flex items-center gap-1.5">
          <img src={iconLocation} alt="location" className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <img src={iconDate} alt="date" className="w-4 h-4" />
          <span>{event_date}</span>
        </div>
      </div>

      <p className="font-roboto text-[16px] text-neutral-01 leading-snug text-justify w-full mt-[18px]">
        {description}
      </p>

      <div className="flex justify-end mt-auto pt-[16px]">
        <button
          onClick={() => onToggleJoin?.(id)}
          className={`w-[121px] h-[42px] flex items-center justify-center rounded-[13px] font-poppins font-medium text-[20px] cursor-pointer transition-colors ${
            isJoined
              ? "bg-[#b3d4f0] text-neutral-01 hover:bg-[#9bc4e6]"
              : "bg-[#6eb1ec] text-neutral-01 hover:bg-[#5aa0db]"
          }`}
        >
          {isJoined ? "Leave" : "Join"}
        </button>
      </div>
    </div>
  )
}