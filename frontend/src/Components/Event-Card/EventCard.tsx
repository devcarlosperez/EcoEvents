import { useNavigate } from "react-router-dom"
import iconLocation from "../../assets/Img/icon-input-location.svg"
import iconDate from "../../assets/Img/icon-input-date.svg"

function resolveImageUrl(image_url?: string): string {
  if (!image_url) return ''
  if (image_url.startsWith('http://') || image_url.startsWith('https://')) return image_url
  return `http://localhost:8000/images/${image_url}`
}

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
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/events/${id}`)}
      className={`flex flex-col w-full max-w-[354px] rounded-[45px] bg-white/60 p-8 transition-all cursor-pointer hover:shadow-md ${
        isJoined ? "border-2 border-[#2e7d32]" : "border border-[#dadce0]"
      }`}
    >
      <h3 className="font-roboto font-medium text-xl text-neutral-01">
        {name}
      </h3>

      <img
        src={resolveImageUrl(image_url)}
        alt={name}
        className="w-full h-[126px] object-cover rounded-[15px] mt-4"
      />

      <div className="flex items-center justify-between w-full mt-4 text-base text-neutral-01 font-roboto">
        <div className="flex items-center gap-1.5">
          <img src={iconLocation} alt="location" className="w-4 h-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <img src={iconDate} alt="date" className="w-4 h-4" />
          <span>{event_date}</span>
        </div>
      </div>

      <p className="font-roboto text-base text-neutral-01 leading-snug text-justify mt-4 line-clamp-3">
        {description}
      </p>

      <div className="flex justify-end mt-4">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleJoin?.(id) }}
          className={`w-[121px] h-[42px] flex items-center justify-center rounded-[13px] font-poppins font-medium text-xl cursor-pointer transition-colors ${
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