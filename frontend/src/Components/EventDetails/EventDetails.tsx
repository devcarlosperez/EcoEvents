import React, { useState } from 'react';
import styles from './EventDetails.module.scss';
import { createComment } from '../../Services/CommentService';
import iconDate from '../../assets/Img/icon-input-date.svg';
import iconTime from '../../assets/Img/icon-input-time.svg';
import iconLocation from '../../assets/Img/icon-input-location.svg';
import iconCapacity from '../../assets/Img/icon-input-capacity-1.svg';

const dummyImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop';

interface EventDetailsProps {
    event: any;
    comments: any[];
    participantsCount: number;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event, comments, participantsCount }) => {
    const defaultImage = event.image_url ? `http://localhost:3000/images/${event.image_url}` : dummyImage;
    const [commentText, setCommentText] = useState("");
    const [localComments, setLocalComments] = useState(comments);

    const handleCommentSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && commentText.trim() !== '') {
            try {
                const newComment = {
                    event_id: event.id,
                    comment: commentText.trim()
                };
                const created = await createComment(newComment);

                // Try to get user info from localStorage to display instantly
                let authorName = "You";
                let authorSurname = "";
                const userData = localStorage.getItem("userData");
                if (userData) {
                    try {
                        const parsed = JSON.parse(userData);
                        if (parsed.user?.name) {
                            authorName = parsed.user.name;
                            authorSurname = parsed.user.surname || "";
                        }
                    } catch (e) {}
                }

                const newCommentWithAuthor = {
                    ...created,
                    author: { name: authorName, surname: authorSurname }
                };

                setLocalComments([...localComments, newCommentWithAuthor]);
                setCommentText("");
            } catch (error) {
                console.error("Failed to post comment:", error);
            }
        }
    };

    return (
        <div className={styles.cardContainer}>
            <h2>{event.name}</h2>
            <img src={defaultImage} alt={event.name} className={styles.eventImage} />

            <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                    <img src={iconDate} alt="date" />
                    <span>{event.event_date}</span>
                </div>
                <div className={styles.detailItem}>
                    <img src={iconTime} alt="time" />
                    <span>{event.event_time}</span>
                </div>
                <div className={styles.detailItem}>
                    <img src={iconLocation} alt="location" />
                    <span>{event.location}</span>
                </div>
                <div className={styles.detailItem}>
                    <img src={iconCapacity} alt="participants" />
                    <span>{participantsCount} participants</span>
                </div>
            </div>

            <p className={styles.description}>{event.description}</p>

            <button className={styles.joinButton}>Join</button>

            <div className={styles.commentsSection}>
                <h3>Comments ({localComments.length})</h3>
                <input 
                    type="text" 
                    placeholder="Write a comment... (Press Enter to post)" 
                    className={styles.commentInput} 
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={handleCommentSubmit}
                />
                <div className={styles.commentList}>
                    {localComments.map((comment, index) => (
                        <div key={index} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <div className={styles.avatar}></div>
                                <div className={styles.author}>
                                    {comment.author ? `${comment.author.name} ${comment.author.surname || ''}`.trim() : 'User'}
                                </div>
                            </div>
                            <div className={styles.text}>{comment.comment}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
