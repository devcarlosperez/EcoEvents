import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Event.module.scss';
import { EventDetails } from '../../Components/EventDetails/EventDetails';
import { getEventById } from '../../Services/EventService';
import { getAllComments } from '../../Services/CommentService';
import { getAllEventParticipants, createEventParticipant, deleteEventParticipant } from '../../Services/EventParticipantService';
import { AuthContext } from '../../Components/Context/AuthContext';
import { Title } from '../../Components/Title/title';

export const Event: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { userData } = useContext(AuthContext);
    const [event, setEvent] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [participantsCount, setParticipantsCount] = useState<number>(0);
    const [joinedParticipantId, setJoinedParticipantId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) return;
        
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchedEvent = await getEventById(id);
                setEvent(fetchedEvent);

                // Fetch comments and filter by event
                const allComments = await getAllComments();
                const eventComments = allComments.filter((c: any) => c.event_id === Number(id));
                setComments(eventComments);

                // Fetch participants and filter by event
                const allParticipants = await getAllEventParticipants();
                const eventParticipants = allParticipants.filter((p: any) => p.event_id === Number(id));
                setParticipantsCount(eventParticipants.length);

                // Check if current user is already joined
                if (userData) {
                    const mine = eventParticipants.find((p: any) => p.user_id === userData.id);
                    setJoinedParticipantId(mine ? mine.id : null);
                }
            } catch (error) {
                console.error("Error fetching event details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, userData]);

    const handleToggleJoin = async () => {
        if (!userData || !id) return;
        if (joinedParticipantId) {
            try {
                await deleteEventParticipant(joinedParticipantId);
                setJoinedParticipantId(null);
                setParticipantsCount((c) => c - 1);
            } catch (err) {
                console.error('Error leaving event:', err);
            }
        } else {
            try {
                const participant = await createEventParticipant({ event_id: Number(id) });
                setJoinedParticipantId(participant.id);
                setParticipantsCount((c) => c + 1);
            } catch (err) {
                console.error('Error joining event:', err);
            }
        }
    };

    if (loading) {
        return <div className={styles.eventPage}><Title text="Loading Event..." /></div>;
    }

    if (!event) {
        return <div className={styles.eventPage}><Title text="Event not found" /></div>;
    }

    return (
        <div className={styles.eventPage}>
            <Title text="Event" />
            <EventDetails 
                event={event} 
                comments={comments} 
                participantsCount={participantsCount}
                isJoined={!!joinedParticipantId}
                onToggleJoin={handleToggleJoin}
            />
        </div>
    );
};
