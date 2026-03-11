import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Event.module.scss';
import { EventDetails } from '../../Components/EventDetails/EventDetails';
import { getEventById } from '../../Services/EventService';
import { getAllComments } from '../../Services/CommentService';
import { getAllEventParticipants } from '../../Services/EventParticipantService';

export const Event: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<any>(null);
    const [comments, setComments] = useState<any[]>([]);
    const [participantsCount, setParticipantsCount] = useState<number>(0);
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

            } catch (error) {
                console.error("Error fetching event details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div className={styles.eventPage}><h1 className={styles.title}>Loading Event...</h1></div>;
    }

    if (!event) {
        return <div className={styles.eventPage}><h1 className={styles.title}>Event not found</h1></div>;
    }

    return (
        <div className={styles.eventPage}>
            <h1 className={styles.title}>Event</h1>
            <EventDetails 
                event={event} 
                comments={comments} 
                participantsCount={participantsCount} 
            />
        </div>
    );
};
