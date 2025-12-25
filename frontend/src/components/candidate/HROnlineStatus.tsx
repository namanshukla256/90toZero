import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface HRContact {
    id: string;
    name: string;
    company: string;
    title: string;
    avatar?: string;
    isOnline: boolean;
    lastSeen?: string;
    responseTime?: string; // e.g., "Usually responds in 2 hours"
}

interface HROnlineStatusProps {
    hrContacts: HRContact[];
    onStartChat?: (hrId: string) => void;
}

const HROnlineStatus = ({ hrContacts, onStartChat }: HROnlineStatusProps) => {
    const [showChatModal, setShowChatModal] = useState(false);
    const [selectedHR, setSelectedHR] = useState<HRContact | null>(null);
    const [message, setMessage] = useState('');

    const onlineHRs = hrContacts.filter(hr => hr.isOnline);

    const handleStartChat = (hr: HRContact) => {
        setSelectedHR(hr);
        setShowChatModal(true);
    };

    const handleSendMessage = () => {
        if (message.trim() && selectedHR) {
            onStartChat?.(selectedHR.id);
            console.log('Sending message to:', selectedHR.name, 'Message:', message);
            alert(`Chat request sent to ${selectedHR.name}!\n\nThey'll respond via the platform messaging system.`);
            setMessage('');
            setShowChatModal(false);
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarColor = (name: string) => {
        const colors = [
            'bg-blue-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-green-500',
            'bg-yellow-500',
            'bg-indigo-500',
            'bg-red-500',
        ];
        const index = name.charCodeAt(0) % colors.length;
        return colors[index];
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            {/* Header with Online Count */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">HR Contacts Available</h3>
                    <p className="text-sm text-gray-600">Start a conversation directly</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                    <div className="relative flex items-center justify-center">
                        <motion.div
                            className="absolute w-3 h-3 bg-green-500 rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        />
                        <div className="w-2 h-2 bg-green-500 rounded-full relative z-10" />
                    </div>
                    <span className="text-sm font-bold text-green-700">
                        {onlineHRs.length} Online
                    </span>
                </div>
            </div>

            {/* Online HR List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {onlineHRs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <svg className="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        <p className="text-sm">No HR representatives online right now</p>
                        <p className="text-xs text-gray-400 mt-1">Check back soon</p>
                    </div>
                ) : (
                    onlineHRs.map((hr, index) => (
                        <motion.div
                            key={hr.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-purple-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-all group"
                        >
                            {/* Avatar with Online Status */}
                            <div className="relative flex-shrink-0">
                                {hr.avatar ? (
                                    <img
                                        src={hr.avatar}
                                        alt={hr.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className={`w-12 h-12 rounded-full ${getAvatarColor(hr.name)} flex items-center justify-center text-white font-bold`}>
                                        {getInitials(hr.name)}
                                    </div>
                                )}
                                <motion.div
                                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                />
                            </div>

                            {/* HR Info */}
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-900 truncate">{hr.name}</div>
                                <div className="text-xs text-gray-600 truncate">{hr.title}</div>
                                <div className="text-xs text-gray-500 truncate">{hr.company}</div>
                                {hr.responseTime && (
                                    <div className="text-xs text-green-600 font-medium mt-1">
                                        {hr.responseTime}
                                    </div>
                                )}
                            </div>

                            {/* Chat Button */}
                            <motion.button
                                onClick={() => handleStartChat(hr)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                <span className="hidden sm:inline">Chat</span>
                            </motion.button>
                        </motion.div>
                    ))
                )}
            </div>

            {/* Offline HR Preview */}
            {onlineHRs.length < hrContacts.length && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500 mb-2">
                        {hrContacts.length - onlineHRs.length} more HR{hrContacts.length - onlineHRs.length !== 1 ? 's' : ''} currently offline
                    </div>
                </div>
            )}

            {/* Chat Modal */}
            <AnimatePresence>
                {showChatModal && selectedHR && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                        onClick={() => setShowChatModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
                        >
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-bold">Start a Conversation</h3>
                                    <button
                                        onClick={() => setShowChatModal(false)}
                                        className="text-white hover:text-gray-200 transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    {selectedHR.avatar ? (
                                        <img
                                            src={selectedHR.avatar}
                                            alt={selectedHR.name}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-white"
                                        />
                                    ) : (
                                        <div className={`w-12 h-12 rounded-full ${getAvatarColor(selectedHR.name)} flex items-center justify-center text-white font-bold border-2 border-white`}>
                                            {getInitials(selectedHR.name)}
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-semibold">{selectedHR.name}</div>
                                        <div className="text-sm opacity-90">{selectedHR.title}</div>
                                        <div className="text-xs opacity-75">{selectedHR.company}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Hi! I'm interested in learning more about this opportunity..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                    rows={5}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    💡 Tip: Introduce yourself and mention your interest in the role
                                </p>
                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 pb-6 flex gap-3">
                                <button
                                    onClick={() => setShowChatModal(false)}
                                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                >
                                    Send Message
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HROnlineStatus;
