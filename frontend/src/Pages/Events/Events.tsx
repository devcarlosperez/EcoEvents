import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Components/Context/AuthContext'
import { EventCard } from '../../Components/Event-Card/EventCard'
import { getAllEvents } from '../../Services/EventService'
import {
  createEventParticipant,
  deleteEventParticipant,
  getAllEventParticipants,
} from '../../Services/EventParticipantService'
import { formatDate } from '../../Utils/formatDate'
import { Title } from '../../Components/Title/title'

export const Events: React.FC = () => {
  const { userData } = useContext(AuthContext)
  const [events, setEvents] = useState<any[]>([])
  const [joinedMap, setJoinedMap] = useState<Record<number, number>>({}) // eventId -> participantId
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userData) return
    const fetchData = async () => {
      try {
        setLoading(true)
        const [allEvents, allParticipants] = await Promise.all([
          getAllEvents(),
          getAllEventParticipants(),
        ])
        setEvents(allEvents.filter((e: any) => e.status === 'approved'))
        const userParticipations: Record<number, number> = {}
        allParticipants
          .filter((p: any) => p.user_id === userData.id)
          .forEach((p: any) => {
            userParticipations[p.event_id] = p.id
          })
        setJoinedMap(userParticipations)
      } catch (err) {
        console.error('Error loading events:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [userData])

  const handleToggleJoin = async (eventId: number) => {
    if (!userData) return

    const participantId = joinedMap[eventId]

    if (participantId) {
      // Leave event
      try {
        await deleteEventParticipant(participantId)
        setJoinedMap((prev) => {
          const updated = { ...prev }
          delete updated[eventId]
          return updated
        })
      } catch (err) {
        console.error('Error leaving event:', err)
      }
    } else {
      // Join event
      try {
        const participant = await createEventParticipant({ event_id: eventId })
        setJoinedMap((prev) => ({ ...prev, [eventId]: participant.id }))
      } catch (err) {
        console.error('Error joining event:', err)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(175deg,#C0DDC2_0.09%,#E8F5E9_50%,#C0DDC2_99.91%)] flex flex-col items-center px-8">
        <Title text="Events" />
        <p className="font-roboto text-lg text-neutral-500 mt-8">Loading events...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(175deg,#C0DDC2_0.09%,#E8F5E9_50%,#C0DDC2_99.91%)] flex flex-col items-center px-8">
      <Title text="Events" />
      {events.length === 0 ? (
        <p className="font-roboto text-lg text-neutral-500 mt-8">No events available.</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center w-full max-w-[1200px]">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              name={event.name}
              description={event.description}
              location={event.location}
              event_date={formatDate(event.event_date)}
              image_url={event.image_url}
              isJoined={!!joinedMap[event.id]}
              onToggleJoin={handleToggleJoin}
            />
          ))}
        </div>
      )}
    </div>
  )
}
