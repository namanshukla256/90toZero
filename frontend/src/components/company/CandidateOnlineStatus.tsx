import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OnlineCandidate {
  id: string;
  name: string;
  designation: string;
  company: string;
  experience: number;
  skills: string[];
  location: string;
  avatar: string;
  responseTime: string;
}

interface CandidateOnlineStatusProps {
  compact?: boolean;
  className?: string;
}

const CandidateOnlineStatus: React.FC<CandidateOnlineStatusProps> = ({ 
  compact = false,
  className = '' 
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<OnlineCandidate | null>(null);
  const [message, setMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Mock online candidates data
  const onlineCandidates: OnlineCandidate[] = [
    {
      id: '1',
      name: 'Rahul Verma',
      designation: 'Senior Full Stack Developer',
      company: 'Infosys Ltd',
      experience: 6,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
      location: 'Bangalore',
      avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=3b82f6&color=fff',
      responseTime: 'Responds in ~5 min'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      designation: 'DevOps Engineer',
      company: 'TCS',
      experience: 4,
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS'],
      location: 'Pune',
      avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=8b5cf6&color=fff',
      responseTime: 'Responds in ~3 min'
    },
    {
      id: '3',
      name: 'Amit Patel',
      designation: 'Backend Developer',
      company: 'Wipro',
      experience: 5,
      skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis'],
      location: 'Hyderabad',
      avatar: 'https://ui-avatars.com/api/?name=Amit+Patel&background=10b981&color=fff',
      responseTime: 'Responds in ~10 min'
    },
    {
      id: '4',
      name: 'Sneha Reddy',
      designation: 'Frontend Developer',
      company: 'Accenture',
      experience: 3,
      skills: ['React', 'Vue.js', 'JavaScript', 'Tailwind CSS'],
      location: 'Chennai',
      avatar: 'https://ui-avatars.com/api/?name=Sneha+Reddy&background=f59e0b&color=fff',
      responseTime: 'Responds in ~7 min'
    },
    {
      id: '5',
      name: 'Vikram Singh',
      designation: 'Mobile App Developer',
      company: 'Tech Mahindra',
      experience: 5,
      skills: ['React Native', 'Flutter', 'iOS', 'Android'],
      location: 'Delhi',
      avatar: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=ef4444&color=fff',
      responseTime: 'Responds in ~4 min'
    },
    {
      id: '6',
      name: 'Anjali Mehta',
      designation: 'UI/UX Designer',
      company: 'HCL Technologies',
      experience: 4,
      skills: ['Figma', 'Adobe XD', 'Design Systems', 'Prototyping'],
      location: 'Mumbai',
      avatar: 'https://ui-avatars.com/api/?name=Anjali+Mehta&background=ec4899&color=fff',
      responseTime: 'Responds in ~6 min'
    }
  ];

  const handleStartChat = (candidate: OnlineCandidate) => {
    setSelectedCandidate(candidate);
    setIsChatOpen(true);
    setMessage('');
  };

  const handleSendMessage = () => {
    if (!message.trim() || !selectedCandidate) return;
    
    // Here you would typically send the message to your backend
    console.log('Sending message to', selectedCandidate.name, ':', message);
    
    // Show success feedback
    alert(`Message sent to ${selectedCandidate.name}! They will respond soon.`);
    
    // Reset
    setMessage('');
    setIsChatOpen(false);
    setSelectedCandidate(null);
  };

  if (compact) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 ${className}`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Candidates Online</h3>
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            <span className="text-xs font-bold text-green-600">{onlineCandidates.length}</span>
          </div>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {onlineCandidates.slice(0, 3).map((candidate) => (
            <div key={candidate.id} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <div className="relative flex-shrink-0">
                <img src={candidate.avatar} alt={candidate.name} className="w-8 h-8 rounded-full" />
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.8, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">{candidate.name}</p>
                <p className="text-xs text-gray-500 truncate">{candidate.designation}</p>
              </div>
              <button
                onClick={() => handleStartChat(candidate)}
                className="flex-shrink-0 p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Start chat"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        {onlineCandidates.length > 3 && (
          <button className="w-full mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
            View all {onlineCandidates.length} candidates →
          </button>
        )}

        {/* Chat Modal */}
        <AnimatePresence>
          {isChatOpen && selectedCandidate && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
                onClick={() => setIsChatOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-50 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-12 h-12 rounded-full" />
                      <motion.div
                        className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{selectedCandidate.name}</h3>
                      <p className="text-sm text-gray-500">{selectedCandidate.designation}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="mb-4">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={`Write your message to ${selectedCandidate.name}...`}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{selectedCandidate.responseTime}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsChatOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full view
  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative p-2 bg-green-100 rounded-lg">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Candidates Online</h2>
            <p className="text-sm text-gray-500">Connect with available candidates instantly</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
          <motion.div
            className="w-3 h-3 bg-green-500 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-sm font-bold text-green-700">{onlineCandidates.length} Online</span>
        </div>
      </div>

      {/* Candidates Grid */}
      {onlineCandidates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {onlineCandidates.map((candidate) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
            >
              {/* Online Status Indicator */}
              <motion.div
                className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [1, 0.6, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-3 right-3 w-3 h-3 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Candidate Info */}
              <div className="flex items-start gap-3 mb-3">
                <div className="relative flex-shrink-0">
                  <img 
                    src={candidate.avatar} 
                    alt={candidate.name} 
                    className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                  />
                  <motion.div
                    className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{candidate.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{candidate.designation}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {candidate.company} • {candidate.experience}+ yrs
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-3">
                <div className="flex flex-wrap gap-1.5">
                  {candidate.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md">
                      +{candidate.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Location & Response Time */}
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <div className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{candidate.location}</span>
                </div>
                <span className="text-green-600 font-medium">{candidate.responseTime}</span>
              </div>

              {/* Chat Button */}
              <button
                onClick={() => handleStartChat(candidate)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Start Chat</span>
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No Candidates Online</h3>
          <p className="text-sm text-gray-500">Check back later to connect with available candidates</p>
        </div>
      )}

      {/* Chat Modal */}
      <AnimatePresence>
        {isChatOpen && selectedCandidate && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsChatOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-xl shadow-2xl z-50 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={selectedCandidate.avatar} alt={selectedCandidate.name} className="w-16 h-16 rounded-full border-2 border-white shadow" />
                    <motion.div
                      className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.8, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedCandidate.name}</h3>
                    <p className="text-sm text-gray-600">{selectedCandidate.designation}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{selectedCandidate.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hi ${selectedCandidate.name.split(' ')[0]}, I came across your profile and would like to discuss...`}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={5}
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Tip: Mention the role you're hiring for and why they'd be a great fit
                </p>
              </div>

              {/* Response Time */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 rounded-lg">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-green-700">
                  <strong>{selectedCandidate.name.split(' ')[0]}</strong> typically {selectedCandidate.responseTime.toLowerCase()}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Send Message
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CandidateOnlineStatus;
