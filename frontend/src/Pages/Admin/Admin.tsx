import { useEffect, useState } from "react"
import { AdminEventCard } from "../../Components/AdminEventCard/AdminEventCard"
import { getAllEvents, updateEventStatus, deleteEvent } from "../../Services/EventService"
import { getUserById } from "../../Services/UserService"
import { formatDate } from "../../Utils/formatDate"

function resolveImageUrl(image_url?: string | null): string | undefined {
  if (!image_url) return undefined
  if (image_url.startsWith('http://') || image_url.startsWith('https://')) return image_url
  return `http://localhost:8000/images/${image_url}`
}

interface EventData {
  id: number
  name: string
  description: string
  event_type: string
  event_date: string
  event_time: string
  location: string
  image_url: string | null
  max_participants: number
  status: string
  creator_id: number
}

interface OrganizerInfo {
  name: string
  email: string
}

export function Admin() {
  const [events, setEvents] = useState<EventData[]>([])
  const [organizers, setOrganizers] = useState<Record<number, OrganizerInfo>>({})

  useEffect(() => {
    loadPendingEvents()
  }, [])

  async function loadPendingEvents() {
    try {
      const allEvents: EventData[] = await getAllEvents()
      const pending = allEvents.filter((e) => e.status === "pending")
      setEvents(pending)

      const orgMap: Record<number, OrganizerInfo> = {}
      for (const ev of pending) {
        if (!orgMap[ev.creator_id]) {
          try {
            const user = await getUserById(ev.creator_id)
            orgMap[ev.creator_id] = { name: user.name, email: user.email }
          } catch {
            orgMap[ev.creator_id] = { name: "Unknown", email: "Unknown" }
          }
        }
      }
      setOrganizers(orgMap)
    } catch (err) {
      console.error("Error loading events:", err)
    }
  }

  async function handleApprove(id: number) {
    try {
      await updateEventStatus(id, "approved")
      setEvents((prev) => prev.filter((e) => e.id !== id))
    } catch (err) {
      console.error("Error approving event:", err)
    }
  }

  async function handleDecline(id: number) {
    try {
      await deleteEvent(id)
      setEvents((prev) => prev.filter((e) => e.id !== id))
    } catch (err) {
      console.error("Error declining event:", err)
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(175deg,#C0DDC2_0.09%,#E8F5E9_50%,#C0DDC2_99.91%)]">
      <h1
        className="font-poppins font-medium text-[40px] text-neutral-01 text-center"
        style={{ paddingTop: 48, paddingBottom: 48 }}
      >
        Event Request
      </h1>

      <div className="flex flex-wrap justify-center gap-8 px-6 pb-16">
        {events.length === 0 && (
          <p className="text-neutral-02 text-lg">No pending events.</p>
        )}
        {events.map((ev) => {
          const org = organizers[ev.creator_id]
          return (
            <AdminEventCard
              key={ev.id}
              eventName={ev.name}
              image={resolveImageUrl(ev.image_url)}
              date={formatDate(ev.event_date)}
              time={ev.event_time}
              location={ev.location}
              participants={ev.max_participants}
              organizerName={org?.name}
              organizerEmail={org?.email}
              description={ev.description}
              onApprove={() => handleApprove(ev.id)}
              onDecline={() => handleDecline(ev.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
