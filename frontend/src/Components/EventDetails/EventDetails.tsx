import React, { useState } from 'react';
import styles from './EventDetails.module.scss';
import { createComment } from '../../Services/CommentService';

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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{event.event_date}</span>
                </div>
                <div className={styles.detailItem}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{event.event_time}</span>
                </div>
                <div className={styles.detailItem}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{event.location}</span>
                </div>
                <div className={styles.detailItem}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
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
