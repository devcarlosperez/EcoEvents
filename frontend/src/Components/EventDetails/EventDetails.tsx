import React, { useContext, useState } from 'react';
import styles from './EventDetails.module.scss';
import { createComment, updateComment, deleteComment } from '../../Services/CommentService';
import iconDate from '../../assets/Img/icon-input-date.svg';
import iconTime from '../../assets/Img/icon-input-time.svg';
import iconLocation from '../../assets/Img/icon-input-location.svg';
import iconCapacity from '../../assets/Img/icon-input-capacity-1.svg';
import { formatDate } from '../../Utils/formatDate';
import { AuthContext } from '../Context/AuthContext';

const dummyImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop';

function resolveImageUrl(image_url?: string): string {
    if (!image_url) return dummyImage;
    if (image_url.startsWith('http://') || image_url.startsWith('https://')) return image_url;
    return `http://localhost:8000/images/${image_url}`;
}

interface EventDetailsProps {
    event: any;
    comments: any[];
    participantsCount: number;
    isJoined?: boolean;
    onToggleJoin?: () => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event, comments, participantsCount, isJoined = false, onToggleJoin }) => {
    const { userData } = useContext(AuthContext);
    const defaultImage = resolveImageUrl(event.image_url);
    const [commentText, setCommentText] = useState("");
    const [localComments, setLocalComments] = useState(comments);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editText, setEditText] = useState("");

    const handleCommentSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && commentText.trim() !== '') {
            try {
                const created = await createComment({ event_id: event.id, comment: commentText.trim() });
                const newCommentWithAuthor = {
                    ...created,
                    author: userData ? { name: userData.name, surname: userData.surname } : { name: 'You', surname: '' }
                };
                setLocalComments(prev => [...prev, newCommentWithAuthor]);
                setCommentText("");
            } catch (error) {
                console.error("Failed to post comment:", error);
            }
        }
    };

    const handleEditStart = (comment: any) => {
        setEditingId(comment.id);
        setEditText(comment.comment);
    };

    const handleEditSave = async (commentId: number) => {
        if (!editText.trim()) return;
        try {
            await updateComment(commentId, { comment: editText.trim() });
            setLocalComments(prev =>
                prev.map(c => c.id === commentId ? { ...c, comment: editText.trim() } : c)
            );
            setEditingId(null);
        } catch (err) {
            console.error("Failed to update comment:", err);
        }
    };

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, commentId: number) => {
        if (e.key === 'Enter') handleEditSave(commentId);
        if (e.key === 'Escape') setEditingId(null);
    };

    const handleDelete = async (commentId: number) => {
        try {
            await deleteComment(commentId);
            setLocalComments(prev => prev.filter(c => c.id !== commentId));
        } catch (err) {
            console.error("Failed to delete comment:", err);
        }
    };

    return (
        <div className={styles.cardContainer}>
            <h2>{event.name}</h2>
            <img src={defaultImage} alt={event.name} className={styles.eventImage} />

            <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                    <img src={iconDate} alt="date" />
                    <span>{formatDate(event.event_date)}</span>
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

            <button
                className={styles.joinButton}
                onClick={onToggleJoin}
            >
                {isJoined ? 'Leave' : 'Join'}
            </button>

            <div className={styles.commentsSection}>
                <h3>Comments ({localComments.length})</h3>
                <input
                    type="text"
                    placeholder="Write a comment... (Press Enter to post)"
                    className={styles.commentInput}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={handleCommentSubmit}
                />
                <div className={styles.commentList}>
                    {localComments.map((comment) => (
                        <div key={comment.id} className={styles.comment}>
                            <div className={styles.commentHeader}>
                                <div className={styles.avatar}></div>
                                <div className={styles.author}>
                                    {comment.author ? `${comment.author.name} ${comment.author.surname || ''}`.trim() : 'User'}
                                </div>
                                {userData && (comment.user_id === userData.id || userData.role === 'admin') && (
                                    <div className={styles.commentActions}>
                                        {editingId === comment.id ? (
                                            <>
                                                <button
                                                    className={styles.actionBtn}
                                                    onClick={() => handleEditSave(comment.id)}
                                                    title="Save"
                                                >✓</button>
                                                <button
                                                    className={`${styles.actionBtn} ${styles.cancelBtn}`}
                                                    onClick={() => setEditingId(null)}
                                                    title="Cancel"
                                                >✕</button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className={styles.actionBtn}
                                                    onClick={() => handleEditStart(comment)}
                                                    title="Edit"
                                                >✏️</button>
                                                <button
                                                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                                    onClick={() => handleDelete(comment.id)}
                                                    title="Delete"
                                                >🗑️</button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            {editingId === comment.id ? (
                                <input
                                    type="text"
                                    className={styles.commentInput}
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onKeyDown={(e) => handleEditKeyDown(e, comment.id)}
                                    autoFocus
                                />
                            ) : (
                                <div className={styles.text}>{comment.comment}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
