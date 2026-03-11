import React from 'react';

interface AdminEventCardProps {
    eventName?: string;
    image?: string;
    date?: string;
    time?: string;
    location?: string;
    participants?: string | number;
    organizerName?: string;
    organizerEmail?: string;
    description?: string;
    onApprove?: () => void;
    onDecline?: () => void;
}

export const AdminEventCard: React.FC<AdminEventCardProps> = ({
    eventName = "Event Name",
    image = "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2000&auto=format&fit=crop",
    date = "12.03.26",
    time = "Time",
    location = "Location",
    participants = "Number of participants",
    organizerName = "name",
    organizerEmail = "email",
    description = "Join our Eco Marathon at Las Canteras Beach this March to raise funds for environmental projects across Gran Canar.",
    onApprove,
    onDecline
}) => {
    return (
        <div className="bg-[#f7faf8] border border-[#81c784] rounded-[20px] p-5 max-w-[320px] w-full shadow-sm">
            <h2 className="text-lg font-semibold text-[#1f1f1f] mb-3">{eventName}</h2>
            
            <img src={image} alt={eventName} className="w-full h-[120px] object-cover mb-4" />

            <div className="grid grid-cols-2 gap-y-2.5 gap-x-2 text-xs text-[#1f1f1f] mb-3">
                <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 shrink-0 text-[#1f1f1f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 shrink-0 text-[#1f1f1f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <span>{time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 shrink-0 text-[#1f1f1f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 shrink-0 text-[#1f1f1f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span>{participants}</span>
                </div>
            </div>

            <div className="text-xs text-[#1f1f1f] mb-4 flex flex-col gap-1">
                <div>Organizer Name: {organizerName}</div>
                <div>Organizer Email: {organizerEmail}</div>
            </div>

            <p className="text-xs text-[#1f1f1f] leading-relaxed mb-6 text-justify">
                {description}
            </p>

            <div className="flex gap-4">
                <button 
                    className="flex-1 py-2.5 rounded-lg font-semibold text-sm text-[#1a1a1a] transition-colors duration-200 bg-[#63a4ff] hover:bg-[#4a90e2]" 
                    onClick={onApprove}
                >
                    Approve
                </button>
                <button 
                    className="flex-1 py-2.5 rounded-lg font-semibold text-sm text-[#1a1a1a] transition-colors duration-200 bg-[#abcbf1] hover:bg-[#92b9e6]" 
                    onClick={onDecline}
                >
                    Decline
                </button>
            </div>
        </div>
    );
};
