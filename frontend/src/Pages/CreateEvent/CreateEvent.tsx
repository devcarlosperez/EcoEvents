import { useRef, useState } from "react"
import { Submit } from "../../Components/Submit/submit"
import { createEvent } from "../../Services/EventService"
import { useNavigate } from "react-router-dom"
import iconDate from "../../assets/Img/icon-input-date.svg"
import iconTime from "../../assets/Img/icon-input-time.svg"
import iconLocation from "../../assets/Img/icon-input-location.svg"
import iconCapacity from "../../assets/Img/icon-input-capacity-1.svg"
import iconUpload from "../../assets/Img/icon-input-upload-photo.svg"
import iconEventType from "../../assets/Img/icon-input-event-type.svg"
import bg from "../../assets/Img/background-create-event.png"
import { Title } from "../../Components/Title/title"

const eventTypeOptions = [
  { value: "", label: "Select Event Type" },
  { value: "cleaning", label: "Cleaning" },
  { value: "planting", label: "Planting" },
  { value: "awareness", label: "Awareness" },
]

const labelStyle = "font-roboto text-[16px] text-neutral-01"
const fieldStyle = "flex items-center gap-2.5 p-3 bg-field-bg rounded-[13px] border border-neutral-01"
const inputStyle = "font-roboto text-[16px] text-neutral-01 bg-transparent border-none outline-none w-full placeholder:text-neutral-02"

export function CreateEvent() {
  const [eventName, setEventName] = useState("")
  const [eventType, setEventType] = useState("")
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
    today.getDate()
  ).padStart(2, '0')}`
  const [date, setDate] = useState(todayStr)
  const [time, setTime] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [capacity, setCapacity] = useState("")
  const [photoName, setPhotoName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleClearPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    setPhotoName("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', eventName)
    formData.append('event_type', eventType)
    formData.append('event_date', date)
    formData.append('event_time', time)
    formData.append('location', location)
    formData.append('description', description)
    formData.append('max_participants', capacity)
    if (fileInputRef.current?.files?.[0]) {
      formData.append('image', fileInputRef.current.files[0])
    }

    try {
      await createEvent(formData)
      navigate('/about')
    } catch (err) {
      console.error(err)
      setError('Something went wrong - try again')
    }
  }
  
  return (
    <div className="relative flex flex-col items-center bg-[linear-gradient(175deg,#C0DDC2_0.09%,#E8F5E9_50%,#C0DDC2_99.91%)]">
      <img src={bg} alt="bg" className="absolute bottom-0 right-0 object-cover pointer-events-none" style={{ width: 766, height: 729 }} />
      <Title text="Create Event" />
      <form
        onSubmit={handleSubmit}
        className="z-20 flex flex-col bg-white/60 rounded-[45px] border border-form-border backdrop-blur-sm"
        style={{ width: 354, padding: "24px 26px", marginBottom: 74 }}
      >
        <div className="flex flex-col h-full" style={{ gap: 14 }}>

          <div className="flex flex-col gap-1">
            <span className={labelStyle}>Event Name</span>
            <div className={fieldStyle}>
              <input type="text" name="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Enter Event Name" className={inputStyle} required />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className={labelStyle}>Event Type</span>
            <div className={`${fieldStyle} relative`}>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)} className={`${inputStyle} appearance-none cursor-pointer pr-8`} style={{ color: eventType ? "#1f1f1f" : "#5f6368" }} required>
                {eventTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <img src={iconEventType} alt="" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className={labelStyle}>Date</span>
            <div className={fieldStyle}>
              <img src={iconDate} alt="" className="w-5 h-5" />
              <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Select Date" className={`${inputStyle}`} style={{ color: date ? "#1f1f1f" : "#5f6368" }} required />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className={labelStyle}>Time</span>
            <div className={fieldStyle}>
              <img src={iconTime} alt="" className="w-5 h-5" />
              <input type="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Select Time" className={`${inputStyle}`} style={{ color: time ? "#1f1f1f" : "#5f6368" }} required />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className={labelStyle}>Location</span>
            <div className={fieldStyle}>
              <img src={iconLocation} alt="" className="w-5 h-5" />
              <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter Location Name" className={inputStyle} required />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className={labelStyle}>Description</span>
            <div className={fieldStyle}>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder={"Describe your Event (purpose,\nactivities, etc.)"} rows={3} className={`${inputStyle} resize-none`} required />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className={labelStyle}>Capacity</span>
            <div className={fieldStyle}>
              <img src={iconCapacity} alt="" className="w-5 h-5" />
              <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Enter number of participants" className={`${inputStyle}`} style={{ color: capacity ? "#1f1f1f" : "#5f6368" }} min="1" required />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className={labelStyle}>Upload Photo</span>
            <div className={`${fieldStyle} justify-between cursor-pointer`} onClick={() => fileInputRef.current?.click()}>
              <span className="font-roboto text-[16px] text-neutral-02 truncate flex-1">{photoName || "Add Photo"}</span>
              {photoName ? (
                <button
                  type="button"
                  onClick={handleClearPhoto}
                  className="ml-2 text-neutral-400 hover:text-red-500 transition-colors text-lg leading-none"
                  title="Remove photo"
                >✕</button>
              ) : (
                <img src={iconUpload} alt="" className="w-5 h-5" />
              )}
              <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setPhotoName(file.name) }} className="hidden" />
            </div>
          </div>

          <div className="mt-[18px] flex flex-col items-center gap-3">
            {error && <b className="text-red-600 text-sm">{error}</b>}
            <Submit
              value="Create"
              className="w-full py-2 bg-btn-create rounded-[13px] cursor-pointer hover:bg-btn-create-hover transition-colors font-poppins font-medium text-[24px] text-neutral-01 text-center"
            />
          </div>
        </div>
      </form>
    </div>
  )
}
